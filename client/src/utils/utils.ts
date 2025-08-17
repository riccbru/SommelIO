export function capitalizeFirst(input: string): string {
	return input
		.split(" ")
		.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join(" ");
}

export function formatDescription(
	lang: string,
	date: string,
	time: string,
	location: string
): string {
	const formattedDate = new Date(date.split("T")[0]).toLocaleDateString(lang, {
		month: "long",
		day: "numeric",
		year: "numeric",
	});
	const [hours, minutes] = time.split(":").map(Number);
	const dateTime = new Date(date);
	dateTime.setHours(hours, minutes);

	const formattedTime = dateTime.toLocaleTimeString(lang, {
		hour: "2-digit",
		minute: "2-digit",
	});
	return `${formattedDate} @ ${formattedTime}\n${location}`;
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
