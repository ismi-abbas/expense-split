import 'react-native-url-polyfill/auto';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getData } from '../lib/methods';

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userDetails, setUserDetails] = useState(null);

	useEffect(() => {
		getData('userDetails');
	}, [isLoggedIn, setIsLoggedIn]);

	return (
		<LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn, userDetails, setUserDetails }}>
			{children}
		</LoginContext.Provider>
	);
};

export const useLogin = () => useContext(LoginContext);

export default LoginProvider;
