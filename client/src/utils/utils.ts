export function capitalizeFirst(input: string): string {
    return input
        .split(' ')
        .map(word => 
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(' ');
}

export function formatDescription(date: string, time: string, location: string): string {
    const formattedDate = new Date(date.split('T')[0]).toLocaleDateString(undefined, {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
    return `${formattedDate} (${time.split('T')[1].slice(0, 5)})\n@ ${location}`;
}