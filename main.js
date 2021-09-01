// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];
const mystery6 = [9, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [
	valid1,
	valid2,
	valid3,
	valid4,
	valid5,
	invalid1,
	invalid2,
	invalid3,
	invalid4,
	invalid5,
	mystery1,
	mystery2,
	mystery3,
	mystery4,
	mystery5,
	mystery6,
];

// Add your functions below:
const validateCred = (singleCardArr) => {
	const reversedArr = [...singleCardArr].reverse();
	reversedArr.forEach((element, index, source) =>
		index % 2 === 0
			? (source[index] = element)
			: element * 2 > 9
			? (source[index] = element * 2 - 9)
			: (source[index] = element * 2)
	);
	const sum = reversedArr.reduce((acc, value) => (acc += value));
	return sum % 10 === 0;
};

const findInvalidCards = (multiCardArr) =>
	multiCardArr.filter((card) => !validateCred(card));

const invalidCards = findInvalidCards(batch);
const invalidCardStrings = invalidCards.map((card) => card.join(''));
console.log('invalid cards:', invalidCardStrings);
document.write('<h2>invalid cards:</h2>', invalidCardStrings.join('<br>'));

const idInvalidCardCompanies = (invalidCardsArr) => {
	const companies = [];
	invalidCardsArr.forEach((card) => {
		switch (card[0]) {
			case 3:
				if (!companies.includes('American Express'))
					companies.push('American Express');
				break;
			case 4:
				if (!companies.includes('Visa')) companies.push('Visa');
				break;
			case 5:
				if (!companies.includes('Mastercard')) companies.push('Mastercard');
				break;
			case 6:
				if (!companies.includes('Discover')) companies.push('Discover');
				break;
			default:
				companies.push('Company not found');
		}
	});
	return companies;
};

const companiesWithInvalidCards = idInvalidCardCompanies(invalidCards);
console.log('companies with invalid cards:\n', companiesWithInvalidCards);
document.write(
	'<h2><br>companies with invalid cards:</h2>',
	companiesWithInvalidCards.join('<br>')
);

console.log('company - cards objects:');
const companyCardsObjects = [];
for (let company of companiesWithInvalidCards) {
	switch (company[0]) {
		case 'A':
			companyCardsObjects.push({
				Amex: invalidCardStrings.filter((card) => card[0] === '3'),
			});
			break;
		case 'V':
			companyCardsObjects.push({
				Visa: invalidCardStrings.filter((card) => card[0] === '4'),
			});
			break;
		case 'M':
			companyCardsObjects.push({
				Mastercard: invalidCardStrings.filter((card) => card[0] === '5'),
			});
			break;
		case 'D':
			companyCardsObjects.push({
				Discover: invalidCardStrings.filter((card) => card[0] === '6'),
			});
			break;
		default:
			companyCardsObjects.push({
				Unknown: invalidCardStrings.filter(
					(card) =>
						card[0] !== '3' &&
						card[0] !== '4' &&
						card[0] !== '5' &&
						card[0] !== '6'
				),
			});
	}
}
console.log(companyCardsObjects);

console.log('company - cards arrays:');
const companyCardsArrays = [];
companyCardsObjects.forEach((obj) => {
	companyCardsArrays.push(Object.keys(obj).map((key) => [key, obj[key]]));
});
console.log(companyCardsArrays);

document.write('<h2><br>company - cards arrays:<br></h2>');
companyCardsArrays.forEach((arr) => {
	document.write('<h3>', arr[0][0], ':', '</h3>');
	arr[0][1].forEach((num) =>
		document.write('&nbsp&nbsp&nbsp&nbsp', num, '<br>')
	);
});
