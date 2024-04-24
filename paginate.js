export default async (model, page, pageSize) => {
	page = page ? parseInt(page) : 1;

	let totalPages = Math.ceil((await model.count()) / pageSize);

	let records = await model.findAll({
		offset: (page - 1) * pageSize,
		limit: pageSize,
	});

	let elements = [];
	for (let i = 1; i <= 3; i++) {
		elements[i] = i;
	}

	if (page > 1) {
		elements.push("...");
	}

	for (let i = page - 2; i <= page + 2 && i <= totalPages; i++) {
		elements[i] = i;
	}

	if (page < totalPages - 2) {
		elements.push("...");
	}

	for (let i = totalPages - 2; i <= totalPages; i++) {
		elements[i] = i;
	}

	elements = elements.filter((e) => e);

	let pagination = {
		total: totalPages,
		current: page,
		elements,
	};

	return [records, pagination];
};
