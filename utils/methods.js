// import { genSaltSync, hashSync } from 'bcryptjs';
import { format, compareAsc } from 'date-fns';

const saltRounds = 10;

export const isValidEmail = value => {
	const regx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	return regx.test(value);
};

export const passwordStrength = password => {
	const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,15}$/;
	return passwordRegex.test(password);
};

// export const hashPasssword = password => {
// 	const salt = genSaltSync(saltRounds);
// 	const hashedPassword = hashSync(password, salt);
// 	return { salt, password: hashedPassword };
// };

export const formatDate = date => {
	const timeStamp = new Date(date);
	return format(timeStamp, 'dd MMMM yyyy');
};

export const truncate = (str, n) => {
	return str.length > n ? str.slice(0, n - 1) + '...' : str;
};
