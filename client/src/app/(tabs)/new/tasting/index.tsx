import TastingForm from "@/src/components/new/TastingForm";

export default function Tasting() {
	return (
		<TastingForm
			mode='create'
			nextPath='/new/tasting/visual'
			nextButtonText='VISUAL'
			title='Wine description'
			showExitButton={true}
			showCancelButton={true}
		/>
	);
}
