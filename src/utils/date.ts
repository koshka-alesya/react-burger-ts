export function formatRelativeDate(isoDateString: string): string {
	const date = new Date(isoDateString);
	const now = new Date();

	const time = date.toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit',
	});

	const startOfToday = new Date(
		now.getFullYear(),
		now.getMonth(),
		now.getDate()
	);
	const startOfThatDay = new Date(
		date.getFullYear(),
		date.getMonth(),
		date.getDate()
	);

	const diffMs = startOfToday.getTime() - startOfThatDay.getTime();
	const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

	if (diffDays === 0) {
		return `Сегодня, ${time}`;
	} else if (diffDays === 1) {
		return `Вчера, ${time}`;
	} else {
		return `${diffDays} ${pluralizeDays(diffDays)} назад, ${time}`;
	}
}

function pluralizeDays(n: number): string {
	if (n % 10 === 1 && n % 100 !== 11) return 'день';
	if ([2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100))
		return 'дня';
	return 'дней';
}
