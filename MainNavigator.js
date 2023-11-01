import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useLogin } from './context/LoginProvider';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/themed';

// Screens
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import RecordModal from './components/RecordModal';
import Home from './screens/Home';
import AddBill from './screens/AddBill';
import Activities from './screens/Activities';
import Profile from './screens/Profile';
import ViewGroup from './screens/ViewGroup';
import Group from './screens/Group';
import CreateGroup from './screens/CreateGroup';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
	return (
		<Tab.Navigator>
			<Tab.Screen
				name="Home"
				component={Home}
				options={{
					title: 'Home',
					headerShown: false,
					tabBarActiveTintColor: 'purple',
					tabBarIcon: ({ color, size }) => (
						<Icon name="user-plus" type="feather" color={color} size={size} />
					),
				}}
			/>

			<Tab.Screen
				name="Group"
				component={Group}
				options={{
					headerShown: false,
					tabBarActiveTintColor: 'purple',
					tabBarIcon: ({ color, size }) => (
						<Icon name="users" type="feather" color={color} size={size} />
					),
				}}
			/>

			<Tab.Screen
				name="Add"
				component={AddBill}
				options={{
					headerShown: false,
					tabBarActiveTintColor: 'purple',
					tabBarIcon: ({ color, size }) => (
						<Icon name="plus-square" type="feather" color={color} size={size} />
					),
				}}
			/>

			<Tab.Screen
				name="Activities"
				component={Activities}
				options={{
					headerShown: false,
					tabBarActiveTintColor: 'purple',
					tabBarIcon: ({ color, size }) => (
						<Icon name="activity" type="feather" color={color} size={size} />
					),
				}}
			/>

			<Tab.Screen
				name="Profile"
				component={Profile}
				options={{
					headerShown: false,
					tabBarActiveTintColor: 'purple',
					tabBarIcon: ({ color, size }) => (
						<Icon name="user" type="feather" color={color} size={size} />
					),
				}}
			/>
		</Tab.Navigator>
	);
};
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
			<Stack.Screen
				name="TabRoot"
				component={TabNavigator}
				options={{ headerShown: false, tabBarVisible: false }}
			/>
			<Stack.Screen name="Modal" component={RecordModal} options={{ headerShown: false }} />
			<Stack.Screen
				name="ViewGroup"
				component={ViewGroup}
				options={({ route }) => ({
					title: `Group ${route.params.title}`,
					headerShown: true,
				})}
			/>
			<Stack.Screen
				name="CreateGroup"
				component={CreateGroup}
				options={() => ({
					title: `Create Group`,
					headerShown: true,
				})}
			/>
		</Stack.Navigator>
	);
};

const MainNavigator = () => {
	const { isLoggedIn } = useLogin();
	return isLoggedIn ? <ModalStackNavigator /> : <StackNavigator />;
};

export default MainNavigator;
