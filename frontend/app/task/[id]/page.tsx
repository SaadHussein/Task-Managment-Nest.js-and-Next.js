"use client";

import TaskDetails from "@/components/TaskDetails/TaskDetails";
import { useAppSelector } from "@/redux/hooks";
import { TaskSchema } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
	const tasks = useAppSelector((state) => state.userData.tasks);
	const params = useParams();
	const [selectedTask, setSelectedTask] = useState<TaskSchema | null>(null);

	useEffect(() => {
		console.log(params.id);
		const selectedTaskFromTasks = tasks.find((task) => task._id === params.id);

		if (selectedTaskFromTasks) {
			setSelectedTask(selectedTaskFromTasks);
		}
	}, [tasks]);
	return (
		<div className="flex min-h-screen flex-col items-center justify-between min-[800px]:p-24 px-4 py-24 bg-white">
			{selectedTask !== null ? <TaskDetails task={selectedTask} /> : <></>}
		</div>
	);
};

export default page;
