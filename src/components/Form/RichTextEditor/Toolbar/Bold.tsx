"use client";

import { Toggle } from "@/components/ui/toggle";
import { BoldIcon } from "lucide-react";

import type { Editor } from "@tiptap/react";

type Props = {
	disabled?: boolean;
	editor: Editor;
};

export default function Bold({ disabled = false, editor }: Props) {
	return (
		<Toggle
			disabled={disabled}
			size={"sm"}
			pressed={editor.isActive("bold")}
			onPressedChange={() => {
				editor.chain().focus().toggleBold().run();
			}}
			className="disabled:cursor-not-allowed cursor-pointer"
		>
			<BoldIcon />
		</Toggle>
	);
}
