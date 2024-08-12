"use client";
import React from "react";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { TiDeleteOutline } from "react-icons/ti";
import { useRouter } from "next/navigation";
import { useWindowWidth } from "@react-hook/window-size";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setTasks } from "@/redux/slices/userDataSlice";
import { TaskSchema } from "@/types";
import { useToast } from "../ui/use-toast";

interface Response {
	status: string;
	tasks: TaskSchema[];
}

const Task = ({
	title,
	deadline,
	_id,
	completed,
}: {
	title: string;
	deadline: string;
	_id: string;
	completed: boolean;
}) => {
	const router = useRouter();
	const width = useWindowWidth();
	const token = useAppSelector((state) => state.userData.token);
	const dispatch = useAppDispatch();
	const { toast } = useToast();

	const handleUpdateTask = async () => {
		const completeTaskResponse = await fetch(
			`http://localhost:3001/task/${_id}`,
			{
				method: "PATCH",
				body: JSON.stringify({
					completed: !completed,
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
			`http://localhost:3001/task/${_id}`,
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
		}
		console.log(result);
	};

	return (
		<div className="w-full flex items-start justify-start flex-col p-2 duration-200 hover:bg-gray-200 rounded">
			<div className="w-full flex items-center justify-between">
				<div className="flex items-center justify-start gap-2">
					<Checkbox checked={completed} onClick={handleUpdateTask} />
					<p
						className={`text-[20px] max-[500px]:text-[16px] font-normal ${
							completed ? "line-through" : ""
						}`}
					>
						{title}
					</p>
				</div>
				<div className="flex items-center justify-end gap-2">
					<Button
						className="py-0 px-2 text-[15px] max-[500px]:text-[12px]"
						onClick={() => {
							router.push(`/task/${_id}`);
						}}
					>
						Show Details
					</Button>
					<TiDeleteOutline
						size={width >= 500 ? 30 : 20}
						className="cursor-pointer"
						onClick={handleDeleteTask}
					/>
				</div>
			</div>
			<span className="max-[400px]:text-[14px] max-[565px]:mt-2">
				Deadline: {deadline}
			</span>
		</div>
	);
};

export default Task;
