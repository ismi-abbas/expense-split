import React from 'react';
import { Text, View, Heading, Box, Flex, HStack, Center } from 'native-base';
import BaseLayout from '../components/BaseLayout';
import { userDetails } from '../DummyData';

const Home = () => {
	return (
		<BaseLayout bgColor="purple.200">
			<View
				mt={10}
				w="400px"
				_android={{
					w: '350px',
				}}>
				<Box>
					<Heading>Hello {userDetails.name}</Heading>
				</Box>

				<Flex direction="row" mt={10} w="full" maxW="full" justifyContent="space-between">
					<Box
						alignItems="center"
						_android={{
							w: '170px',
						}}
						justifyContent="center"
						w="190"
						h="140px"
						bg="light.50:alpha.70"
						rounded="xl">
						<Text fontWeight="bold" fontSize="xl">
							You Owe
						</Text>
						<Text fontWeight="extrabold" fontSize="3xl">
							$56
						</Text>
					</Box>
					<Box
						_android={{
							w: '170px',
						}}
						alignItems="center"
						justifyContent="center"
						w="190px"
						h="140px"
						bg="light.50:alpha.70"
						rounded="xl">
						<Text fontWeight="bold" fontSize="xl">
							You're owed
						</Text>
						<Text fontWeight="extrabold" fontSize="3xl">
							$98
						</Text>
					</Box>
				</Flex>

				<Box h="500px" w="full" rounded="xl" bg="light.50" mt={4} p={4}>
					<Text fontSize="2xl" fontWeight="bold">
						Friends
					</Text>
				</Box>
			</View>
		</BaseLayout>
	);
};

export default Home;
