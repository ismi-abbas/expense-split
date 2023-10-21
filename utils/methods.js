import bcrypt from 'bcrypt';

const saltRounds = 10;

export const isValidEmail = value => {
	const regx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	return regx.test(value);
};

export const passwordStrength = password => {
	const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,15}$/;
	return passwordRegex.test(password);
};

export const hashPasssword = password => {
	const salt = bcrypt.genSaltSync(saltRounds);
	const hashedPassword = bcrypt.hashSync(password, salt);
	return { salt, password: hashedPassword };
};
