import TastingForm from "@/src/components/new/TastingForm";

export default function New() {
	return (
		<TastingForm
			mode='create'
			nextPath='/new/visual'
			nextButtonText='VISUAL'
			title='Wine description'
			showExitButton={true}
			showCancelButton={true}
		/>
	);
}
