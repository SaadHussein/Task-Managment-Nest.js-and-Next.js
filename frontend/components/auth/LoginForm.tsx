"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import {
	setEmail,
	setImage,
	setName,
	setTasks,
	setToken,
} from "@/redux/slices/userDataSlice";
import { LoginResponseData } from "@/types";

const formSchema = z.object({
	email: z.string().email({
		message: "Must enter a valid email.",
	}),
	password: z.string().min(8, {
		message: "Must be a Valid Password, At least 8 characters.",
	}),
});

const LoginForm = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const { toast } = useToast();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);

		try {
			const loginResponse = await fetch("http://localhost:3001/user/login", {
				method: "POST",
				body: JSON.stringify({ ...values }),
				headers: {
					"Content-Type": "application/json",
				},
			});

			const result: LoginResponseData = await loginResponse.json();
			console.log(result);

			if (result.status === "success") {
				toast({
					title: "Successfully",
					description: "You are Logged In Successfully.",
				});

				dispatch(setToken({ value: result.token }));
				dispatch(setName({ value: result.user.name }));
				dispatch(setEmail({ value: result.user.email }));
				dispatch(setImage({ value: result.user.image }));
				dispatch(setTasks({ value: result.user.tasks }));

				router.push("/");
			} else {
				toast({
					title: "Error",
					description: "Error Happened While Login.",
				});
			}
		} catch (error) {
			console.log(error);
			throw new Error("Error Happened While Login User.");
		}
	}

	return (
		<div className="flex items-center justify-center flex-col p-10 bg-white z-50 mt-40 w-[700px] max-[750px]:w-[500px] max-[520px]:w-[90%] rounded-lg">
			<h1 className="text-[32px] font-medium">Welcome Back..!</h1>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-[21px]">Email</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter Your Email"
										type="email"
										className="text-[18px] !py-4"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem className="my-4">
								<FormLabel className="text-[21px] mt-3">Password</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter Your Password"
										type="password"
										className="text-[18px] !py-4"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button className="w-full text-[18px] mt-2" type="submit">
						Submit
					</Button>
					<Link
						href={"/register"}
						className="flex items-center justify-center w-full text-center mt-2"
					>
						Create Account ?
					</Link>
				</form>
			</Form>
		</div>
	);
};

export default LoginForm;
