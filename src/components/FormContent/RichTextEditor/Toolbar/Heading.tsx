"use client";

import { Toggle } from "@/components/ui/toggle";
import {
	Heading1,
	Heading2,
	Heading3,
	Heading4,
	Heading5,
	Heading6,
} from "lucide-react";

import type { Editor } from "@tiptap/react";

type Level = 1 | 2 | 3 | 4 | 5 | 6;

type Props = {
	level: Level;
	disabled?: boolean;
	editor: Editor;
};

export default function Heading({ level, disabled = false, editor }: Props) {
	return (
		<Toggle
			disabled={disabled}
			size={"sm"}
			pressed={editor.isActive("heading", { level: level })}
			onPressedChange={() => {
				editor.chain().focus().toggleHeading({ level: level }).run();
			}}
			className="disabled:cursor-not-allowed cursor-pointer"
		>
			{getIcon(level)}
		</Toggle>
	);
}

function getIcon(level: Level): React.ReactNode {
	switch (level) {
		case 1:
			return <Heading1 />;
		case 2:
			return <Heading2 />;
		case 3:
			return <Heading3 />;
		case 4:
			return <Heading4 />;
		case 5:
			return <Heading5 />;
		case 6:
			return <Heading6 />;
		default:
			return null;
	}
}
