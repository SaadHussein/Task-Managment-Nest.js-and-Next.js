import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Response } from 'express';
import { CustomRequest } from 'src/common/types';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(
    @Req() req: CustomRequest,
    @Res() res: Response,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    const userID = req.payload ? req.payload.id : '';
    const result = await this.taskService.create(createTaskDto, userID);

    if (result.status === 'fail') {
      return res.status(404).json(result);
    } else {
      return res.status(201).json(result);
    }
  }

  @Get()
  async findAll(@Req() req: CustomRequest, @Res() res: Response) {
    const userID = req.payload ? req.payload.id : '';
    const result = await this.taskService.findAll(userID);

    if (result.status === 'fail') {
      return res.status(404).json(result);
    } else {
      return res.status(200).json(result);
    }
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Req() req: CustomRequest,
    @Res() res: Response,
  ) {
    const userID = req.payload ? req.payload.id : '';
    const result = await this.taskService.findOne(id, userID);

    if (result.status === 'fail') {
      return res.status(404).json(result);
    } else {
      return res.status(200).json(result);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Req() req: CustomRequest,
    @Res() res: Response,
  ) {
    const userID = req.payload ? req.payload.id : '';
    const result = await this.taskService.update(id, userID, updateTaskDto);

    if (result.status === 'fail') {
      return res.status(404).json(result);
    } else {
      return res.status(200).json(result);
    }
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Req() req: CustomRequest,
    @Res() res: Response,
  ) {
    const userID = req.payload ? req.payload.id : '';
    const result = await this.taskService.remove(id, userID);

    if (result.status === 'fail') {
      return res.status(404).json(result);
    } else {
      return res.status(200).json(result);
    }
  }
}
