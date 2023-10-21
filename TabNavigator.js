import React from 'react';
import Home from './screens/Home';
import { Icon } from '@rneui/themed';
import ViewBill from './screens/ViewBill';
import AddBill from './screens/AddBill';
import User from './screens/User';
import Settings from './screens/Settings';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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
					tabBarShowLabel: false,
					tabBarActiveTintColor: 'purple',
					tabBarIcon: ({ color, size }) => <Icon name="user-plus" type="feather" color={color} size={size} />,
				}}
			/>

			<Tab.Screen
				name="View"
				component={ViewBill}
				options={{
					headerShown: false,
					tabBarShowLabel: false,
					tabBarActiveTintColor: 'purple',
					tabBarIcon: ({ color, size }) => <Icon name="users" type="feather" color={color} size={size} />,
				}}
			/>

			<Tab.Screen
				name="Add"
				component={AddBill}
				options={{
					headerShown: false,
					tabBarShowLabel: false,
					tabBarActiveTintColor: 'purple',
					tabBarIcon: ({ color, size }) => <Icon name="plus-square" type="feather" color={color} size={size} />,
				}}
			/>

			<Tab.Screen
				name="User"
				component={User}
				options={{
					headerShown: false,
					tabBarShowLabel: false,
					tabBarActiveTintColor: 'purple',
					tabBarIcon: ({ color, size }) => <Icon name="pie-chart" type="feather" color={color} size={size} />,
				}}
			/>

			<Tab.Screen
				name="Settings"
				component={Settings}
				options={{
					headerShown: false,
					tabBarShowLabel: false,
					tabBarActiveTintColor: 'purple',
					tabBarIcon: ({ color, size }) => <Icon name="user" type="feather" color={color} size={size} />,
				}}
			/>
		</Tab.Navigator>
	);
};

export default TabNavigator;
