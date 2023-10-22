import React from 'react';
import { Text, View, Heading, Box, Flex, VStack, Button, Spacer } from 'native-base';
import BaseLayout from '../components/BaseLayout';
import { userDetails } from '../DummyData';
import { Icon } from '@rneui/base';

const Home = () => {
	return (
		<BaseLayout bgColor="purple.200">
			<Box safeAreaTop={true}>
				<Box>
					<Heading>Hello {userDetails.name}</Heading>
				</Box>

				<Flex direction="row" mt={10}>
					<Box
						alignItems="center"
						justifyContent="center"
						w="190"
						h="140px"
						bg="light.50:alpha.70"
						rounded="xl"
					>
						<Text fontWeight="bold" fontSize="xl">
							You Owe
						</Text>
						<Text fontWeight="extrabold" fontSize="3xl">
							$56
						</Text>
					</Box>
					<Spacer />
					<Box
						_android={{
							w: '170px',
						}}
						alignItems="center"
						justifyContent="center"
						w="190px"
						h="140px"
						bg="light.50:alpha.70"
						rounded="xl"
					>
						<Text fontWeight="bold" fontSize="xl">
							You're owed
						</Text>
						<Text fontWeight="extrabold" fontSize="3xl">
							$98
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
						{userDetails.friends.slice(0, 4).map((friend) => (
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
