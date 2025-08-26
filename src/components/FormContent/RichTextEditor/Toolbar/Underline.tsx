"use client";

import { Toggle } from "@/components/ui/toggle";
import { UnderlineIcon } from "lucide-react";

import type { Editor } from "@tiptap/react";

type Props = {
	disabled?: boolean;
	editor: Editor;
};

export default function Underline({ disabled = false, editor }: Props) {
	return (
		<Toggle
			disabled={disabled}
			size={"sm"}
			pressed={editor.isActive("underline")}
			onPressedChange={() => {
				editor.chain().focus().toggleUnderline().run();
			}}
			className="disabled:cursor-not-allowed cursor-pointer"
		>
			<UnderlineIcon />
		</Toggle>
	);
}
