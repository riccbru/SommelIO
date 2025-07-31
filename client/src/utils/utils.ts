export function capitalizeFirst(input: string): string {
    return input
        .split(' ')
        .map(word => 
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(' ');
}

export function formatDescription(date: string, time: string, location: string): string {
    return `${date.split('T')[0]} (${time.split('T')[1].slice(0, 5)}) @ ${location}`;
}