import React from 'react';
import { Box, Text, Heading, VStack } from 'native-base';

const MonthlyDetails = ({ record }) => {
	const currentDate = new Date();
	const year = currentDate.getFullYear();

	console.log(JSON.stringify(record));

	return (
		<Box mt={4} bg="light.50" opacity={90} paddingX={4} paddingY={2} rounded="xl" h="40">
			<Heading size="sm">
				{record.month} {year}
			</Heading>

			<VStack h={'full'}>
				{record.records.map((rec, idx) => (
					<Text size="md" key={idx}>
						{rec.type === 'expense' ? rec.expenseTitle : 'You paid'}
					</Text>
				))}
			</VStack>
		</Box>
	);
};

export default MonthlyDetails;
