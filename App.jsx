import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
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
