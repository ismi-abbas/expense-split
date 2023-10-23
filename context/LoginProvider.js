import 'react-native-url-polyfill/auto';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Session } from '@supabase/supabase-js';

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
	const [session, setSession] = useState(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
			setIsLoggedIn(true);
		});

		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
			setIsLoggedIn(true);
		});
	}, []);

	return (
		<LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
			{children}
		</LoginContext.Provider>
	);
};

export const useLogin = () => useContext(LoginContext);

export default LoginProvider;
