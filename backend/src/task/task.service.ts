import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schemas/task.schema';
import { Model, Types } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private taskModal: Model<Task>,
    @InjectModel(User.name) private userModal: Model<User>,
  ) {}

  async create(createTaskDto: CreateTaskDto, userID: string) {
    try {
      const isUserFound = await this.userModal.findById(userID);

      if (!isUserFound) {
        return {
          status: 'fail',
          message: 'User Not Found',
        };
      }

      const newTask = await this.taskModal.create({
        ...createTaskDto,
        userID: isUserFound.id,
      });

      console.log(newTask);

      isUserFound.tasks.push(newTask._id as Types.ObjectId);

      await isUserFound.save();

      const tasksAfterUpdated = await this.taskModal.find();

      return {
        status: 'success',
        tasks: tasksAfterUpdated,
      };
    } catch (error) {
      return {
        status: 'fail',
        error,
        message: error.message,
      };
    }
  }

  async findAll(userID: string) {
    try {
      const tasks = await this.taskModal.find().where({ userID });

      if (tasks.length === 0) {
        return {
          status: 'fail',
          message: 'No Tasks, Add Your First Task.',
        };
      }

      return {
        status: 'success',
        tasks,
      };
    } catch (error) {
      return {
        status: 'fail',
        error,
        message: error.message,
      };
    }
  }

  async findOne(id: string, userID: string) {
    try {
      const selectedTask = await this.taskModal.findById(id).where({ userID });

      if (!selectedTask) {
        return {
          status: 'fail',
          message: 'Not Task With This ID',
        };
      }

      return {
        status: 'success',
        task: selectedTask,
      };
    } catch (error) {
      return {
        status: 'fail',
        error,
        message: error.message,
      };
    }
  }

  async update(id: string, userID: string, updateTaskDto: UpdateTaskDto) {
    try {
      await this.taskModal
        .findByIdAndUpdate(id, updateTaskDto)
        .where({ userID });

      const tasksAfterupdate = await this.taskModal.find();

      return {
        status: 'success',
        tasks: tasksAfterupdate,
      };
    } catch (error) {
      return {
        status: 'fail',
        error,
        message: error.message,
      };
    }
  }

  async remove(id: string, userID: string) {
    try {
      const isTaskFound = await this.taskModal.findById(id).where({ userID });

      if (!isTaskFound) {
        return {
          status: 'fail',
          message: 'Task Not Found.',
        };
      }

      await this.taskModal.findByIdAndDelete(id);

      const tasksAfterDelete = await this.taskModal.find();

      return {
        status: 'success',
        tasks: tasksAfterDelete,
      };
    } catch (error) {
      return {
        status: 'fail',
        error,
        message: error.message,
      };
    }
  }
}
