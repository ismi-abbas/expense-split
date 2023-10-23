import bcrypt from 'react-native-bcrypt';
import { format, compareAsc } from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';

const saltRounds = 10;

export const isValidEmail = (value) => {
	const regx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	return regx.test(value);
};

export const passwordStrength = (password) => {
	const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,15}$/;
	return passwordRegex.test(password);
};

export const hashPasssword = (password) => {
	const salt = bcrypt.genSaltSync(saltRounds);
	const hashedPassword = bcrypt.hashSync(password, salt);
	return { salt, password: hashedPassword };
};

export const comparePasswords = (plainPassword, hashedPassword) => {
	console.log(bcrypt.compareSync(plainPassword, hashedPassword));
	return bcrypt.compareSync(plainPassword, hashedPassword);
};

export const formatDate = (date) => {
	const timeStamp = new Date(date);
	return format(timeStamp, 'dd MMMM yyyy');
};

export const truncate = (str, n) => {
	return str.length > n ? str.slice(0, n - 1) + '...' : str;
};

export const storeData = async (key, value) => {
	try {
		if (typeof value === 'object') {
			const jsonValue = JSON.stringify(value);
			await AsyncStorage.setItem(key, jsonValue);
		} else {
			await AsyncStorage.setItem(key, value.toString());
		}
	} catch (error) {
		throw error;
	}
};

export const getData = async (key) => {
	try {
		const data = await AsyncStorage.getItem(key);
		if (data !== null) {
			try {
				return JSON.parse(data);
			} catch (error) {
				return data;
			}
		}
		return null;
	} catch (error) {
		throw error;
	}
};
