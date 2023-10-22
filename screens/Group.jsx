import React from 'react';
import BaseLayout from '../components/BaseLayout';
import { Box, Center, Flex, Pressable, ScrollView, Text, Stack } from 'native-base';
import { Icon } from '@rneui/base';
import { groups } from '../DummyData';
const Group = ({ navigation }) => {
	return (
		<BaseLayout bgColor="purple.200">
			<Box safeAreaTop={true}>
				<Box>
					<Text fontSize="2xl" fontWeight="bold">
						Overall
					</Text>
					<Text fontSize="2xl" fontWeight="bold">
						You are owed $22.80
					</Text>
					<Text fontSize="2xl" fontWeight="bold">
						You owe $1.80
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
						{groups.map((group, i) => (
							<Pressable
								key={group.id}
								bg="white"
								rounded="xl"
								shadow={1}
								_pressed={{
									bg: 'light.200',
								}}
								onPress={() =>
									navigation.navigate('ViewGroup', { title: group.name })
								}
							>
								<Box>
									<Center
										w={'32'}
										h={'32'}
										_text={{
											fontSize: 'lg',
											fontWeight: 'bold',
										}}
									>
										{group.name}
										<Text>{group.totalBill} bills</Text>
										<Text>
											{group.totalMember}{' '}
											{group.totalMember > 1 ? 'members' : 'member'}
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
					<Pressable onPress={() => alert('hidden')}>
						<Text fontSize="md" fontWeight="bold">
							Hide
						</Text>
					</Pressable>
				</Flex>

				<ScrollView horizontal={true} showsHorizontalScrollIndicator={false} mt={4}>
					<Stack direction="row" space={2}>
						{groups.map((group, i) => (
							<Pressable
								key={group.id}
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
										}}
									>
										{group.name}
										<Text>{group.totalBill} bills</Text>
										<Text>
											{group.totalMember}{' '}
											{group.totalMember > 1 ? 'members' : 'member'}
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
