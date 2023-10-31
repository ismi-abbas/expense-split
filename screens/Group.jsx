import React, { useCallback, useEffect, useState } from 'react';
import BaseLayout from '../components/BaseLayout';
import { Box, Center, Flex, Pressable, ScrollView, Text, Stack } from 'native-base';
import { Icon } from '@rneui/base';
import { supabase } from '../lib/supabase';
import { useFocusEffect } from '@react-navigation/native';
import { getData } from '../lib/methods';
import { useLogin } from '../context/LoginProvider';

const Group = ({ navigation }) => {
	const { session, isLoggedIn, userDetails } = useLogin();
	const [groups, setGroups] = useState([]);
	const [amountOwe, setAmountOwe] = useState();
	const [amountOwed, setAmountOwed] = useState();
	const [currentUser, setCurrentUser] = useState();
	const [isHidden, setIsHidden] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setCurrentUser(userDetails);
			await getAmountOwe();
			await getGroupsInfo();
			await getUserExpense();
			await getUserExpense();
		};
		fetchData();
	}, [userDetails]);

	useFocusEffect(
		useCallback(() => {
			getGroupsInfo().then((_) => console.log(_));
		}, [])
	);

	const getUserExpense = async () => {
		try {
			let { data: userExpense, error } = await supabase.from('expense_participants').select(`
				participant_id,
				expense_id,
				status,
				created_at,
				amount,
				pending_from,
				users(username)
			`);

			if (error) {
				console.log(error);
			}
			if (userExpense) {
				const amountOwed = userExpense.reduce((acc, item) => {
					if (item.pending_from !== currentUser.user_id && item.status === 'unsettled') {
						return acc + item.amount;
					} else {
						return acc;
					}
				}, 0);

				const amountOwe = userExpense.reduce((acc, item) => {
					if (item.pending_from == currentUser.user_id && item.status === 'unsettled') {
						return acc + item.amount;
					} else {
						return acc;
					}
				}, 0);

				const friendListExpense = userExpense.filter(
					(item) =>
						item.pending_from !== currentUser.user_id && item.status === 'unsettled'
				);
				setAmountOwed(amountOwed);
				setAmountOwe(amountOwe);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const getGroupsInfo = async () => {
		const { data, error } = await supabase.from('groups').select(`
			group_id,
			group_name,
			created_at,
			group_description,
			created_by,
			group_type,
			expenses(total_amount, description, expense_type, status, created_at, created_by),
			group_members(user_id, role),
			users(username, email, gender)
		`);

		const filteredGroups = data.filter((group) =>
			group.group_members.some((member) => member.user_id === currentUser.user_id)
		);

		setGroups(filteredGroups);

		if (error) {
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
						You are owed $ {amountOwed ? amountOwed.toFixed(2) : 0}
					</Text>
					<Text fontSize="2xl" fontWeight="bold">
						You owe $ {amountOwe ? amountOwe.toFixed(2) : 0}
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
