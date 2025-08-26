"use client";

type Content = {
   type: "rte" | "web";
   content: string;
}

type Props = {
   content: Content;
   onUpdate: (content: Content) => void;
}

export default function FormContentAdapter({ content, onUpdate }: Props) {
	return <div>FormContentAdapter</div>;
}