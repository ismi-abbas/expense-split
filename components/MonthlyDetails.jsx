import React from 'react';
import { Box, Text, Heading, VStack, Stack, Flex, View, ScrollView, Pressable } from 'native-base';

const MonthlyDetails = ({ bills }) => {
	const currentDate = new Date();
	const year = currentDate.getFullYear();

	console.log(JSON.stringify(bills));

	function handleBill(index) {
		const data = bills.find((b, i) => i === index || b.id === index);
		console.log(data);
	}

	return (
		<View mb={10}>
			{bills.map((b, i) => (
				<Pressable key={i} onPress={() => handleBill(i)}>
					<View>
						<Box mt={4} bg="light.50" opacity={90} paddingX={4} paddingY={2} rounded="xl">
							<Heading size="sm">
								{b.month} {year}
							</Heading>

							<Flex size="md" h={'auto'}>
								{b.records.map((rec, idx) => (
									<Box h={8} key={idx} mt={2}>
										<Text size="md">{rec.type === 'expense' ? rec.expenseTitle : 'You paid'}</Text>
									</Box>
								))}
							</Flex>
						</Box>
					</View>
				</Pressable>
			))}
		</View>
	);
};

export default MonthlyDetails;
