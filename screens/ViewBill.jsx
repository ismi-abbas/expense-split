import React from 'react';
import { Box, Stack, Flex, HStack, VStack, Center, Heading, Text, ScrollView, StatusBar, View } from 'native-base';
import { Icon } from '@rneui/themed';
import MonthlyDetails from '../components/MonthlyDetails';

const users = [
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

const groupExpenseDetails = [
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

const monthlyBills = [
	{
		month: 'July',
		records: [
			{
				expenseTitle: null,
				payer: null,
				paidTo: 'Emily',
				amount: 34.5,
				type: 'settlement',
			},
			{
				expenseTitle: null,
				payer: null,
				paidTo: 'Zeus',
				amount: 89.2,
				type: 'settlement',
			},
		],
	},
	{
		month: 'June',
		records: [
			{
				expenseTitle: 'Flight ticket',
				payer: 'Emily',
				paidTo: null,
				amount: 83,
				type: 'expense',
				date: new Date(2023, 5, 30),
			},
			{
				expenseTitle: 'Grab car to own',
				payer: 'You',
				paidTo: null,
				amount: 23,
				type: 'expense',
			},
			{
				expenseTitle: 'Pub crawl',
				payer: 'Zeus',
				paidTo: null,
				amount: 83,
				type: 'expense',
			},
		],
	},
	{
		month: 'May',
		records: [
			{
				expenseTitle: 'Belanaja Hani makan',
				payer: 'Emily',
				paidTo: null,
				amount: 83,
				type: 'expense',
			},
			{
				expenseTitle: 'Grab car to own',
				payer: 'You',
				paidTo: null,
				amount: 23,
				type: 'expense',
			},
			{
				expenseTitle: 'Pub crawl',
				payer: 'Zeus',
				paidTo: null,
				amount: 83,
				type: 'expense',
			},
		],
	},
	{
		month: 'May',
		records: [
			{
				expenseTitle: 'Belanaja Hani makan',
				payer: 'Emily',
				paidTo: null,
				amount: 83,
				type: 'expense',
			},
			{
				expenseTitle: 'Grab car to own',
				payer: 'You',
				paidTo: null,
				amount: 23,
				type: 'expense',
			},
			{
				expenseTitle: 'Pub crawl',
				payer: 'Zeus',
				paidTo: null,
				amount: 83,
				type: 'expense',
			},
		],
	},
];

const ViewBill = ({ expenseTitle, createdBy, createdDate, expenseDetails }) => {
	expenseTitle = 'Penang Trip';
	expenseDetails = 'Graduation trip yoohoooooo ';
	createdBy = 'Amelia';
	createdDate = Date.now();

	return (
		<View paddingTop={20} alignSelf="center" paddingX={10} bg="purple.200">
			<StatusBar barStyle={'light-content'} />

			{/* Title */}
			<Box
				_text={{
					fontSize: '2xl',
					fontWeight: 'medium',
					color: 'warmGray.800',
					letterSpacing: 'md',
					fontFamily: 'heading',
				}}>
				<Heading>{expenseTitle}</Heading>
			</Box>

			{/* Group Info */}
			<Text>{expenseDetails}</Text>
			<Text>Group created on {createdDate}</Text>
			<Text>Group created by {createdBy}</Text>
			<Box marginY={2}>
				<Stack direction="row" alignItems="center" justifyContent="space-between">
					<Stack direction="row" alignSelf="center">
						{users.map(u => {
							const iconName = u.sex === 'male' ? 'face-man' : 'face-woman';
							return <Icon key={u.id} size={40} name={iconName} type="material-community" />;
						})}
					</Stack>
					<Icon size={40} name="user-plus" type="feather" />
				</Stack>
			</Box>

			<HStack w="full" justifyContent="space-between" space={2} my={2}>
				<VStack space={2} justifyContent="center" w="3/4">
					{groupExpenseDetails.map((detail, index) => (
						<HStack
							key={index}
							space={2}
							alignItems="center"
							bg="white"
							padding="2"
							rounded="md"
							shadow={2}
							_text={{
								fontSize: 'md',
								fontFamily: 'body',
							}}>
							<Flex w={'3/4'}>
								<Text>
									{detail.user} owes {detail.from}
								</Text>
							</Flex>
							<Flex flexDirection="row" alignSelf="end">
								<Text color="blue.400" fontWeight="bold">
									{detail.amount}$
								</Text>
							</Flex>
						</HStack>
					))}
				</VStack>
				<VStack space={2} justifyContent="center">
					{groupExpenseDetails.map((detail, index) => (
						<HStack
							key={index}
							space={2}
							alignItems="center"
							bg="white"
							width="auto"
							padding="2"
							rounded="md"
							shadow={2}
							_text={{
								fontSize: 'md',
								fontFamily: 'body',
							}}>
							<Text>{detail.option}</Text>
						</HStack>
					))}
				</VStack>
			</HStack>
			<ScrollView>
				<MonthlyDetails bills={monthlyBills} />
			</ScrollView>
		</View>
	);
};

export default ViewBill;
