import React, { useEffect, useState } from 'react';
import { Box, Stack, Flex, HStack, VStack, Heading, Text, FlatList, Button } from 'native-base';
import { Icon } from '@rneui/themed';
import MonthlyDetails from '../components/MonthlyDetails';
import BaseLayout from '../components/BaseLayout';
import { monthlyBills, users, groupExpenseDetails } from '../DummyData';
import { formatDate } from '../lib/methods';
import { supabase } from '../lib/supabase';

const ViewGroup = ({ route }) => {
	const { title, data, creator } = route.params;
	const { expenses } = data;

	const [allExpenses, setAllExpenses] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			await getMemberDetails(data.group_members);
		};
		fetchData();
		categorizeExpensesByMonth(expenses);
	}, []);

	function categorizeExpensesByMonth(expenses) {
		const categorizedExpenses = [];

		expenses.forEach((expense) => {
			const date = new Date(expense.created_at);
			const month = date.toLocaleString('default', { month: 'long', year: 'numeric' });

			let found = categorizedExpenses.find((item) => item.month === month);

			if (!found) {
				found = { month, expenses: [] };
				categorizedExpenses.push(found);
			}

			found.expenses.push(expense);
		});

		setAllExpenses(categorizedExpenses);
	}

	const getMemberDetails = async (data) => {
		for (let i = 0; i < data.length; i++) {
			const user = data[i];
			const { data: details, error } = await supabase
				.from('users')
				.select('username, gender, phone_number')
				.eq('user_id', user.user_id);

			user.username = details[0].username;
			user.gender = details[0].gender;
		}
	};

	return (
		<BaseLayout>
			<Box
				_text={{
					fontSize: '2xl',
					fontWeight: 'medium',
					color: 'warmGray.800',
					letterSpacing: 'md',
					fontFamily: 'heading',
				}}
			>
				<Heading>{title}</Heading>
			</Box>

			{/* Group Info */}
			<Text>{data.group_description}</Text>
			<Text>Group created on {formatDate(data.created_at)}</Text>
			<Text>Group created by {creator}</Text>
			<Box marginY={2}>
				<Stack direction="row" alignItems="center" justifyContent="space-between">
					<Stack direction="row" alignSelf="center" space={2}>
						{data.group_members.map((u, i) => {
							const iconName = u.gender === 'male' ? 'face-man' : 'face-woman';
							return (
								<Box key={i}>
									<Icon size={40} name={iconName} type="material-community" />
									<Text>{u.username}</Text>
								</Box>
							);
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
							}}
						>
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
							}}
						>
							<Text>{detail.option}</Text>
						</HStack>
					))}
				</VStack>
			</HStack>
			<Button>Refresh</Button>
			<FlatList
				showsVerticalScrollIndicator={false}
				data={allExpenses}
				renderItem={({ item }) => <MonthlyDetails bill={item} />}
			/>
		</BaseLayout>
	);
};

export default ViewGroup;
