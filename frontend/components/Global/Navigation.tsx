"use client";
import Link from "next/link";
import { useWindowWidth } from "@react-hook/window-size";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { HiMenuAlt3 } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import { logout } from "@/redux/slices/userDataSlice";

const Navigation = () => {
	const width = useWindowWidth();
	const dispatch = useAppDispatch();
	const token = useAppSelector((state) => state.userData.token);
	const name = useAppSelector((state) => state.userData.name);
	const image = useAppSelector((state) => state.userData.image);

	const handleLogout = () => {
		dispatch(logout());
	};

	return (
		<div className="fixed !z-50 w-full flex items-center justify-between bg-transparent mt-10">
			<div className="flex items-center justify-between w-[90%]  mx-auto py-4 px-5 rounded-lg  bg-white">
				<div>
					<Link
						href={"/"}
						className="text-black text-[22px] font-semibold cursor-pointer max-[450px]:text-[19px]"
					>
						Task Managment
					</Link>
				</div>
				{width >= 600 && token === "" && (
					<div className="flex items-center justify-end gap-5 max-[450px]:gap-2">
						<Link
							href={"/login"}
							className="text-[18px] max-[420px]:text-[16px] font-medium cursor-pointer duration-300 rounded-md p-2 hover:bg-gray-200"
						>
							Login
						</Link>
						<Link
							href={"/register"}
							className="text-[18px] max-[420px]:text-[16px] font-medium cursor-pointer duration-300 rounded-md p-2 hover:bg-gray-200"
						>
							Register
						</Link>
					</div>
				)}
				{width >= 600 && token !== "" && (
					<div className="flex items-center justify-end gap-5 max-[450px]:gap-2">
						<p className="text-[18px] max-[420px]:text-[16px] font-medium cursor-pointer duration-300 rounded-md p-2 hover:bg-gray-200">
							{name}
						</p>
						<Image
							src={image}
							alt="user Profile"
							width={50}
							height={50}
							className="rounded-full cursor-pointer"
						/>
						<p
							onClick={handleLogout}
							className="text-[18px] max-[420px]:text-[16px] font-medium cursor-pointer duration-300 rounded-md p-2 hover:bg-gray-200"
						>
							Logout
						</p>
					</div>
				)}
				{width < 600 && (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline">
								<HiMenuAlt3 />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-56 mr-12">
							<DropdownMenuLabel>Actions</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<Link href={"/login"}>
									<DropdownMenuItem>Login</DropdownMenuItem>
								</Link>
								<Link href={"/register"}>
									<DropdownMenuItem>Register</DropdownMenuItem>
								</Link>
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				)}
			</div>
		</div>
	);
};

export default Navigation;
