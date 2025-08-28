"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { DeviceTypes, useEditor } from "./Utilities/provider";
import clsx from "clsx";
import {
	EyeIcon,
	Laptop,
	Redo2,
	Smartphone,
	Tablet,
	Undo2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export default function WebBuilderNavigation() {
	const router = useRouter();
	const { state, dispatch, setOpen } = useEditor();

	const handlePreviewClick = () => {
		dispatch({ type: "TOGGLE_PREVIEW_MODE" });
		dispatch({ type: "TOGGLE_LIVE_MODE" });
	};

	const handleUndo = () => {
		dispatch({ type: "UNDO" });
	};

	const handleRedo = () => {
		dispatch({ type: "REDO" });
	};

	const handleOnSave = async () => {
		// Close the WebBuilder modal
		setOpen?.(false);
	};

	return (
		<TooltipProvider>
			<nav
				className={clsx(
					"flex items-center border-b justify-between bg-sidebar p-6 gap-2 transition-all",
					{ "!h-0 !p-0 !overflow-hidden": state.editor.previewMode }
				)}
			>
				<div></div>
				<aside>
					<Tabs
						defaultValue="Desktop"
						className="w-fit"
						value={state.editor.device}
						onValueChange={(value) => {
							dispatch({
								type: "CHANGE_DEVICE",
								payload: { device: value as DeviceTypes },
							});
						}}
					>
						<TabsList className="grid w-full grid-cols-3 bg-transparent h-fit">
							<TabsTrigger
								value="Desktop"
								className="data-[state=active]:bg-muted w-10 h-10 p-0 cursor-pointer"
							>
								<Laptop />
							</TabsTrigger>

							<TabsTrigger
								value="Tablet"
								className="data-[state=active]:bg-muted w-10 h-10 p-0 cursor-pointer"
							>
								<Tablet />
							</TabsTrigger>

							<TabsTrigger
								value="Mobile"
								className="data-[state=active]:bg-muted w-10 h-10 p-0 cursor-pointer"
							>
								<Smartphone />
							</TabsTrigger>
						</TabsList>
					</Tabs>
				</aside>
				<aside className="flex items-center gap-2">
					<Button
						type="button"
						variant={"ghost"}
						size={"icon"}
						className="hover:bg-slate-800"
						onClick={handlePreviewClick}
					>
						<EyeIcon />
					</Button>
					<Button
						type="button"
						variant={"ghost"}
						size={"icon"}
						className="hover:bg-slate-800"
						onClick={handleUndo}
						disabled={!(state.history.currentIndex > 0)}
					>
						<Undo2 />
					</Button>
					<Button
						type="button"
						variant={"ghost"}
						size={"icon"}
						className="hover:bg-slate-800 mr-4"
						onClick={handleRedo}
						disabled={
							!(state.history.currentIndex < state.history.history.length - 1)
						}
					>
						<Redo2 />
					</Button>
					<Button type="button" onClick={handleOnSave}>
						Uložit & Zavřít
					</Button>
				</aside>
			</nav>
		</TooltipProvider>
	);
}
