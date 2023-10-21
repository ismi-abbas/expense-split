import React from 'react';
import Home from './screens/Home';
import { Icon } from '@rneui/themed';
import ViewBill from './screens/ViewBill';
import AddBill from './screens/AddBill';
import User from './screens/User';
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
				component={ViewBill}
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
				name="Records"
				component={User}
				options={{
					headerShown: false,
					tabBarActiveTintColor: 'purple',
					tabBarIcon: ({ color, size }) => <Icon name="pie-chart" type="feather" color={color} size={size} />,
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
