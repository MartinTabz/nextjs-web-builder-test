import Logo from "@/components/icons/Logo";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SiteNav() {
	return (
		<header className="h-20 w-full flex items-center justify-center px-2 pointer-events-none">
			<nav className="w-full max-w-7xl flex items-center justify-between">
				<div className="flex items-center gap-5">
					<Link href={"/"}>
						<Logo className="h-14 lg:h-16 w-auto" />
					</Link>
					<div className="hidden lg:flex items-center gap-1">
						<LinkItem href={"/"}>Domů</LinkItem>
						<LinkItem href={"/sluzby"}>Služby</LinkItem>
						<LinkItem href={"/#o-mne"}>O mně</LinkItem>
					</div>
				</div>
				<div className="hidden lg:flex items-center gap-5">
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
				<div className="flex lg:hidden cursor-pointer flex-col gap-2">
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
			className="p-2 font-bold sm:font-bold sm:px-2.5 sm:tracking-tight sm:py-2 sm:hover:text-primary sm:duration-150"
			href={href}
		>
			{children}
		</Link>
	);
}
