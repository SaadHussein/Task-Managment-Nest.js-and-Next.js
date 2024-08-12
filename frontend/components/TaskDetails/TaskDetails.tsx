"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import UpdateTask from "./UpdateTask";
import { useState } from "react";
import { TaskSchema } from "@/types";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useToast } from "../ui/use-toast";
import { setTasks } from "@/redux/slices/userDataSlice";

interface Response {
	status: string;
	tasks: TaskSchema[];
}

const TaskDetails = ({ task }: { task: TaskSchema | null }) => {
	const router = useRouter();
	const [isUpdateTaskOpen, setIsUpdateTaskOpen] = useState<boolean>(false);
	const token = useAppSelector((state) => state.userData.token);
	const dispatch = useAppDispatch();
	const { toast } = useToast();

	const handleUpdateCompletedTask = async () => {
		const completeTaskResponse = await fetch(
			`http://localhost:3001/task/${task?._id}`,
			{
				method: "PATCH",
				body: JSON.stringify({
					completed: !task?.completed,
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
		}
		console.log(result);
	};

	const handleDeleteTask = async () => {
		const deleteTaskResponse = await fetch(
			`http://localhost:3001/task/${task?._id}`,
			{
				method: "DELETE",

				headers: {
					authorization: `Bearer ${token}`,
				},
			}
		);

		const result: Response = await deleteTaskResponse.json();

		if (result.status === "success") {
			toast({
				title: "Task Deleted Successfully.",
			});
			dispatch(
				setTasks({ value: result.tasks.length === 0 ? [] : [...result.tasks] })
			);
			router.push("/");
		}
		console.log(result);
	};
	return (
		<div className="flex items-center justify-center flex-col p-10 max-[500px]:p-4 bg-white z-50 mt-40 w-[1400px] max-[1430px]:w-[95%] rounded-lg">
			<h1 className="text-[32px] max-[600px]:text-[24px] font-medium">
				Task Details
			</h1>
			<div className="w-full flex items-start justify-start flex-col mt-10 mb-5">
				<p className="text-[21px] max-[600px]:text-[18px] my-3 font-medium">
					Task Title: {task?.title}
				</p>
				<p className="text-[21px] max-[600px]:text-[18px] my-3 font-medium">
					Task Description: {task?.description}
				</p>
				<p className="text-[21px] max-[600px]:text-[18px] my-3 font-medium">
					Completed:{" "}
					<Checkbox
						checked={task?.completed}
						onClick={handleUpdateCompletedTask}
					/>
				</p>
				<p
					className={`text-[21px] max-[600px]:text-[18px] my-3 font-medium ${
						new Date() >= new Date(task?.deadline ? task.deadline : "")
							? "text-red-600"
							: ""
					}`}
				>
					Task Deadline: {task?.deadline}
				</p>
			</div>
			<div className="flex items-center justify-center gap-5">
				<Button
					onClick={() => {
						setIsUpdateTaskOpen(true);
					}}
				>
					Update
				</Button>
				<Button onClick={handleDeleteTask}>Delete</Button>
				<Button
					onClick={() => {
						router.push("/");
					}}
				>
					Back
				</Button>
			</div>
			<UpdateTask
				task={task}
				isUpdateTaskOpen={isUpdateTaskOpen}
				setIsUpdateTaskOpen={setIsUpdateTaskOpen}
			/>
		</div>
	);
};

export default TaskDetails;
