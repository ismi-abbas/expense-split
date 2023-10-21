import React from 'react';
import { Box, Stack, Flex, HStack, VStack, Center, Heading, Text, ScrollView, View, FlatList } from 'native-base';
import { Icon } from '@rneui/themed';
import MonthlyDetails from '../components/MonthlyDetails';
import BaseLayout from '../components/BaseLayout';
import { monthlyBills, users, groupExpenseDetails } from '../DummyData';

const Group = ({ expenseTitle, createdBy, createdDate, expenseDetails }) => {
	expenseTitle = 'Penang Trip';
	expenseDetails = 'Graduation trip yoohoooooo ';
	createdBy = 'Amelia';
	createdDate = Date.now();

	return (
		<BaseLayout bgColor="purple.200">
			<View>
				<Box
					_text={{
						fontSize: '2xl',
						fontWeight: 'medium',
						color: 'warmGray.800',
						letterSpacing: 'md',
						fontFamily: 'heading',
					}}>
					<Heading>{expenseTitle}</Heading>
				</Box>

				{/* Group Info */}
				<Text>{expenseDetails}</Text>
				<Text>Group created on {createdDate}</Text>
				<Text>Group created by {createdBy}</Text>
				<Box marginY={2}>
					<Stack direction="row" alignItems="center" justifyContent="space-between">
						<Stack direction="row" alignSelf="center">
							{users.map(u => {
								const iconName = u.sex === 'male' ? 'face-man' : 'face-woman';
								return <Icon key={u.id} size={40} name={iconName} type="material-community" />;
							})}
						</Stack>
						<Icon size={40} name="user-plus" type="feather" />
					</Stack>
				</Box>

				<HStack w="full" justifyContent="space-between" space={2} my={2}>
					<VStack space={2} justifyContent="center" w="3/4">
						{groupExpenseDetails.map((detail, index) => (
							<HStack
								key={index}
								space={2}
								alignItems="center"
								bg="white"
								padding="2"
								rounded="md"
								shadow={2}
								_text={{
									fontSize: 'md',
									fontFamily: 'body',
								}}>
								<Flex w={'3/4'}>
									<Text>
										{detail.user} owes {detail.from}
									</Text>
								</Flex>
								<Flex flexDirection="row" alignSelf="end">
									<Text color="blue.400" fontWeight="bold">
										{detail.amount}$
									</Text>
								</Flex>
							</HStack>
						))}
					</VStack>
					<VStack space={2} justifyContent="center">
						{groupExpenseDetails.map((detail, index) => (
							<HStack
								key={index}
								space={2}
								alignItems="center"
								bg="white"
								width="auto"
								padding="2"
								rounded="md"
								shadow={2}
								_text={{
									fontSize: 'md',
									fontFamily: 'body',
								}}>
								<Text>{detail.option}</Text>
							</HStack>
						))}
					</VStack>
				</HStack>
				<FlatList
					showsVerticalScrollIndicator={false}
					data={monthlyBills}
					renderItem={({ item }) => <MonthlyDetails bill={item} />}
				/>
				{/* <ScrollView>
					<MonthlyDetails bills={monthlyBills} />
				</ScrollView> */}
			</View>
		</BaseLayout>
	);
};

export default Group;
