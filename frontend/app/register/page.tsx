import RegisterForm from "@/components/auth/RegisterForm";

const page = () => {
	return (
		<div className="flex min-h-screen flex-col items-center justify-between min-[520px]:p-24 py-24 px-2 bg-white">
			<RegisterForm />
		</div>
	);
};

export default page;
