"use client";

import { Toggle } from "@/components/ui/toggle";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { LinkIcon, Plus, Unlink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import type { Editor } from "@tiptap/react";

type Props = {
	disabled?: boolean;
	editor: Editor;
};

export default function Link({ disabled = false, editor }: Props) {
	const [link, setLink] = useState<string>(
		editor.getAttributes("link").href ?? ""
	);

	const addLink = () => {
		if (!link) {
			return toast.error("Chybí odkaz");
		}

		if (!link.includes("http")) {
			return toast.error("Odkaz není platný");
		}

		editor
			.chain()
			.focus()
			.extendMarkRange("link")
			.setLink({
				href: link,
				target: "_blank",
			})
			.run();
	};

	const deleteLink = () => {
		editor.chain().focus().extendMarkRange("link").unsetLink().run();
	};

	return (
		<>
			<Popover>
				<PopoverTrigger asChild>
					<Toggle
						disabled={disabled}
						size={"sm"}
						pressed={editor.isActive("link")}
						// onPressedChange={() => {
						// 	// editor.chain().focus().toggleBold().run();
						// }}
						className="disabled:cursor-not-allowed cursor-pointer"
					>
						<LinkIcon />
					</Toggle>
				</PopoverTrigger>
				<PopoverContent>
					<div className="flex flex-col gap-2">
						<Input
							placeholder="https://..."
							value={link}
							onChange={(e) => setLink(e.target.value)}
						/>
						<div className="grid w-full grid-cols-4 gap-1">
							<Button onClick={addLink} className="col-span-3 cursor-pointer">
								<Plus />
							</Button>
							<Button
								onClick={deleteLink}
								className="cursor-pointer"
								variant={"destructive"}
							>
								<Unlink />
							</Button>
						</div>
					</div>
				</PopoverContent>
			</Popover>
		</>
	);
}
