import React, { useEffect, useState } from 'react';
import BaseLayout from '../components/BaseLayout';
import { Text, Heading, Box, Flex, VStack, Button, Spacer } from 'native-base';
import { Icon } from '@rneui/base';
import { supabase } from '../lib/supabase';
import { useLogin } from '../context/LoginProvider';

const Home = () => {
	const { userDetails } = useLogin();
	const [amountOwe, setAmountOwe] = useState();
	const [amountOwed, setAmountOwed] = useState();
	const [friendList, setFriendList] = useState();
	const [currentUser, setCurrentUser] = useState();

	useEffect(() => {
		const fetchData = async () => {
			await getUserExpense();
		};

		if (userDetails) {
			setCurrentUser(userDetails);
			fetchData();
		}
	}, [userDetails]);

	const getUserExpense = async () => {
		try {
			let { data: allExpenses, error } = await supabase.from('expenses').select(
				`
				expense_id,
				group_id,
				paid_by,
				status,
				total_amount,
				created_by,
				expense_type,
				expense_participants(participant_id, expense_id, status, created_at, amount, pending_from)
				`
			);

			let { data: myGroup, error: groupErr } = await supabase
				.from('group_members')
				.select('group_id')
				.eq('user_id', currentUser?.user_id);

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
							if (participant.pending_from !== currentUser?.user_id) {
								friends.push(participant);
								amountOwed += participant.amount;
							} else {
								amountOwe += participant.amount;
							}
						}
					});
				});

				for (const f of friends) {
					const { data: userData, error } = await supabase
						.from('users')
						.select()
						.eq('user_id', f.pending_from)
						.single();

					f.username = userData.username;
				}
				console.log(friends);
				setFriendList(friends);
				setAmountOwed(amountOwed);
				setAmountOwe(amountOwe);
			}

			if (error) {
				console.log(error);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<BaseLayout>
			<Box safeAreaTop={true}>
				<Box>
					<Heading>Hello {currentUser?.username}</Heading>
				</Box>

				<Flex direction="row" mt={4} w="full" justifyContent="space-between">
					<Box
						alignItems="center"
						justifyContent="center"
						w="170px"
						h="140px"
						bg="light.50:alpha.70"
						rounded="xl"
					>
						<Text fontWeight="bold" fontSize="xl">
							You Owe
						</Text>
						<Text fontWeight="extrabold" fontSize="3xl">
							$ {amountOwe ? amountOwe.toFixed(2) : 0}
						</Text>
					</Box>
					<Spacer />
					<Box
						_android={{
							w: '170px',
						}}
						alignItems="center"
						justifyContent="center"
						w="170px"
						h="140px"
						bg="light.50:alpha.70"
						rounded="xl"
					>
						<Text fontWeight="bold" fontSize="xl">
							You're owed
						</Text>
						<Text fontWeight="extrabold" fontSize="3xl">
							${amountOwed ? amountOwed.toFixed(2) : 0}
						</Text>
					</Box>
				</Flex>

				<Flex
					direction="column"
					h="550px"
					w="full"
					rounded="xl"
					bg="light.50"
					mt={4}
					p={4}
					justifyContent="start"
				>
					<Text fontSize="2xl" fontWeight="bold">
						Friends
					</Text>

					<VStack
						space={2}
						justifyContent="flex-start"
						h="430px"
						py={2}
						overflow="hidden"
					>
						{friendList?.map((friend) => (
							<Flex
								direction="row"
								key={friend.pending_from}
								p={2}
								alignItems="center"
								justifyContent="space-evenly"
								rounded="lg"
								w="full"
								borderBottomWidth={1}
								borderBottomColor="gray.200"
							>
								<Icon size={30} name="face-man" type="material-community" />
								<Flex
									direction="row"
									alignItems="center"
									justifyContent="space-between"
								>
									<Flex ml={2} justifyContent="start" w="100px">
										<Text fontSize="lg" fontWeight="medium">
											{friend.username}
										</Text>
									</Flex>
									<Flex ml={2} justifyContent="start" w="auto">
										<Text fontSize="lg" fontWeight="medium">
											Owes you RM{friend.amount.toFixed(2)}
										</Text>
									</Flex>
								</Flex>
							</Flex>
						))}
					</VStack>

					<Box mb={2}>
						<Button
							variant="subtle"
							size="lg"
							rounded="full"
							colorScheme="purple"
							onPress={() => console.log('Add Friend')}
						>
							Add Friend
						</Button>
					</Box>
				</Flex>
			</Box>
		</BaseLayout>
	);
};

export default Home;
