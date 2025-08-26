"use client";

import { Button } from "@/components/ui/button";
import { EditorElement, useEditor } from "../Utilities/provider";
import clsx from "clsx";
import { EyeOff } from "lucide-react";
import { useEffect } from "react";
import Recursive from "./PageEditorComponents/recursive";

type Props = {
	liveMode?: boolean;
};

export default function PageEditor({ liveMode }: Props) {
	const { dispatch, state } = useEditor();

	useEffect(() => {
		if (liveMode) {
			dispatch({
				type: "TOGGLE_LIVE_MODE",
				payload: { value: true },
			});
		}
	}, [liveMode]);

	const handleClick = () => {
		dispatch({
			type: "CHANGE_CLICKED_ELEMENT",
			payload: {},
		});
	};

	const handleUnpreview = () => {
		dispatch({
			type: "TOGGLE_PREVIEW_MODE",
		});
		dispatch({
			type: "TOGGLE_LIVE_MODE",
		});
	};

	return (
		<div
			className={clsx(
				"use-automation-zoom-in shadow-2xl h-full overflow-scroll mr-[385px] bg-background transition-all rounded-none",
				{
					"p-0 !mr-0":
						state.editor.previewMode === true || state.editor.liveMode === true,
					"!w-[850px]": state.editor.device === "Tablet",
					"!w-[420px]": state.editor.device === "Mobile",
					"w-full": state.editor.device === "Desktop",
				}
			)}
			onClick={handleClick}
		>
			{state.editor.previewMode && state.editor.liveMode && (
				<Button
					variant={"ghost"}
					size={"icon"}
					className="w-6 h-6 bg-slate-600 p-[2px] fixed top-0 left-0 z-[100]"
					onClick={handleUnpreview}
				>
					<EyeOff />
				</Button>
			)}
			{Array.isArray(state.editor.elements) &&
				state.editor.elements.map((childElement: EditorElement) => (
					<Recursive key={childElement.id} element={childElement} />
				))}
		</div>
	);
}
