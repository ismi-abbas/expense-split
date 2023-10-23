import 'react-native-url-polyfill/auto';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userDetails, setUserDetails] = useState(null);

	const getData = async () => {
		try {
			const value = AsyncStorage.getItem('userDetails');
			if (value !== null) {
				setUserDetails(value);
			}

			console.log('userDetails', value);
		} catch (err) {
			console.log(error);
		}
	};

	useEffect(() => {
		getData();
	}, [isLoggedIn, setIsLoggedIn]);

	return (
		<LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn, userDetails, setUserDetails }}>
			{children}
		</LoginContext.Provider>
	);
};

export const useLogin = () => useContext(LoginContext);

export default LoginProvider;
