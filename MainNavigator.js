import React, { lazy, Suspense } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useLogin } from './context/LoginProvider';
import TabNavigator from './TabNavigator';

import Login from './screens/Login';
import SignUp from './screens/SignUp';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Login" component={Login} />
			<Stack.Screen name="SignUp" component={SignUp} />
		</Stack.Navigator>
	);
};
const MainNavigator = () => {
	const { isLoggedIn, setIsLoggedIn } = useLogin();
	return isLoggedIn ? <TabNavigator /> : <StackNavigator />;
};

export default MainNavigator;
