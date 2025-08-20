const formatCoefficients = data => {
	const coefficients = {};
	data.forEach(item => {
		coefficients[item.attribute] = item.coefficient;
	});
	return coefficients;
};

export { formatCoefficients };
