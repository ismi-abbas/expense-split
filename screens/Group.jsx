import { View, Text } from 'react-native';
import React from 'react';
import BaseLayout from '../components/BaseLayout';
import { Box, Button, Heading } from 'native-base';

const Group = ({ navigation }) => {
	return (
		<BaseLayout>
			<Box safeAreaTop={true}>
				<Heading>Group</Heading>

				<Button onPress={() => navigation.navigate('ViewGroup')}>View Group</Button>
			</Box>
		</BaseLayout>
	);
};

export default Group;
