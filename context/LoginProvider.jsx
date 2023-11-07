import 'react-native-url-polyfill/auto';
import React, { createContext, useContext, useEffect, useState } from 'react';

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userDetails, setUserDetails] = useState();

	useEffect(() => {
		// uncomment for development - no login required. Data query from supabase users table

		// setUserDetails({
		// 	address: '',
		// 	created_at: null,
		// 	email: 'abbas@email.com',
		// 	full_name: 'Muhammad Abbas B Puzi',
		// 	gender: 'male',
		// 	password: '$2a$10$AgMwLhRekARWpJrny0.1su.2DPTkvCjNuuw3vIt2L/t49sP2yCxx2',
		// 	phone_number: '0123456789',
		// 	role_id: 1,
		// 	user_id: '69a94d43-3bde-416a-bd3f-7730fe59a4ee',
		// 	username: 'ismiabbas',
		// });
		// setIsLoggedIn(true);

		// comment if in development
		if (userDetails === null) {
			setIsLoggedIn(false);
		}
	}, []);

	return (
		<LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn, userDetails, setUserDetails }}>
			{children}
		</LoginContext.Provider>
	);
};

export const useLogin = () => useContext(LoginContext);

export default LoginProvider;
