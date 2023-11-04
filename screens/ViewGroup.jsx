import React, { useEffect, useState } from 'react';
import { Box, Stack, Flex, HStack, VStack, Heading, Text, FlatList, Pressable } from 'native-base';
import { Icon } from '@rneui/themed';
import MonthlyDetails from '../components/MonthlyDetails';
import BaseLayout from '../components/BaseLayout';
import { formatDate } from '../lib/methods';
import { supabase } from '../lib/supabase';
import { useLogin } from '../context/LoginProvider';
import { useIsFocused } from '@react-navigation/native';

const ViewGroup = ({ route }) => {
	const isFocused = useIsFocused();
	const { userDetails } = useLogin();
	const { title, data, creator } = route.params;
	const { expenses, group_id } = data;
	const [expenseParticipants, setExpenseParticipants] = useState();

	const [allExpenses, setAllExpenses] = useState([]);
	const fetchData = async () => {
		await getMemberDetails(data.group_members);
		await getUserExpense();
		categorizeExpensesByMonth(expenses);
	};
	useEffect(() => {
		fetchData();
		categorizeExpensesByMonth(expenses);
	}, [isFocused]);

	const categorizeExpensesByMonth = (expenses) => {
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
	};

	const getUserExpense = async () => {
		try {
			let { data: allExpenses, error } = await supabase
				.from('expenses')
				.select(
					`
					expense_id,
					group_id,
					paid_by,
					status,
					total_amount,
					created_by,
					expense_type,
					expense_participants(participant_id, expense_id, status, created_at, amount, pending_from, paid_by)`
				)
				.eq('group_id', group_id);

			let { data: groupMember, error: groupMemberError } = await supabase
				.from('group_members')
				.select(`user_id, users(username)`)
				.eq('group_id', group_id);

			let mappedUsers = groupMember.map((member) => ({
				user_id: member.user_id,
				username: member.users.username,
			}));

			const yourExpensesOwed = allExpenses
				.flatMap((expense) => expense.expense_participants)
				.filter(
					(ex) =>
						ex.pending_from !== userDetails.user_id &&
						ex.paid_by === userDetails.user_id &&
						ex.status === 'unsettled'
				)
				.map((participant) => ({
					...participant,
					username: mappedUsers.find((user) => user.user_id === participant.pending_from)
						?.username,
					paid_by_username: mappedUsers.find(
						(user) => user.user_id === participant.paid_by
					)?.username,
				}))
				.reduce((result, expense) => {
					const key = `${expense.paid_by}-${expense.pending_from}`;

					if (!result[key]) {
						result[key] = {
							paid_by: expense.paid_by,
							pending_from: expense.pending_from,
							username: expense.username,
							paid_by_username: expense.paid_by_username,
							amount: 0,
						};
					}

					result[key].amount += expense.amount;
					return result;
				}, {});

			const expensesOwedToYou = allExpenses
				.flatMap((expense) => expense.expense_participants)
				.filter(
					(ex) =>
						ex.pending_from === userDetails.user_id &&
						ex.paid_by !== userDetails.user_id &&
						ex.status === 'unsettled'
				)
				.map((participant) => ({
					...participant,
					username: mappedUsers.find((user) => user.user_id === participant.pending_from)
						?.username,
					paid_by_username: mappedUsers.find(
						(user) => user.user_id === participant.paid_by
					)?.username,
				}))
				.reduce((result, expense) => {
					const key = `${expense.paid_by}-${expense.pending_from}`;

					if (!result[key]) {
						result[key] = {
							paid_by: expense.paid_by,
							pending_from: expense.pending_from,
							username: expense.username,
							paid_by_username: expense.paid_by_username,
							amount: 0,
						};
					}

					result[key].amount += expense.amount;
					return result;
				}, {});

			const yourExpensesOwedArray = Object.values(yourExpensesOwed);
			const myDebt = Object.values(expensesOwedToYou);
			const combined = yourExpensesOwedArray.concat(myDebt);
			setExpenseParticipants(combined);

			// quite a long metode. This simply flatten the array object to get the expense_participant from expenses
			// then filter it to get only amount they owes me,
			// the map to get the username,
			// then reduct to group same user, and count total amount to each user
			// lastly convert back to array from key value object

			if (error || groupMemberError) {
				console.log(error || groupMemberError);
			}
		} catch (error) {
			console.log(error);
		}
	};

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

			<Text>{data.group_description}</Text>
			<Text>Group created on {formatDate(data.created_at)}</Text>
			<Text>Group created by {creator}</Text>
			<Box marginY={2}>
				<Stack direction="row" alignItems="center" justifyContent="space-between">
					<Stack direction="row" alignSelf="center" space={2}>
						{data.group_members.map((u, i) => {
							const iconName = u.gender === 'male' ? 'face-man' : 'face-woman';
							return (
								<Flex key={i} alignItems="center">
									<Icon size={40} name={iconName} type="material-community" />
									<Text>{u.username}</Text>
								</Flex>
							);
						})}
					</Stack>
					<Icon size={50} name="user-plus" type="feather" />
				</Stack>
			</Box>

			<HStack w="full" justifyContent="space-between" space={2} my={2}>
				<VStack space={2} justifyContent="center" w="full">
					{expenseParticipants?.map((detail) => (
						<HStack
							key={detail.pending_from}
							space={2}
							alignItems="center"
							_text={{
								fontSize: 'md',
								fontFamily: 'body',
							}}
							justifyContent="space-between"
						>
							<Flex
								direction="row"
								bg="white"
								padding="2"
								rounded="md"
								w="250px"
								shadow={2}
								justifyContent="space-between"
							>
								<Flex>
									<Text>
										{detail.username === userDetails.username
											? 'You'
											: detail.username}{' '}
										owes{' '}
										{detail.paid_by_username === userDetails.username
											? 'You'
											: detail.paid_by_username}
									</Text>
								</Flex>
								<Flex flexDirection="row" alignSelf="end">
									<Text
										color={
											detail.username === userDetails.username
												? 'red.400'
												: 'blue.400'
										}
										fontWeight="bold"
									>
										${detail.amount.toFixed(2)}
									</Text>
								</Flex>
							</Flex>

							<Flex
								w="80px"
								flexDirection="row"
								alignSelf="end"
								bg="white"
								paddingY="2"
								rounded="md"
								shadow={2}
								justifyContent="center"
							>
								<Pressable>
									<Text fontWeight="bold">
										{detail.status === 'unsettled' ? 'Remind' : 'Settled Up'}
									</Text>
								</Pressable>
							</Flex>
						</HStack>
					))}
				</VStack>
			</HStack>
			<FlatList
				showsVerticalScrollIndicator={false}
				data={allExpenses}
				renderItem={({ item }) => (
					<MonthlyDetails bill={item} expensesParticipants={expenseParticipants} />
				)}
			/>
		</BaseLayout>
	);
};

export default ViewGroup;
