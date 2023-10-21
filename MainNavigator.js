import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useLogin } from './context/LoginProvider';
import TabNavigator from './TabNavigator';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import RecordModal from './components/RecordModal';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Login" component={Login} />
			<Stack.Screen name="SignUp" component={SignUp} />
		</Stack.Navigator>
	);
};

const ModalStackNavigator = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="TabRoot" component={TabNavigator} options={{ headerShown: false, tabBarVisible: false }} />
			<Stack.Screen name="Modal" component={RecordModal} options={{ headerShown: false }} />
		</Stack.Navigator>
	);
};

const MainNavigator = () => {
	const { isLoggedIn, setIsLoggedIn } = useLogin();
	return isLoggedIn ? <ModalStackNavigator /> : <StackNavigator />;
};

export default MainNavigator;
