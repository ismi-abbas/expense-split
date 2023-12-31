import React, { useEffect, useState } from 'react';
import BaseLayout from '../components/BaseLayout';
import {
	Box,
	Center,
	Flex,
	Pressable,
	ScrollView,
	Text,
	Stack,
	PresenceTransition,
} from 'native-base';
import { Icon } from '@rneui/base';
import { supabase } from '../lib/supabase';
import { useIsFocused } from '@react-navigation/native';
import { useLogin } from '../context/LoginProvider';

const Group = ({ navigation }) => {
	const { userDetails } = useLogin();
	const [groups, setGroups] = useState([]);
	const [amountOwe, setAmountOwe] = useState(0);
	const [amountOwed, setAmountOwed] = useState(0);
	const [isHidden, setIsHidden] = useState(false);
	const isFocused = useIsFocused();

	useEffect(() => {
		fetchData();
	}, [isFocused]);

	const fetchData = async () => {
		try {
			const [expensesResponse, groupsResponse, allUsersResponse] = await Promise.all([
				supabase.from('expenses').select(`
				expense_id, 
				group_id,
				paid_by,
				status,
				total_amount,
				created_by,
				expense_type,
				expense_participants(participant_id, expense_id, status, created_at, amount, pending_from, paid_by)`),

				supabase.from('groups').select(`
				group_id, 
				group_name, 
				created_at, 
				group_description, 
				created_by, 
				group_type, 
				expenses(
					total_amount, 
					description, 
					expense_type, 
					status, 
					created_at, 
					created_by, 
					expense_id, 
					paid_by, 
					expense_participants(participant_id, pending_from, paid_by, expense_id, status, users(username))), 
				group_members(user_id, role), 
				users(username, email, gender)`),

				supabase.from('users').select(),
			]);

			if (expensesResponse.error) {
				console.log(expensesResponse.error);
			}

			if (groupsResponse.error) {
				console.log(groupsResponse.error);
			}
			if (allUsersResponse.error) {
				console.log(allUsersResponse.error);
			}

			const allExpenses = expensesResponse.data;
			const groups = groupsResponse.data;
			const allUsers = allUsersResponse.data;

			if (allExpenses) {
				let amountOwed = 0;
				let amountOwe = 0;

				let friends = [];
				allExpenses?.forEach((expense) => {
					expense.expense_participants.forEach((participant) => {
						if (participant.status === 'unsettled') {
							if (
								participant.paid_by === userDetails?.user_id &&
								participant.pending_from !== userDetails.user_id
							) {
								friends.push(participant);
								amountOwed += participant.amount;
							} else if (
								participant.paid_by !== userDetails?.user_id &&
								participant.pending_from === userDetails?.user_id
							) {
								amountOwe += participant.amount;
							}
						}
					});
				});

				for (const f of friends) {
					const { data: userData } = await supabase
						.from('users')
						.select()
						.eq('user_id', f.pending_from)
						.single();

					f.username = userData.username;
				}
				setAmountOwed(amountOwed);
				setAmountOwe(amountOwe);
			}

			// filter user group only
			const filteredGroups = groups.filter((group) =>
				group.group_members.some((member) => member.user_id === userDetails?.user_id)
			);

			// give creator name for each expenses
			filteredGroups.forEach((group) => {
				group.expenses.forEach((expense) => {
					expense.creator_name = allUsers.find(
						(user) => user.user_id === expense.created_by
					).username;
					expense.participant_count = allExpenses.find(
						(ex) => ex.expense_id == expense.expense_id
					).expense_participants.length;
				});
			});

			filteredGroups.forEach((group) => {
				group.expenses = group.expenses.filter((expense) =>
					expense.expense_participants.some(
						(participant) => participant.pending_from === userDetails.user_id
					)
				);
			});

			if (filteredGroups) {
				setGroups(filteredGroups);
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<BaseLayout>
			<Box safeAreaTop={true}>
				<Box>
					<Text fontSize="2xl" fontWeight="bold">
						Overall
					</Text>
					<Text fontSize="2xl" fontWeight="bold">
						You are owed $ {amountOwed?.toFixed(2)}
					</Text>
					<Text fontSize="2xl" fontWeight="bold">
						You owe $ {amountOwe?.toFixed(2)}
					</Text>
				</Box>

				<Flex
					mt={6}
					direction="row"
					justifyContent="space-between"
					alignItems="center"
					w="full"
				>
					<Text fontSize="2xl" fontWeight="bold">
						My groups
					</Text>
					<Pressable
						onPress={() => navigation.navigate('CreateGroup', { title: 'Test' })}
					>
						<Icon size={30} name="plus-circle" type="feather" />
					</Pressable>
				</Flex>

				<ScrollView horizontal={true} showsHorizontalScrollIndicator={false} mt={4}>
					<Stack direction="row" space={2}>
						{groups?.map((group) => (
							<Pressable
								p={2}
								key={group.group_id}
								bg="white"
								rounded="xl"
								shadow={1}
								_pressed={{
									bg: 'light.200',
								}}
								onPress={() =>
									navigation.navigate('ViewGroup', {
										title: group.group_name,
										data: group,
										creator: group.users?.username,
									})
								}
							>
								<Box>
									<Center
										w={'32'}
										h={'32'}
										_text={{
											fontSize: 'lg',
											fontWeight: 'bold',
											textAlign: 'center',
										}}
									>
										{group.group_name}
										<Text>
											{group.expenses.length}{' '}
											{group.expenses.length > 1 ? 'bills' : 'bill'}
										</Text>
										<Text>
											{group.group_members.length}{' '}
											{group.group_members.length > 1 ? 'members' : 'member'}
										</Text>
									</Center>
								</Box>
							</Pressable>
						))}
					</Stack>
				</ScrollView>

				<Flex
					mt={6}
					direction="row"
					justifyContent="space-between"
					alignItems="center"
					w="full"
				>
					<Text fontSize="2xl" fontWeight="bold">
						Settled up groups
					</Text>
					<Pressable onPress={() => setIsHidden(!isHidden)}>
						<Text fontSize="md" fontWeight="bold">
							{isHidden ? 'Show' : 'Hide'}
						</Text>
					</Pressable>
				</Flex>

				<ScrollView
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					mt={4}
					display={isHidden ? 'none' : ''}
				>
					<Stack direction="row" space={2}>
						{groups
							?.filter((g) => g.expenses.length == 0)
							.map((group) => (
								<PresenceTransition
									key={group.group_id}
									visible={!isHidden}
									initial={{
										opacity: 0,
									}}
									animate={{
										opacity: 1,
										transition: {
											duration: 250,
										},
									}}
								>
									<Pressable
										p={2}
										bg="white"
										rounded="xl"
										shadow={1}
										_pressed={{
											bg: 'light.200',
										}}
									>
										<Box>
											<Center
												w={'32'}
												h={'32'}
												_text={{
													fontSize: 'lg',
													fontWeight: 'bold',
													textAlign: 'center',
												}}
											>
												{group.group_name}
												<Text>
													{group.expenses.length}{' '}
													{group.expenses.length > 1 ? 'bills' : 'bill'}
												</Text>
												<Text>
													{group.group_members.length}{' '}
													{group.group_members.length > 1
														? 'members'
														: 'member'}
												</Text>
											</Center>
										</Box>
									</Pressable>
								</PresenceTransition>
							))}
					</Stack>
				</ScrollView>
			</Box>
		</BaseLayout>
	);
};

export default Group;
