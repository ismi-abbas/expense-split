import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider, View, Button } from 'native-base';
import MainNavigator from './MainNavigator';
import LoginProvider from './context/LoginProvider';
import { ModalProvider } from './context/ModalProvider';

export default function App() {
	return (
		<LoginProvider>
			<ModalProvider>
				<NativeBaseProvider>
					<NavigationContainer>
						<MainNavigator />
					</NavigationContainer>
				</NativeBaseProvider>
			</ModalProvider>
		</LoginProvider>
	);
}
