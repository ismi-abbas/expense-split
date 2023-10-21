import React, { useState } from 'react';
import { Box, Text, Heading, VStack, Flex, Pressable, View } from 'native-base';
import { useModal } from '../context/ModalProvider';
import RecordModal from './RecordModal';
import { useNavigation } from '@react-navigation/native';

const MonthlyDetails = ({ bills }) => {
	const navigation = useNavigation();
	const [showModal, setShowModal] = useState(false);
	const [editRecord, setEditRecord] = useState();

	const currentDate = new Date();
	const year = currentDate.getFullYear();

	const openRecordModal = record => {
		navigation.navigate('Modal', { record: record });
	};

	return (
		<VStack space={2} mb={10} mt={4}>
			{bills.map((b, i) => (
				<View key={i}>
					<View
						w="full"
						maxW="400px"
						_pressed={{
							bg: 'light.200',
						}}
						bg="light.100"
						paddingX={4}
						paddingY={2}
						rounded="xl">
						<Box maxW="full" p={2}>
							<Box>
								<Heading size="sm">
									{b.month} {year}
								</Heading>
							</Box>

							<VStack space={2} mt={2}>
								{b.records.map((record, index) => {
									return (
										<Pressable
											key={index}
											onPress={() => openRecordModal(record)}
											bg="light.200"
											rounded="lg"
											p={2}
											_pressed={{
												bg: 'light.100',
											}}>
											<Flex direction="row" w="full" h="auto" alignItems="center">
												<Flex
													bg="light.100"
													h={8}
													w={8}
													alignItems="center"
													justifyContent="center"
													rounded="lg"
													mr={4}>
													<Text fontWeight="bold">{index}</Text>
												</Flex>
												<Flex>
													<Text fontSize={'md'}>{record.type === 'expense' ? record.expenseTitle : 'You paid'}</Text>
												</Flex>
											</Flex>
										</Pressable>
									);
								})}
							</VStack>
						</Box>
					</View>
				</View>
			))}
		</VStack>
	);
};

export default MonthlyDetails;
