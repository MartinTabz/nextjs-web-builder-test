import { SimpleForm } from "./_components/Form";

export default function IndexPage() {
	return (
		<div className="min-h-screen py-8">
			<div className="container mx-auto px-4">
				<h1 className="text-4xl font-bold text-center mb-8">
					Simple Form Demo
				</h1>
				<SimpleForm />
			</div>
		</div>
	);
}
