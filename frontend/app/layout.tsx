import type { Metadata } from "next";
import { Inter, Josefin_Sans as FontSans } from "next/font/google";
import mainBG from "@/public/assets/mainBG.jpg";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Navigation from "@/components/Global/Navigation";
import { Providers } from "@/app/StoreProviders";

const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});
export const metadata: Metadata = {
	title: "Task Managment System",
	description: "Control your tasks in our website.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<Providers>
			<html lang="en">
				<body
					className={cn(
						"min-h-screen bg-background font-sans antialiased",
						fontSans.variable
					)}
				>
					<div className="w-full fixed inset-0 z-0">
						<Image
							src={mainBG}
							alt="background"
							className="w-full h-full object-cover"
							loading="lazy"
						/>
					</div>
					<Navigation />
					{children}
					<Toaster />
				</body>
			</html>
		</Providers>
	);
}
