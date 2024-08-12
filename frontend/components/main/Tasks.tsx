"use client";

import { IoMdAddCircleOutline } from "react-icons/io";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import Task from "./Task";
import CreateTask from "./CreateTask";
import { useAppSelector } from "@/redux/hooks";
import { TaskSchema } from "@/types";
import { useToast } from "../ui/use-toast";

const Tasks = () => {
	const { toast } = useToast();
	const tasks = useAppSelector((state) => state.userData.tasks);
	const token = useAppSelector((state) => state.userData.token);
	const [userTasks, setUserTasks] = useState<TaskSchema[]>([...tasks]);
	const [isCreateTaskOpen, setIsCreateTaskOpen] = useState<boolean>(false);
	const [selectedCompleteTap, setSelectedCompleteTap] = useState<string>("All");
	const [selectedCategoryTap, setSelectedCategoryTap] =
		useState<string>("All Categories");

	useEffect(() => {
		setUserTasks([...tasks]);
	}, [tasks]);

	useEffect(() => {
		if (
			selectedCompleteTap === "All" &&
			selectedCategoryTap === "All Categories"
		) {
			setUserTasks([...tasks]);
		} else if (
			selectedCompleteTap === "All" &&
			selectedCategoryTap === "Personal"
		) {
			const newShownTasks = tasks.filter(
				(task) => task.category === "Personal"
			);
			setUserTasks([...newShownTasks]);
		} else if (
			selectedCompleteTap === "All" &&
			selectedCategoryTap === "For Home"
		) {
			const newShownTasks = tasks.filter(
				(task) => task.category === "For Home"
			);
			setUserTasks([...newShownTasks]);
		} else if (
			selectedCompleteTap === "All" &&
			selectedCategoryTap === "Work"
		) {
			const newShownTasks = tasks.filter((task) => task.category === "Work");
			setUserTasks([...newShownTasks]);
		} else if (
			selectedCompleteTap === "Completed" &&
			selectedCategoryTap === "All Categories"
		) {
			const newShownTasks = tasks.filter((task) => task.completed === true);
			setUserTasks([...newShownTasks]);
		} else if (
			selectedCompleteTap === "Completed" &&
			selectedCategoryTap === "Personal"
		) {
			const newShownTasks = tasks.filter(
				(task) => task.completed === true && task.category === "Personal"
			);
			setUserTasks([...newShownTasks]);
		} else if (
			selectedCompleteTap === "Completed" &&
			selectedCategoryTap === "For Home"
		) {
			const newShownTasks = tasks.filter(
				(task) => task.completed === true && task.category === "For Home"
			);
			setUserTasks([...newShownTasks]);
		} else if (
			selectedCompleteTap === "Completed" &&
			selectedCategoryTap === "Work"
		) {
			const newShownTasks = tasks.filter(
				(task) => task.completed === true && task.category === "Work"
			);
			setUserTasks([...newShownTasks]);
		} else if (
			selectedCompleteTap === "Not Completed" &&
			selectedCategoryTap === "All Categories"
		) {
			const newShownTasks = tasks.filter((task) => task.completed === false);
			setUserTasks([...newShownTasks]);
		} else if (
			selectedCompleteTap === "Not Completed" &&
			selectedCategoryTap === "Personal"
		) {
			const newShownTasks = tasks.filter(
				(task) => task.completed === false && task.category === "Personal"
			);
			setUserTasks([...newShownTasks]);
		} else if (
			selectedCompleteTap === "Not Completed" &&
			selectedCategoryTap === "For Home"
		) {
			const newShownTasks = tasks.filter(
				(task) => task.completed === false && task.category === "For Home"
			);
			setUserTasks([...newShownTasks]);
		} else if (
			selectedCompleteTap === "Not Completed" &&
			selectedCategoryTap === "Work"
		) {
			const newShownTasks = tasks.filter(
				(task) => task.completed === false && task.category === "Work"
			);
			setUserTasks([...newShownTasks]);
		}
	}, [selectedCompleteTap, selectedCategoryTap]);

	return (
		<div className="flex items-center justify-center flex-col p-10 max-[500px]:p-4 bg-white z-50 mt-40 w-[1400px] max-[1430px]:w-[95%] rounded-lg">
			<div className="w-full flex items-center justify-between">
				<p className="text-[21px] font-medium">Your Tasks</p>
				<p
					onClick={() => {
						if (token === "") {
							toast({
								title: "Login First to have ability to create task.",
							});
						} else {
							setIsCreateTaskOpen(true);
						}
					}}
					className="flex items-center justify-start gap-1 cursor-pointer"
				>
					<IoMdAddCircleOutline size={21} className="mb-1" /> Add Task
				</p>
			</div>
			<div className="w-full flex items-center justify-center mt-5 gap-2 max-[540px]:flex-col ">
				<p>Categories: </p>
				<div className="scale-[0.85]">
					<Tabs defaultValue="All Categories">
						<TabsList>
							<TabsTrigger
								onClick={() => {
									setSelectedCategoryTap("All Categories");
								}}
								value="All Categories"
							>
								All Categories
							</TabsTrigger>
							<TabsTrigger
								onClick={() => {
									setSelectedCategoryTap("Personal");
								}}
								value="Personal"
							>
								Personal
							</TabsTrigger>
							<TabsTrigger
								onClick={() => {
									setSelectedCategoryTap("For Home");
								}}
								value="For Home"
							>
								For Home
							</TabsTrigger>
							<TabsTrigger
								onClick={() => {
									setSelectedCategoryTap("Work");
								}}
								value="Work"
							>
								Work
							</TabsTrigger>
						</TabsList>
					</Tabs>
				</div>
			</div>
			<div className="w-full flex flex-col gap-2 items-center justify-center border-solid border-[2px] border-[#e5e5e5] rounded-md p-2 mt-8">
				{userTasks.length !== 0 && token !== "" ? (
					userTasks.map((task) => (
						<Task
							key={task._id + task.deadline}
							_id={task._id}
							title={task.title}
							completed={task.completed}
							deadline={task.deadline}
						/>
					))
				) : userTasks.length === 0 && token === "" ? (
					<p className="font-medium">
						Login or Register First to see your Tasks.
					</p>
				) : (
					<p className="font-medium">
						No tasks yet, Please Add Your First Task.
					</p>
				)}
			</div>
			<div className="w-full flex items-center justify-center mt-10">
				<Tabs defaultValue="All">
					<TabsList>
						<TabsTrigger
							value="All"
							onClick={() => {
								setSelectedCompleteTap("All");
							}}
						>
							All
						</TabsTrigger>
						<TabsTrigger
							value="Completed"
							onClick={() => {
								setSelectedCompleteTap("Completed");
							}}
						>
							Completed
						</TabsTrigger>
						<TabsTrigger
							value="Not Completed"
							onClick={() => {
								setSelectedCompleteTap("Not Completed");
							}}
						>
							Not Completed
						</TabsTrigger>
					</TabsList>
				</Tabs>
			</div>
			<CreateTask
				isCreateTaskOpen={isCreateTaskOpen}
				setIsCreateTaskOpen={setIsCreateTaskOpen}
			/>
		</div>
	);
};

export default Tasks;
