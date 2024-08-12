import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  category: string;

  @Prop({ default: false })
  completed: boolean;

  @Prop({ required: true })
  deadline: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userID: User;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
