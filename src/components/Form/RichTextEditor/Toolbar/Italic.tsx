"use client";

import { Toggle } from "@/components/ui/toggle";
import { ItalicIcon } from "lucide-react";

import type { Editor } from "@tiptap/react";

type Props = {
	disabled?: boolean;
	editor: Editor;
};

export default function Italic({ disabled = false, editor }: Props) {
	return (
		<Toggle
			disabled={disabled}
			size={"sm"}
			pressed={editor.isActive("italic")}
			onPressedChange={() => {
				editor.chain().focus().toggleItalic().run();
			}}
			className="disabled:cursor-not-allowed cursor-pointer"
		>
			<ItalicIcon />
		</Toggle>
	);
}
