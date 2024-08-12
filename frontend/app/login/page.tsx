import LoginForm from "@/components/auth/LoginForm";

const page = () => {
	return (
		<div className="flex min-h-screen flex-col items-center justify-between min-[520px]:p-24 py-24 px-2 bg-white">
			<LoginForm />
		</div>
	);
};

export default page;
