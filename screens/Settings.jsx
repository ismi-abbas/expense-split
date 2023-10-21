import React from 'react';
import { Text, View, Button } from 'native-base';
import { styles } from '../styles';
import { useLogin } from '../context/LoginProvider';

const Settings = () => {
	const { setIsLoggedIn } = useLogin();
	return (
		<View style={styles.container}>
			<Text>Settings Screen</Text>
			<Button rounded="full" shadow={4} w={24} colorScheme="purple" onPress={() => setIsLoggedIn(false)}>
				Logout
			</Button>
		</View>
	);
};

export default Settings;
