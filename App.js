import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/Home';
import Settings from './screens/Settings';
import AddBill from './screens/AddBill';
import User from './screens/User';
import ViewBill from './screens/ViewBill';
import { Icon } from '@rneui/themed';
import { Button } from 'react-native';

const Tab = createBottomTabNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Tab.Navigator>
				<Tab.Screen
					name="Home"
					component={Home}
					options={{
						headerShown: false,
						tabBarShowLabel: false,
						tabBarIcon: ({ color, size }) => <Icon name="user-plus" type="feather" color={color} size={size} />,
					}}
				/>

				<Tab.Screen
					name="View"
					component={ViewBill}
					options={{
						headerShown: false,
						tabBarShowLabel: false,
						tabBarIcon: ({ color, size }) => <Icon name="users" type="feather" color={color} size={size} />,
					}}
				/>

				<Tab.Screen
					name="Add"
					component={AddBill}
					options={{
						headerShown: false,
						tabBarShowLabel: false,
						tabBarIcon: ({ color, size }) => <Icon name="plus-square" type="feather" color={color} size={size} />,
					}}
				/>

				<Tab.Screen
					name="User"
					component={User}
					options={{
						headerShown: false,
						tabBarShowLabel: false,
						tabBarIcon: ({ color, size }) => <Icon name="pie-chart" type="feather" color={color} size={size} />,
					}}
				/>

				<Tab.Screen
					name="Settings"
					component={Settings}
					options={{
						headerShown: false,
						tabBarShowLabel: false,
						tabBarIcon: ({ color, size }) => <Icon name="user" type="feather" color={color} size={size} />,
					}}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	);
}
