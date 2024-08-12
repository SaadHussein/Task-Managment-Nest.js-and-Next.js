import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { LoginUserDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Builder, By, until } from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';
import * as edge from 'selenium-webdriver/edge';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModal: Model<User>,
    private jwtService: JwtService,
  ) {}

  async loginUser(loginUserDto: LoginUserDto) {
    try {
      const selectedUser = await this.userModal
        .find({
          email: loginUserDto.email,
        })
        .populate('tasks');

      console.log(selectedUser, loginUserDto);

      if (selectedUser.length === 0) {
        return {
          status: 'fail',
          message: 'This Email doesn`t register before',
        };
      }

      const isPasswordMatch = await bcrypt.compare(
        loginUserDto.password,
        selectedUser[0].password,
      );

      if (!isPasswordMatch) {
        return {
          status: 'fail',
          message: 'Password is Not True.',
        };
      }

      const payload = { id: selectedUser[0]._id, email: selectedUser[0].email };

      const token = await this.jwtService.signAsync(payload);

      return {
        status: 'success',
        user: {
          name: selectedUser[0].name,
          email: selectedUser[0].email,
          image: selectedUser[0].image,
          linkedInProfileURL: selectedUser[0].linkedInProfileURL,
          tasks: selectedUser[0].tasks,
        },
        token,
      };
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

  async registerUser(registerUserDto: RegisterUserDto, userAgent: string) {
    try {
      const isUserFound = await this.userModal.find({
        email: registerUserDto.email,
      });

      if (isUserFound.length !== 0) {
        return {
          status: 'fail',
          message: 'Email Already Logged In, Go To Login Page and Login.',
        };
      }

      const data = await this.scrapeLinkedInProfile(
        registerUserDto.linkedInProfileURL,
        userAgent,
      );

      console.log(data);

      if (data === undefined) {
        return {
          status: 'fail',
          message: 'Error While Scraping Data From LinkedIn.',
        };
      }

      const hashedPassword = await bcrypt.hash(registerUserDto.password, 12);

      const newUser = await this.userModal.create({
        email: registerUserDto.email,
        password: hashedPassword,
        linkedInProfileURL: registerUserDto.linkedInProfileURL,
        name: data.name,
        image: data.photoUrl,
      });

      const payload = { id: newUser._id, email: newUser.email };

      const token = await this.jwtService.signAsync(payload);

      return {
        status: 'success',
        user: {
          email: newUser.email,
          name: newUser.name,
          image: newUser.image,
          linkedInProfileURL: newUser.linkedInProfileURL,
          tasks: newUser.tasks,
        },
        token,
      };
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }

  async scrapeLinkedInProfile(profileUrl: string, userAgent: string) {
    let driver;

    if (userAgent.includes('Edg') || userAgent.includes('Postman')) {
      let options = new edge.Options();
      options.addArguments('headless');

      driver = new Builder()
        .forBrowser('MicrosoftEdge')
        .setEdgeOptions(options)
        .build();
    } else if (userAgent.includes('Chrome')) {
      const options = new chrome.Options();
      options.addArguments('--headless');

      driver = new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();
    } else {
      throw new Error('Unsupported browser');
    }

    try {
      await driver.get('https://www.linkedin.com/login');
      await driver
        .findElement(By.id('username'))
        .sendKeys(process.env.LINKEDIN_EMAIL_TEST);
      await driver
        .findElement(By.id('password'))
        .sendKeys(process.env.LINKEDIN_PASSWORD_TEST);
      await driver.findElement(By.xpath('//button[@type="submit"]')).click();

      await driver.get(profileUrl);

      await driver.wait(
        () =>
          driver
            .executeScript('return document.readyState')
            .then((state) => state === 'complete'),
        15000,
      );

      const element = await driver.wait(
        until.elementLocated(By.css('h1')),
        15000,
      );

      await driver.wait(until.elementIsVisible(element), 15000);

      let header = await driver.findElement(
        By.css('div.ph5.pb5, div.top-card-layout__card'),
      );

      let name = await header.findElement(By.css('h1')).getText();
      name = name
        ? name
        : await header
            .findElement(By.className('top-card-layout__title'))
            .getText();

      let photoUrl = await header
        .findElement(By.css('img'))
        .getAttribute('src');
      photoUrl = photoUrl
        ? photoUrl
        : await header
            .findElement(
              By.className(
                'top-card-layout__entity-image top-card__profile-image top-card__profile-image--real-image',
              ),
            )
            .getAttribute('src');

      return { name, photoUrl };
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      await driver.quit();
    }
  }
}
