import React, { useEffect, useState } from 'react';
import BaseLayout from '../components/BaseLayout';
import { Text, Heading, Box, Flex, VStack, Button, Spacer, CircularProgress } from 'native-base';
import { userDetails } from '../DummyData';
import { Icon } from '@rneui/base';
import { supabase } from '../lib/supabase';
import { useLogin } from '../context/LoginProvider';
import { getData } from '../lib/methods';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
	const { session } = useLogin();
	const [amountOwe, setAmountOwe] = useState();
	const [amountOwed, setAmountOwed] = useState();
	const [friendOwe, setFriendOwe] = useState([]);
	const [friendListOwe, setFriendListOwe] = useState();
	const [allUser, setAllUser] = useState([]);
	const [currentUser, setCurrentUser] = useState();

	const getAllUser = async () => {
		let { data, error } = await supabase.from('users').select();

		if (data) {
			setAllUser(data);
		}

		const userData = await getData('userDetails');
		let curr = data.filter((d) => d.user_id === userData.user_id);
		console.log(curr[0]);
		setCurrentUser(curr[0]);

		if (error) {
			throw error;
		}
	};

	const getUserExpense = async () => {
		try {
			let { data: userExpense } = await supabase.from('expense_participants').select();
			let friendList = [];
			if (userExpense) {
				for (let expense of userExpense) {
					if (expense.user_id !== 'e291c9c9-33c4-4c52-be8b-b2ca5d0ce58b') {
						friendList.push(expense);
					}
				}
				const totalAmount = userExpense
					.filter(
						(exp) =>
							exp.user_id !== 'e291c9c9-33c4-4c52-be8b-b2ca5d0ce58b' &&
							exp.status.toLowerCase() === 'unsettled'
					)
					.reduce((total, exp) => total + exp.amount, 0);
				setAmountOwe(totalAmount);
			}
			friendList.map((friendList) => {
				friendList.user_name = allUser.find(
					(friend) => friend.user_id === friendList.user_id
				)?.username;
			});
			setFriendListOwe(friendList);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (getUserExpense()) getAllUser();
	}, []);

	return (
		<BaseLayout bgColor="purple.200">
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
							$ {amountOwe ? amountOwe : '0'}
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
							${amountOwed ? amountOwed : '0'}
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
						{friendListOwe?.map((friend) => (
							<Flex
								direction="row"
								key={friend.user_id}
								p={2}
								alignItems="center"
								justifyContent="space-evenly"
								rounded="lg"
								w="full"
								borderWidth={1}
							>
								<Icon size={50} name="face-man" type="material-community" />
								<Flex
									direction="row"
									alignItems="center"
									justifyContent="space-between"
								>
									<Flex ml={2} justifyContent="start" w="100px">
										<Text fontSize="lg" fontWeight="medium">
											{friend.user_name}
										</Text>
									</Flex>
									<Flex ml={2} justifyContent="start" w="auto">
										<Text fontSize="lg" fontWeight="medium">
											Owes you ${friend.amount}
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
