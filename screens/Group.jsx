import React, { useEffect, useState } from 'react';
import BaseLayout from '../components/BaseLayout';
import { Box, Center, Flex, Pressable, ScrollView, Text, Stack } from 'native-base';
import { Icon } from '@rneui/base';
import { supabase } from '../lib/supabase';
import { useIsFocused } from '@react-navigation/native';
import { getData } from '../lib/methods';
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
			const [expensesResponse, groupResponse, groupsResponse] = await Promise.all([
				supabase.from('expenses').select(`
				expense_id, 
				group_id,
				paid_by,
				status,
				total_amount,
				created_by,
				expense_type,
				expense_participants(participant_id, expense_id, status, created_at, amount, pending_from, paid_by)
			  `),

				supabase
					.from('group_members')
					.select('group_id')
					.eq('user_id', userDetails.user_id),

				supabase.from('groups').select(`
				group_id, 
				group_name, 
				created_at, 
				group_description, 
				created_by, 
				group_type, 
				expenses(total_amount, description, expense_type, status, created_at, created_by, expense_id, paid_by), 
				group_members(user_id, role), 
				users(username, email, gender)`),
			]);

			if (expensesResponse.error) {
				console.log(expensesResponse.error);
			}

			if (groupResponse.error) {
				console.log(groupResponse.error);
			}
			if (groupsResponse.error) {
				console.log(groupsResponse.error);
			}

			const allExpenses = expensesResponse.data;
			const myGroup = groupsResponse.data;
			const groups = groupsResponse.data;

			if (allExpenses && myGroup) {
				const filteredExpenses = allExpenses.filter((expense) =>
					myGroup.some((group) => group.group_id === expense.group_id)
				);
				let amountOwed = 0;
				let amountOwe = 0;

				let friends = [];
				filteredExpenses?.forEach((expense) => {
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

			const filteredGroups = groups.filter((group) =>
				group.group_members.some((member) => member.user_id === userDetails?.user_id)
			);

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
								<Pressable
									key={group.group_id}
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
							))}
					</Stack>
				</ScrollView>
			</Box>
		</BaseLayout>
	);
};

export default Group;
