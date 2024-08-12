"use client";
import { Dispatch, useState } from "react";
import DatePickerComponent from "../Global/DatePicker";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useToast } from "../ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TaskSchema } from "@/types";
import { setTasks } from "@/redux/slices/userDataSlice";
import { formateDate } from "@/utils/formateDate";

interface Response {
	status: string;
	tasks: TaskSchema[];
}

const CreateTask = ({
	isCreateTaskOpen,
	setIsCreateTaskOpen,
}: {
	isCreateTaskOpen: boolean;
	setIsCreateTaskOpen: Dispatch<boolean>;
}) => {
	const { toast } = useToast();
	const [title, setTitle] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [category, setCategory] = useState<string>("");
	const [deadline, setDeadline] = useState<Date | null>(new Date());
	const token = useAppSelector((state) => state.userData.token);
	const dispatch = useAppDispatch();

	const handleCreateTask = async () => {
		const deadlineDate = formateDate(deadline ? deadline.toString() : "");
		if (
			deadlineDate === "" ||
			title === "" ||
			description === "" ||
			category === ""
		) {
			toast({
				title: "Fields Required..!",
			});
		} else {
			const createTaskResponse = await fetch("http://localhost:3001/task", {
				method: "POST",
				body: JSON.stringify({
					title,
					description,
					category,
					completed: false,
					deadline: deadlineDate,
				}),
				headers: {
					"Content-Type": "application/json",
					authorization: `Bearer ${token}`,
				},
			});

			const result: Response = await createTaskResponse.json();

			if (result.status === "success") {
				toast({
					title: "Task Created Successfully",
				});
				dispatch(setTasks({ value: [...result.tasks] }));
				setIsCreateTaskOpen(false);
			} else {
				toast({
					title: "Error Happened While Creating Task.",
				});
			}
		}
	};
	return (
		<>
			<div
				onClick={() => {
					setIsCreateTaskOpen(false);
				}}
				className={` fixed flex items-center justify-center inset-0 w-full h-full transition-all duration-300 bg-[#585858] ${
					isCreateTaskOpen ? "opacity-60 visible" : "opacity-0 invisible"
				}`}
			></div>

			<div
				className={`flex items-center justify-start flex-col absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-lg p-10 bg-white h-[62.5%] w-[800px] max-[830px]:w-[95%] transition-all duration-150 ${
					isCreateTaskOpen ? "opacity-100 visible" : "opacity-0 invisible"
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
				<div className="flex items-start justify-start gap-2 flex-col my-4 w-full">
					<Label className="text-[18px]">Category</Label>
					<Select
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
							setIsCreateTaskOpen(false);
						}}
						className="bg-white text-black hover:bg-white"
					>
						Cancel
					</Button>
					<Button onClick={handleCreateTask}>Create</Button>
				</div>
			</div>
		</>
	);
};

export default CreateTask;
