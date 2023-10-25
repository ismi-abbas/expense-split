import { useNavigation } from '@react-navigation/native';
import {
	Box,
	Heading,
	FormControl,
	Stack,
	Input,
	WarningOutlineIcon,
	Button,
	useToast,
	Text,
	Flex,
} from 'native-base';
import { useState } from 'react';
import BaseLayout from '../components/BaseLayout';
import { supabase } from '../lib/supabase';
import { hashPasssword } from '../lib/methods';

const SignUp = () => {
	const navigation = useNavigation();
	const toast = useToast();
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirmation, setPasswordConfirmation] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [fullName, setFullName] = useState('');
	const [address, setAddress] = useState('');

	const showErrorToast = (message) => {
		toast.show({
			title: message,
		});
	};

	const handleSignUp = async () => {
		setIsLoading(true);
		if (!username || !email || !phoneNumber || !password || !passwordConfirmation) {
			showErrorToast('Please fill all fields');
			return;
		}

		if (password !== passwordConfirmation) {
			showErrorToast('Password mismatch');
			return;
		}

		const { password: hashedPassword } = hashPasssword(password);

		const { error, status } = await supabase.from('users').insert({
			username: username,
			email: email,
			password: hashedPassword,
			full_name: fullName,
			address: address,
			phone_number: phoneNumber,
			role_id: 1,
		});

		if (error) {
			showErrorToast('Error registering ' + error.message);
		}

		if (status === 201) {
			showErrorToast('User registered');
		}

		setIsLoading(false);

		navigation.navigate('Login');
	};

	return (
		<BaseLayout bgColor="light.50">
			<Box safeAreaTop={true} flex={1} justifyContent="center" mx={5}>
				<Box alignItems="center">
					<Box w="full">
						<Heading size="xl" textAlign="center">
							Sign Up
						</Heading>
						<Stack space={4}>
							<FormControl>
								<Stack>
									<FormControl.Label
										_text={{
											fontSize: 'sm',
										}}
									>
										Username
									</FormControl.Label>
									<Input
										autoCapitalize="none"
										size="lg"
										type="text"
										keyboardType="default"
										onChangeText={setUsername}
										variant="rounded"
									/>
									<FormControl.ErrorMessage
										leftIcon={<WarningOutlineIcon size="md" />}
									>
										At least 6 characters are required.
									</FormControl.ErrorMessage>
								</Stack>
							</FormControl>
							<FormControl>
								<Stack>
									<FormControl.Label
										_text={{
											fontSize: 'sm',
										}}
									>
										Email Address
									</FormControl.Label>
									<Input
										autoCapitalize="none"
										size="lg"
										type="email"
										keyboardType="email-address"
										onChangeText={setEmail}
										variant="rounded"
									/>
									<FormControl.ErrorMessage
										leftIcon={<WarningOutlineIcon size="xs" />}
									>
										At least 6 characters are required.
									</FormControl.ErrorMessage>
								</Stack>
							</FormControl>
							<FormControl>
								<Stack>
									<FormControl.Label
										_text={{
											fontSize: 'sm',
										}}
									>
										Phone Number
									</FormControl.Label>
									<Input
										size="lg"
										type="text"
										keyboardType="number-pad"
										onChangeText={setPhoneNumber}
										variant="rounded"
									/>
									<FormControl.ErrorMessage
										leftIcon={<WarningOutlineIcon size="xs" />}
									>
										At least 6 characters are required.
									</FormControl.ErrorMessage>
								</Stack>
							</FormControl>
							<FormControl isRequired>
								<Stack>
									<FormControl.Label
										_text={{
											fontSize: 'sm',
										}}
									>
										Password
									</FormControl.Label>
									<Input
										size="lg"
										type="password"
										keyboardType="default"
										onChangeText={setPassword}
										variant="rounded"
									/>
									<FormControl.HelperText>
										Must be at least 6 characters.
									</FormControl.HelperText>
									<FormControl.ErrorMessage
										leftIcon={<WarningOutlineIcon size="xs" />}
									>
										At least 6 characters are required.
									</FormControl.ErrorMessage>
								</Stack>
							</FormControl>
							<FormControl isRequired>
								<Stack>
									<FormControl.Label
										_text={{
											fontSize: 'sm',
										}}
									>
										Confirm Password
									</FormControl.Label>
									<Input
										size="lg"
										type="password"
										keyboardType="default"
										onChangeText={setPasswordConfirmation}
										variant="rounded"
									/>
								</Stack>
							</FormControl>
						</Stack>
					</Box>
				</Box>

				<Stack alignItems="center" mt={20} space={2}>
					<Button
						py={2}
						size="lg"
						mt={4}
						w="full"
						rounded="full"
						bg="purple.600"
						_pressed={{
							bgColor: 'purple.500',
						}}
						_text={{
							fontWeight: 500,
						}}
						isLoading={isLoading}
						onPress={handleSignUp}
					>
						Create Account
					</Button>

					<Flex
						direction="row"
						alignItems="center"
						alignItem="center"
						justifyContent="center"
					>
						<Text mr={0}>Alredy have an account?</Text>
						<Button
							variant="link"
							onPress={() => navigation.goBack()}
							ml={0}
							pl={1}
							colorScheme="purple"
						>
							Sign In
						</Button>
					</Flex>
				</Stack>
			</Box>
		</BaseLayout>
	);
};

export default SignUp;
