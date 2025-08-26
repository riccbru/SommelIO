type TasteExam = {
	sweetness: string;
	acidity: string;

	alcohols: string;
	tannicity: string;

	softness: string;
	saltiness: string;

	effervescence: string;

	intensity: string;
	structure: string;
	balance: string;
	persistence: string;

	quality: string;

	notes: string;
};

type Props = {
	exam: TasteExam;
};

export default function NewTasteDetails({ exam }: Props) {
	return <></>;
}
