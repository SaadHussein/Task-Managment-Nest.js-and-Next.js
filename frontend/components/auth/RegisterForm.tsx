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
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch } from "@/redux/hooks";
import {
	setEmail,
	setImage,
	setName,
	setToken,
	setTasks,
} from "@/redux/slices/userDataSlice";
import { useRouter } from "next/navigation";
import { RegisterResponseData } from "@/types";

const formSchema = z.object({
	email: z.string().email({
		message: "Must enter a valid email.",
	}),
	password: z.string().min(8, {
		message: "Must be a Valid Password, At least 8 characters.",
	}),
	confirmPassword: z.string().min(8, {
		message:
			"Must be a Valid Password, At least 8 characters and equal to password.",
	}),
	linkedInProfileURL: z.string({
		message: "Enter Your LinkedIn Profile.",
	}),
});

const RegisterForm = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const { toast } = useToast();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
			linkedInProfileURL: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);

		if (values.password !== values.confirmPassword) {
			toast({
				title: "Something went wrong.",
				description: "Password and Confirm Password don`t Equal.",
			});
		} else {
			try {
				const registerUserResponse = await fetch(
					"http://localhost:3001/user/register",
					{
						method: "POST",
						body: JSON.stringify({ ...values }),
						headers: {
							"Content-Type": "application/json",
						},
					}
				);

				const result: RegisterResponseData = await registerUserResponse.json();
				console.log(result);

				if (result.status === "success") {
					toast({
						title: "Successfully",
						description: "You are Register In Successfully.",
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
						description: "Error Happened While Register.",
					});
				}
			} catch (error) {
				console.log(error);
				throw new Error("Error Happened While Register User.");
			}
		}
	}

	return (
		<div className="flex items-center justify-center flex-col p-10 bg-white z-50 mt-40 w-[700px] max-[750px]:w-[500px] max-[520px]:w-[90%] rounded-lg">
			<h1 className="text-[32px] font-medium text-center max-[520px]:text-[24px]">
				Welcome To Our Website.
			</h1>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-[21px] max-[520px]:text-[16px]">
									Email
								</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter Your Email"
										type="email"
										className="text-[18px] max-[520px]:text-[16px] !py-4"
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
								<FormLabel className="text-[21px] max-[520px]:text-[16px] mt-3">
									Password
								</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter Your Password"
										type="password"
										className="text-[18px] max-[520px]:text-[16px] !py-4"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="confirmPassword"
						render={({ field }) => (
							<FormItem className="my-4">
								<FormLabel className="text-[21px] max-[520px]:text-[16px] mt-3">
									Confirm Password
								</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter Your Password Again"
										type="password"
										className="text-[18px] max-[520px]:text-[16px] !py-4"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="linkedInProfileURL"
						render={({ field }) => (
							<FormItem className="my-4">
								<FormLabel className="text-[21px] max-[520px]:text-[16px] mt-3">
									Linkedin Profile URL
								</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter Your Password Again"
										type="text"
										className="text-[18px] max-[520px]:text-[16px] !py-4"
										{...field}
									/>
								</FormControl>
								<FormDescription>
									It takes time to register and scraping data from LinkedIn
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button className="w-full text-[18px] mt-2" type="submit">
						Submit
					</Button>
					<Link
						href={"/login"}
						className="flex items-center justify-center w-full text-center mt-2"
					>
						Already Have Account ?
					</Link>
				</form>
			</Form>
		</div>
	);
};

export default RegisterForm;
