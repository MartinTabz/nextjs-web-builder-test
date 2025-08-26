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
	const { state, dispatch } = useEditor();
	const isDisabled = state.disabled;

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
		// TODO: Return the content of the editor
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
							if (!isDisabled) {
								dispatch({
									type: "CHANGE_DEVICE",
									payload: { device: value as DeviceTypes },
								});
							}
						}}
					>
						<TabsList className="grid w-full grid-cols-3 bg-transparent h-fit">
							<TabsTrigger
								value="Desktop"
								className="data-[state=active]:bg-muted w-10 h-10 p-0 cursor-pointer"
								disabled={isDisabled}
							>
								<Laptop />
							</TabsTrigger>

							<TabsTrigger
								value="Tablet"
								className="data-[state=active]:bg-muted w-10 h-10 p-0 cursor-pointer"
								disabled={isDisabled}
							>
								<Tablet />
							</TabsTrigger>

							<TabsTrigger
								value="Mobile"
								className="data-[state=active]:bg-muted w-10 h-10 p-0 cursor-pointer"
								disabled={isDisabled}
							>
								<Smartphone />
							</TabsTrigger>
						</TabsList>
					</Tabs>
				</aside>
				<aside className="flex items-center gap-2">
					<Button
						variant={"ghost"}
						size={"icon"}
						className="hover:bg-slate-800"
						onClick={handlePreviewClick}
						disabled={isDisabled}
					>
						<EyeIcon />
					</Button>
					<Button
						variant={"ghost"}
						size={"icon"}
						className="hover:bg-slate-800"
						onClick={handleUndo}
						disabled={isDisabled || !(state.history.currentIndex > 0)}
					>
						<Undo2 />
					</Button>
					<Button
						variant={"ghost"}
						size={"icon"}
						className="hover:bg-slate-800 mr-4"
						onClick={handleRedo}
						disabled={
							isDisabled ||
							!(state.history.currentIndex < state.history.history.length - 1)
						}
					>
						<Redo2 />
					</Button>
					<Button onClick={handleOnSave} disabled={isDisabled}>
						Uložit & Zavřít
					</Button>
				</aside>
			</nav>
		</TooltipProvider>
	);
}
