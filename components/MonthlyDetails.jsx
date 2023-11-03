import React, { useState } from 'react';
import { Box, Text, Heading, VStack, Flex, Pressable, View, FlatList } from 'native-base';
import { useNavigation } from '@react-navigation/native';

const MonthlyDetails = ({ bill, expensesParticipants }) => {
	const navigation = useNavigation();

	const openRecordModal = (record) => {
		navigation.navigate('Modal', { record: record });
	};

	return (
		<View
			my={2}
			w="full"
			maxW="400px"
			_pressed={{
				bg: 'light.200',
			}}
			bg="light.100"
			paddingX={4}
			paddingY={2}
			rounded="xl"
		>
			<Box maxW="full" p={2}>
				<Box>
					<Heading size="sm">{bill.month}</Heading>
				</Box>

				<VStack space={2} mt={2}>
					{bill.expenses.map((record, index) => {
						return (
							<Pressable
								key={index}
								onPress={() => openRecordModal(record)}
								bg="light.200"
								rounded="lg"
								p={2}
								_pressed={{
									bg: 'light.100',
								}}
							>
								<Flex direction="row" w="full" h="auto" alignItems="center">
									<Flex
										bg="light.100"
										h={8}
										w={8}
										alignItems="center"
										justifyContent="center"
										rounded="lg"
										mr={4}
									>
										<Text fontWeight="bold">{index + 1}</Text>
									</Flex>
									<Flex>
										<Text fontSize={'md'}>{record.description}</Text>
									</Flex>
								</Flex>
							</Pressable>
						);
					})}
				</VStack>
			</Box>
		</View>
	);
};

export default MonthlyDetails;
