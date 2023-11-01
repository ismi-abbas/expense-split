import React, { useCallback, useEffect, useState } from 'react';
import BaseLayout from '../components/BaseLayout';
import { Box, Center, Flex, Pressable, ScrollView, Text, Stack } from 'native-base';
import { Icon } from '@rneui/base';
import { supabase } from '../lib/supabase';
import { useFocusEffect } from '@react-navigation/native';
import { getData } from '../lib/methods';
import { useLogin } from '../context/LoginProvider';

const Group = ({ navigation }) => {
	const { userDetails } = useLogin();
	const [groups, setGroups] = useState([]);
	const [amountOwe, setAmountOwe] = useState(0);
	const [amountOwed, setAmountOwed] = useState(0);
	const [currentUser, setCurrentUser] = useState(null);
	const [isHidden, setIsHidden] = useState(false);

	useEffect(() => {
		setCurrentUser(userDetails);
		fetchData();
	}, [userDetails]);

	const fetchData = async () => {
		await getAmountOwe();
		await getGroupsInfo();
		await getUserExpense();
	};

	const getUserExpense = async () => {
		const { data: userExpense, error } = await supabase
			.from('expense_participants')
			.select(
				`participant_id, expense_id, status, created_at, amount, pending_from, users(username)`
			);

		if (error) {
			console.log(error);
			return;
		}

		if (userExpense) {
			const amountOwed = userExpense.reduce((acc, item) => {
				if (item.pending_from !== currentUser?.user_id && item.status === 'unsettled') {
					return acc + item.amount;
				} else {
					return acc;
				}
			}, 0);

			const amountOwe = userExpense.reduce((acc, item) => {
				if (item.pending_from === currentUser?.user_id && item.status === 'unsettled') {
					return acc + item.amount;
				} else {
					return acc;
				}
			}, 0);

			setAmountOwed(amountOwed);
			setAmountOwe(amountOwe);
		}
	};

	const getGroupsInfo = async () => {
		try {
			const { data, error } = await supabase
				.from('groups')
				.select(
					`group_id, group_name, created_at, group_description, created_by, group_type, expenses(total_amount, description, expense_type, status, created_at, created_by), group_members(user_id, role), users(username, email, gender)`
				);

			if (error) {
				console.log(error);
				return;
			}

			const filteredGroups = data.filter((group) =>
				group.group_members.some((member) => member.user_id === currentUser?.user_id)
			);

			if (filteredGroups) {
				setGroups(filteredGroups);
			}
		} catch (error) {
			console.log(error);
		}
	};

	async function getAmountOwe() {
		const amountOwe = await getData('totalAmountOwe');
		const amountOwed = await getData('totalAmountOwed');
		setAmountOwe(amountOwe);
		setAmountOwed(amountOwed);
	}

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
						{groups?.map((group, index) => (
							<Pressable
								key={index}
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
							.map((group, index) => (
								<Pressable
									key={index}
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
