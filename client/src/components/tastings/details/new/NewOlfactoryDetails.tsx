type OlfactoryExam = {
	intensity: string;
	complexity: string;
	quality: string;
	description: {
		aromatic: boolean;
		floral: boolean;
		spicy: boolean;
		varietal: boolean;
		vegetal: boolean;
		baking: boolean;
		fruity: boolean;
		fragrant: boolean;
		empyreumatic: boolean;
	};
	notes: string;
};

type Props = {
	exam: OlfactoryExam;
};

export default function NewOlfactoryDetails({ exam }: Props) {
	return <></>;
}
