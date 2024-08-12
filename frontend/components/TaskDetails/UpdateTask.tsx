"use client";
import { Dispatch, useState } from "react";
import DatePickerComponent from "../Global/DatePicker";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { setTasks } from "@/redux/slices/userDataSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TaskSchema } from "@/types";
import { useToast } from "../ui/use-toast";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { formateDate } from "@/utils/formateDate";

interface Response {
	status: string;
	tasks: TaskSchema[];
}

const UpdateTask = ({
	isUpdateTaskOpen,
	setIsUpdateTaskOpen,
	task,
}: {
	isUpdateTaskOpen: boolean;
	setIsUpdateTaskOpen: Dispatch<boolean>;
	task: TaskSchema | null;
}) => {
	const [deadline, setDeadline] = useState<Date | null>(
		task?.deadline ? new Date(task?.deadline) : new Date()
	);
	const [title, setTitle] = useState<string>(task?.title ? task.title : "");
	const [completed, setCompleted] = useState<boolean>(
		task?.completed ? task.completed : false
	);
	const [description, setDescription] = useState<string>(
		task?.description ? task.description : ""
	);
	const [category, setCategory] = useState<string>(
		task?.category ? task.category : ""
	);
	const token = useAppSelector((state) => state.userData.token);
	const dispatch = useAppDispatch();
	const { toast } = useToast();

	const handleUpdateTask = async () => {
		const deadlineDate = formateDate(deadline ? deadline.toString() : "");
		const completeTaskResponse = await fetch(
			`http://localhost:3001/task/${task?._id}`,
			{
				method: "PATCH",
				body: JSON.stringify({
					completed,
					title,
					description,
					category,
					deadline: deadlineDate,
				}),
				headers: {
					"Content-Type": "application/json",
					authorization: `Bearer ${token}`,
				},
			}
		);

		const result: Response = await completeTaskResponse.json();

		if (result.status === "success") {
			toast({
				title: "Task Updated Successfully.",
			});
			dispatch(setTasks({ value: result.tasks }));
			setIsUpdateTaskOpen(false);
		}
		console.log(result);
	};

	return (
		<>
			<div
				onClick={() => {
					setIsUpdateTaskOpen(false);
				}}
				className={` fixed flex items-center justify-center inset-0 w-full h-full transition-all duration-300 bg-[#585858] ${
					isUpdateTaskOpen ? "opacity-60 visible" : "opacity-0 invisible"
				}`}
			></div>

			<div
				className={`flex items-center justify-start flex-col absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-lg p-10 bg-white h-[67.5%] w-[800px] max-[830px]:w-[95%] transition-all duration-150 ${
					isUpdateTaskOpen ? "opacity-100 visible" : "opacity-0 invisible"
				}`}
			>
				<h1 className="text-[24px] font-medium">Create New Task</h1>
				<div className="flex items-start justify-start gap-2 flex-col my-4 w-full">
					<Label htmlFor="title" className="text-[18px]">
						Task Title
					</Label>
					<Input
						type="text"
						id="title"
						value={title}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setTitle(e.target.value);
						}}
						placeholder="Enter Task Title"
						className="text-[18px]"
					/>
				</div>
				<div className="flex items-start justify-start gap-2 flex-col my-4 w-full">
					<Label htmlFor="description" className="text-[18px]">
						Task Description
					</Label>
					<Input
						type="text"
						id="description"
						value={description}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setDescription(e.target.value);
						}}
						placeholder="Enter Task Description"
						className="text-[18px]"
					/>
				</div>
				<div className="w-full flex items-center justify-start my-4 gap-2">
					<p className="text-[18px]">Completed: </p>
					<Checkbox
						checked={completed}
						onClick={() => {
							setCompleted((prev) => !prev);
						}}
					/>
				</div>
				<div className="flex items-start justify-start gap-2 flex-col my-4 w-full">
					<Label className="text-[18px]">Category</Label>
					<Select
						defaultValue={category}
						onValueChange={(value: string) => {
							setCategory(value);
							console.log(value);
						}}
					>
						<SelectTrigger className="w-Full">
							<SelectValue placeholder="Select a Category" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Categories</SelectLabel>
								<SelectItem value="Personal">Personal</SelectItem>
								<SelectItem value="For Home">For Home</SelectItem>
								<SelectItem value="Work">Work</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
				<div className="w-full flex items-center justify-start gap-3 my-3 max-[415px]:flex-col max-[415px]:items-start">
					<Label htmlFor="description" className="text-[18px]">
						Task Deadline:
					</Label>
					<DatePickerComponent deadline={deadline} setDeadline={setDeadline} />
				</div>
				<div className="w-full flex items-center justify-end mt-14 gap-3">
					<Button
						onClick={() => {
							setIsUpdateTaskOpen(false);
						}}
						className="bg-white text-black hover:bg-white"
					>
						Cancel
					</Button>
					<Button onClick={handleUpdateTask}>Update</Button>
				</div>
			</div>
		</>
	);
};

export default UpdateTask;
