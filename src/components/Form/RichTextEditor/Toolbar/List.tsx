"use client";

import { Toggle } from "@/components/ui/toggle";
import { List as ListIcon, ListOrdered } from "lucide-react";

import type { Editor } from "@tiptap/react";

type ListType = "ordered" | "dotted";

type Props = {
	listType: ListType;
	disabled?: boolean;
	editor: Editor;
};

export default function List({ listType, disabled = false, editor }: Props) {
	return (
		<Toggle
			disabled={disabled}
			size={"sm"}
			pressed={editor.isActive(
				listType === "ordered" ? "orderedList" : "bulletList"
			)}
			onPressedChange={() =>
				listType === "ordered"
					? editor.chain().focus().toggleOrderedList().run()
					: editor.chain().focus().toggleBulletList().run()
			}
			className="disabled:cursor-not-allowed cursor-pointer"
		>
			{getIcon(listType)}
		</Toggle>
	);
}

function getIcon(listType: ListType): React.ReactNode {
	switch (listType) {
		case "dotted":
			return <ListIcon />;
		case "ordered":
			return <ListOrdered />;
		default:
			return null;
	}
}
