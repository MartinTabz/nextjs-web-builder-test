"use client";

import Heading from "./Heading";
import Bold from "./Bold";
import Italic from "./Italic";
import Underline from "./Underline";
import List from "./List";
import Link from "./Link";

import type { Editor } from "@tiptap/react";

type Props = {
	disabled?: boolean;
	editor: Editor;
};

export default function Toolbar({ editor, disabled = false }: Props) {
	return (
		<div className="border gap-0.5 border-input bg-transparent rounded-sm mb-1 flex items-center justify-start p-1 flex-wrap">
			<Heading level={2} editor={editor} disabled={disabled} />
			<Heading level={3} editor={editor} disabled={disabled} />
			<Separator />
			<Bold editor={editor} disabled={disabled} />
			<Italic editor={editor} disabled={disabled} />
			<Underline editor={editor} disabled={disabled} />
			<Separator />
			<List listType="dotted" editor={editor} disabled={disabled} />
			<List listType="ordered" editor={editor} disabled={disabled} />
			<Separator />
			<Link editor={editor} disabled={disabled} />
		</div>
	);
}

function Separator() {
	return <div className="w-[1px] bg-border h-7 mx-2"></div>;
}
