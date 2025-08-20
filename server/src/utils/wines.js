const formatWine = data => {
	const wine = {
		wid: data.wid,
		denomination: data.denomination,
		winemaker: data.winemaker,
		vintage: data.vintage,
	};
	return wine;
};

export { formatWine };
