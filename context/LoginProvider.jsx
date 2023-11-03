import 'react-native-url-polyfill/auto';
import React, { createContext, useContext, useEffect, useState } from 'react';

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userDetails, setUserDetails] = useState();

	useEffect(() => {
		setUserDetails({
			address: '',
			created_at: null,
			email: '1@test.com',
			full_name: '',
			gender: 'female',
			password: '$2a$10$AgMwLhRekARWpJrny0.1su.2DPTkvCjNuuw3vIt2L/t49sP2yCxx2',
			phone_number: '0123456789',
			role_id: 1,
			user_id: 'e291c9c9-33c4-4c52-be8b-b2ca5d0ce58b',
			username: 'Hani',
		});
		setIsLoggedIn(true);
	}, []);

	return (
		<LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn, userDetails, setUserDetails }}>
			{children}
		</LoginContext.Provider>
	);
};

export const useLogin = () => useContext(LoginContext);

export default LoginProvider;
