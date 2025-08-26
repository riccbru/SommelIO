type VisualExam = {
	limpidity: string;
	color_family: string;
	color_shade: string;
	consistency: string;
	chains_number: string;
	rise_speed: string;
	bubble_size: string;
	bubble_persistence: string;
	notes: string;
};

type Props = {
	exam: VisualExam;
};

export default function NewVisualDetails({ exam }: Props) {
	return <></>;
}
