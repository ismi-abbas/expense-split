import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider, View, Button } from 'native-base';
import MainNavigator from './MainNavigator';
import LoginProvider from './context/LoginProvider';

export default function App() {
	return (
		<LoginProvider>
			<NativeBaseProvider>
				<NavigationContainer>
					<MainNavigator />
				</NavigationContainer>
			</NativeBaseProvider>
		</LoginProvider>
	);
}
