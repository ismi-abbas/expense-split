import React from 'react';
import Home from './screens/Home';
import { Icon } from '@rneui/themed';
import Group from './screens/Group';
import AddBill from './screens/AddBill';
import Activities from './screens/Activities';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './screens/Profile';

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
					tabBarIcon: ({ color, size }) => <Icon name="user-plus" type="feather" color={color} size={size} />,
				}}
			/>

			<Tab.Screen
				name="Group"
				component={Group}
				options={{
					headerShown: false,
					tabBarActiveTintColor: 'purple',
					tabBarIcon: ({ color, size }) => <Icon name="users" type="feather" color={color} size={size} />,
				}}
			/>

			<Tab.Screen
				name="Add"
				component={AddBill}
				options={{
					headerShown: false,
					tabBarActiveTintColor: 'purple',
					tabBarIcon: ({ color, size }) => <Icon name="plus-square" type="feather" color={color} size={size} />,
				}}
			/>

			<Tab.Screen
				name="Activities"
				component={Activities}
				options={{
					headerShown: false,
					tabBarActiveTintColor: 'purple',
					tabBarIcon: ({ color, size }) => <Icon name="activity" type="feather" color={color} size={size} />,
				}}
			/>

			<Tab.Screen
				name="Profile"
				component={Profile}
				options={{
					headerShown: false,
					tabBarActiveTintColor: 'purple',
					tabBarIcon: ({ color, size }) => <Icon name="user" type="feather" color={color} size={size} />,
				}}
			/>
		</Tab.Navigator>
	);
};

export default TabNavigator;
