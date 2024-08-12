import Tasks from "@/components/main/Tasks";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between min-[800px]:p-24 px-4 py-24 bg-white">
			<Tasks />
		</main>
	);
}
