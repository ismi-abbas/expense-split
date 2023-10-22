export const monthlyBills = [
	{
		month: 'December',
		records: [
			{
				expenseTitle: 'Christmas Gifts',
				createdBy: 'Amelia',
				createdDate: Date.now(),
				payer: 'You',
				paidTo: null,
				amount: 200.0,
				type: 'expense',
			},
			{
				expenseTitle: 'Holiday Travel',
				createdBy: 'Amelia',
				createdDate: Date.now(),
				payer: 'Zeus',
				paidTo: null,
				amount: 250.0,
				type: 'expense',
			},
		],
	},
	{
		month: 'November',
		records: [
			{
				expenseTitle: 'Thanksgiving Dinner',
				createdBy: 'Amelia',
				createdDate: Date.now(),
				payer: 'Zeus',
				paidTo: null,
				amount: 90.0,
				type: 'expense',
			},
			{
				expenseTitle: 'Black Friday Shopping',
				createdBy: 'Amelia',
				createdDate: Date.now(),
				payer: 'Emily',
				paidTo: null,
				amount: 120.0,
				type: 'expense',
			},
		],
	},
	{
		month: 'October',
		records: [
			{
				expenseTitle: 'Hiking Trip',
				createdBy: 'Amelia',
				createdDate: Date.now(),
				payer: 'You',
				paidTo: null,
				amount: 75.0,
				type: 'expense',
			},
			{
				expenseTitle: 'Dinner with Friends',
				createdBy: 'Amelia',
				createdDate: Date.now(),
				payer: null,
				paidTo: 'Zeus',
				amount: 60.0,
				type: 'settlement',
			},
		],
	},
	{
		month: 'September',
		records: [
			{
				expenseTitle: 'Concert Tickets',
				createdBy: 'Amelia',
				createdDate: Date.now(),
				payer: 'Zeus',
				paidTo: null,
				amount: 80.0,
				type: 'expense',
			},
		],
	},
	{
		month: 'August',
		records: [
			{
				expenseTitle: 'Beach Vacation',
				createdBy: 'Amelia',
				createdDate: Date.now(),
				payer: null,
				paidTo: 'Emily',
				amount: 500.0,
				type: 'settlement',
			},
			{
				expenseTitle: 'Home Renovation',
				createdBy: 'Amelia',
				createdDate: Date.now(),
				payer: 'You',
				paidTo: null,
				amount: 1000.0,
				type: 'expense',
			},
		],
	},
	{
		month: 'July',
		records: [
			{
				expenseTitle: 'Groceries',
				createdBy: 'Amelia',
				createdDate: Date.now(),
				payer: 'Zeus',
				paidTo: null,
				amount: 50.0,
				type: 'expense',
			},
			{
				expenseTitle: 'Restaurant Dinner',
				createdBy: 'Amelia',
				createdDate: Date.now(),
				payer: 'Emily',
				paidTo: null,
				amount: 75.0,
				type: 'expense',
			},
		],
	},
	{
		month: 'June',
		records: [
			{
				expenseTitle: 'Movie Tickets',
				createdBy: 'Amelia',
				createdDate: Date.now(),
				payer: 'Emily',
				paidTo: null,
				amount: 30.0,
				type: 'expense',
			},
			{
				expenseTitle: 'Gasoline',
				createdBy: 'Amelia',
				createdDate: Date.now(),
				payer: 'You',
				paidTo: null,
				amount: 40.0,
				type: 'expense',
			},
		],
	},
	{
		month: 'May',
		records: [
			{
				expenseTitle: 'Online Shopping',
				createdBy: 'Amelia',
				createdDate: Date.now(),
				payer: 'Zeus',
				paidTo: null,
				amount: 60.0,
				type: 'expense',
			},
			{
				expenseTitle: 'Coffee Run',
				createdBy: 'Amelia',
				createdDate: Date.now(),
				payer: 'Emily',
				paidTo: null,
				amount: 20.0,
				type: 'expense',
			},
		],
	},
	{
		month: 'April',
		records: [
			{
				expenseTitle: 'Concert Tickets',
				createdBy: 'Amelia',
				createdDate: Date.now(),
				payer: 'Zeus',
				paidTo: null,
				amount: 80.0,
				type: 'expense',
			},
			{
				expenseTitle: 'Utility Bills',
				createdBy: 'Amelia',
				createdDate: Date.now(),
				payer: 'Emily',
				paidTo: null,
				amount: 120.0,
				type: 'expense',
			},
		],
	},
	{
		month: 'March',
		records: [
			{
				expenseTitle: 'Travel Expenses',
				createdBy: 'Amelia',
				createdDate: Date.now(),
				payer: 'Emily',
				paidTo: null,
				amount: 150.0,
				type: 'expense',
			},
			{
				expenseTitle: 'Car Maintenance',
				createdBy: 'Amelia',
				createdDate: Date.now(),
				payer: 'You',
				paidTo: null,
				amount: 80.0,
				type: 'expense',
			},
		],
	},
	{
		month: 'February',
		records: [
			{
				expenseTitle: "Valentine's Day Gift",
				createdBy: 'Amelia',
				createdDate: Date.now(),
				payer: 'Emily',
				paidTo: null,
				amount: 30.0,
				type: 'expense',
			},
			{
				expenseTitle: 'Heating Bill',
				createdBy: 'Amelia',
				createdDate: Date.now(),
				payer: 'Zeus',
				paidTo: null,
				amount: 70.0,
				type: 'expense',
			},
		],
	},
	{
		month: 'January',
		records: [
			{
				expenseTitle: "New Year's Party",
				createdBy: 'Amelia',
				createdDate: Date.now(),
				payer: 'Zeus',
				paidTo: null,
				amount: 100.0,
				type: 'expense',
			},
			{
				expenseTitle: 'Winter Clothing',
				createdBy: 'Amelia',
				createdDate: Date.now(),
				payer: 'You',
				paidTo: null,
				amount: 50.0,
				type: 'expense',
			},
		],
	},
];

export const users = [
	{
		id: 1,
		name: 'Amelia',
		sex: 'female',
	},
	{
		id: 2,
		name: 'Darren',
		sex: 'male',
	},
	{
		id: 3,
		name: 'Frank',
		sex: 'male',
	},
	{
		id: 4,
		name: 'Bob',
		sex: 'male',
	},
	{
		id: 5,
		name: 'Daniel',
		sex: 'male',
	},
];

export const groupExpenseDetails = [
	{
		user: 'Amelia',
		from: 'you',
		amount: '100',
		option: 'Remind',
	},
	{
		user: 'Darren',
		from: 'you',
		amount: '60',
		option: 'Remind',
	},
	{
		user: 'You',
		from: 'Frank',
		amount: '40',
		option: 'Settle Up',
	},
];

export const userDetails = {
	fullName: 'Dan Abramov',
	name: 'Dan',
	email: 'dan@react.dev',
	phoneNumber: '01234567890',
	address: '123 Main St, Suite 330, Boston, MA, USA',
	sex: 'male',
	accountID: '80912837',
	accountStatus: 'active',
	groups: ['Penang Trip', 'Perak Trip', 'Staycation'],
	friends: [
		{
			name: 'Darren',
			id: 1,
		},
		{
			name: 'Frank',
			id: 2,
		},
		{
			name: 'Allister',
			id: 3,
		},
		{
			name: 'Jonson',
			id: 4,
		},
		{
			name: 'Zeus',
			id: 5,
		},
		{
			name: 'Darren',
			id: 1,
		},
		{
			name: 'Darren',
			id: 1,
		},
	],
};

export const activities = [
	{
		id: 1,
		type: 'transaction',
		amount: '100',
		transferTo: 'Zeus',
	},
	{
		id: 2,
		type: 'group',
		addedTo: 'Room 3A',
		addedBy: 'Zan',
	},
	{
		id: 3,
		type: 'group-request',
		requestedTo: 'Room 3A-2',
		status: 'active',
	},
	{
		id: 4,
		type: 'other',
		addedTo: 'Room 3A',
		addedBy: 'Zan',
	},
	{
		id: 5,
		type: 'transaction',
		amount: '100',
		transferTo: 'Zeus',
	},
	{
		id: 6,
		type: 'group',
		addedTo: 'Room 3A',
		addedBy: 'Zan',
	},
	{
		id: 7,
		type: 'group-request',
		requestedTo: 'Room 3A-2',
		status: 'active',
	},
	{
		id: 8,
		type: 'other',
		addedTo: 'Room 3A',
		addedBy: 'Zan',
	},
	{
		id: 9,
		type: 'group',
		addedTo: 'Room 3A',
		addedBy: 'Zan',
	},
	{
		id: 10,
		type: 'group-request',
		requestedTo: 'Room 3A-2',
		status: 'active',
	},
	{
		id: 11,
		type: 'other',
		addedTo: 'Room 3A',
		addedBy: 'Zan',
	},
];

export const groups = [
	{
		id: 1,
		name: 'Penang Trip',
		totalBill: 500,
		totalMember: 4,
	},
	{
		id: 2,
		name: 'Room 3A-2',
		totalBill: 250,
		totalMember: 2,
	},
	{
		id: 3,
		name: 'Room 3B',
		totalBill: 150,
		totalMember: 1,
	},
	{
		id: 4,
		name: 'Penang Trip',
		totalBill: 800,
		totalMember: 6,
	},
	{
		id: 5,
		name: 'Room 3A-2',
		totalBill: 300,
		totalMember: 3,
	},
];
