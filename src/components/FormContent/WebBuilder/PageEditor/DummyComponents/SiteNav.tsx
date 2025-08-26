"use client";

import Logo from "@/components/icons/Logo";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEditor } from "../../Utilities/provider";
import clsx from "clsx";

export default function SiteNav() {
	const { state } = useEditor();
	const { device } = state.editor;

	// Mobile and Tablet = show hamburger, Desktop = show full navigation
	const isMobileView = device === "Mobile" || device === "Tablet";
	const isDesktopView = device === "Desktop";
	return (
		<header className="h-20 w-full flex items-center justify-center px-2 pointer-events-none">
			<nav className="w-full max-w-7xl flex items-center justify-between">
				<div className="flex items-center gap-5">
					<Link href={"/"}>
						<Logo
							className={clsx("w-auto", {
								"h-12": device === "Mobile",
								"h-14": device === "Tablet",
								"h-14 lg:h-16": device === "Desktop",
							})}
						/>
					</Link>
					<div
						className={clsx("items-center gap-1", {
							hidden: isMobileView,
							flex: isDesktopView,
						})}
					>
						<LinkItem href={"/"}>Domů</LinkItem>
						<LinkItem href={"/sluzby"}>Služby</LinkItem>
						<LinkItem href={"/#o-mne"}>O mně</LinkItem>
					</div>
				</div>
				<div
					className={clsx("items-center gap-5", {
						hidden: isMobileView,
						flex: isDesktopView,
					})}
				>
					<div>
						<LinkItem href={"/blog"}>Blog</LinkItem>
						<LinkItem href={"/online-kurzy"}>Online kurzy</LinkItem>
						<LinkItem href={"/akce-a-webinare"}>Akce & webináře</LinkItem>
						<LinkItem href={"/eshop"}>E-shop</LinkItem>
					</div>
					<Button asChild>
						<Link href={"/nastenka"}>
							Přejít na nástěnku <ArrowRight />
						</Link>
					</Button>
				</div>
				<div
					className={clsx("cursor-pointer flex-col gap-2", {
						flex: isMobileView,
						hidden: isDesktopView,
					})}
				>
					<div className="h-[2px] w-8 bg-foreground"></div>
					<div className="h-[2px] w-8 bg-foreground"></div>
					<div className="h-[2px] w-8 bg-foreground"></div>
				</div>
			</nav>
		</header>
	);
}

function LinkItem({
	href,
	children,
}: {
	href: string;
	children: React.ReactNode;
}) {
	return (
		<Link
			className="font-bold px-2.5 tracking-tight py-2 hover:text-primary duration-150"
			href={href}
		>
			{children}
		</Link>
	);
}
