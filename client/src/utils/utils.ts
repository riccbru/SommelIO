export function capitalizeFirst(input: string): string {
	return input
		.split(" ")
		.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join(" ");
}

export function formatDescription(date: string, time: string, location: string): string {
	const formattedDate = new Date(date.split("T")[0]).toLocaleDateString(undefined, {
		month: "long",
		day: "numeric",
		year: "numeric",
	});
	return `${location}\n${formattedDate}, ${time}`;
}

export function formatOption(value: string): string {
	if (!value || value === null || value === undefined) return "";
	const withSpaces = value.replace("_", " ");
	if (withSpaces.length === 0) return "";
	return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1).toLowerCase();
}

export function getInitials(name: string) {
	return name
		.split(" ")
		.map(word => word[0])
		.join("")
		.toUpperCase()
		.slice(0, 2);
}

export function isRightRange(num: number, MIN: number, MAX: number): boolean {
	return num >= MIN && num <= MAX;
}
