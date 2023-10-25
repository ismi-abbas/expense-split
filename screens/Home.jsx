import React, { useEffect, useState } from 'react';
import BaseLayout from '../components/BaseLayout';
import { Text, Heading, Box, Flex, VStack, Button, Spacer } from 'native-base';
import { userDetails } from '../DummyData';
import { Icon } from '@rneui/base';
import { supabase } from '../lib/supabase';
import { useLogin } from '../context/LoginProvider';

const Home = () => {
	const { session } = useLogin();
	const [amountOwe, setAmountOwe] = useState();
	const [amountOwed, setAmountOwed] = useState();
	const [friendOwe, setFriendOwe] = useState([]);
	const [friendListOwe, setFriendListOwe] = useState();

	const getUserExpense = async () => {
		try {
			let { data: userExpense } = await supabase.from('expense_participants').select();

			let friendList = [];

			if (userExpense) {
				for (let expense of userExpense) {
					if (expense.user_id !== 'e291c9c9-33c4-4c52-be8b-b2ca5d0ce58b') {
						friendList.push(expense);
						setFriendListOwe(expense);
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
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getUserExpense();
	}, [amountOwe]);

	return (
		<BaseLayout bgColor="purple.200">
			<Box safeAreaTop={true}>
				<Box>
					<Heading>Hello {userDetails.name}</Heading>
				</Box>

				<Box mb={2}>
					<Button
						variant="subtle"
						size="lg"
						rounded="full"
						colorScheme="purple"
						onPress={() => getUserExpense()}
					>
						Refresh expense
					</Button>
				</Box>

				<Flex direction="row" mt={10} w="full" justifyContent="space-between">
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
					h="500px"
					w="full"
					rounded="xl"
					bg="light.50"
					mt={4}
					p={4}
					justifyContent="space-between"
				>
					<Text fontSize="2xl" fontWeight="bold">
						Friends
					</Text>

					<VStack
						space={2}
						justifyContent="flex-start"
						h="380px"
						py={2}
						overflow="hidden"
					>
						{friendListOwe.map((friend) => (
							<Flex
								direction="row"
								key={friend.id}
								p={4}
								alignItems="center"
								justifyContent="start"
								rounded="lg"
								w="full"
							>
								<Icon size={50} name="face-man" type="material-community" />
								<Flex ml={2} justifyContent="start" w="100px">
									<Text fontSize="xl" fontWeight="medium">
										{friend.name}
									</Text>
								</Flex>
								<Flex ml={2} justifyContent="start" w="auto">
									<Text fontSize="xl" fontWeight="medium">
										Owes you 30$
									</Text>
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
