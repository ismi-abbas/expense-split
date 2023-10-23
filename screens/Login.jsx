import { useState } from 'react';
import {
	Box,
	FormControl,
	Stack,
	Input,
	WarningOutlineIcon,
	Heading,
	Button,
	Divider,
	useToast,
	Flex,
	Text,
	View,
} from 'native-base';
import { useLogin } from '../context/LoginProvider';
import BaseLayout from '../components/BaseLayout';
import { supabase } from '../lib/supabase';

const Login = ({ navigation }) => {
	// context
	const { setIsLoggedIn } = useLogin();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const toast = useToast();

	const signInWithEmail = async () => {
		setLoading(true);

		const { data, error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password,
		});

		if (error) {
			toast.show({
				title: error.message,
			});
		}

		if (data.user) {
			setIsLoggedIn(true);
		}

		setLoading(false);
	};

	const handleLogin = () => {
		if (email === '' || email === undefined) {
			toast.show({
				title: 'Please enter your username',
			});
		} else if (password === '' || email === undefined) {
			toast.show({
				title: 'Please enter your password',
			});
		} else {
			setIsLoggedIn(true);
		}
	};

	const handleReset = () => {
		toast.show({
			title: 'Reset password request has been sent to your email address',
		});
	};

	const handleSignUp = () => {
		navigation.navigate('SignUp');
	};

	return (
		<BaseLayout bgColor="light.50">
			<Box safeAreaTop={true} flex={1} justifyContent="center" mx={5}>
				<Box alignItems="center">
					<Box w="full">
						<Heading size="xl" textAlign="center">
							Login
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
										size="lg"
										variant="rounded"
										keyboardType="default"
										type="email"
										placeholder="username/email"
										onChangeText={(value) => setEmail(value)}
										autoCapitalize={false}
									/>
									<FormControl.ErrorMessage
										leftIcon={<WarningOutlineIcon size="xs" />}
									>
										Atleast 6 characters are required.
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
										variant="rounded"
										type="password"
										placeholder="password"
										onChangeText={(value) => setPassword(value)}
									/>
									<FormControl.HelperText>
										Must be atleast 6 characters.
									</FormControl.HelperText>
									<FormControl.ErrorMessage
										leftIcon={<WarningOutlineIcon size="xs" />}
									>
										Atleast 6 characters are required.
									</FormControl.ErrorMessage>

									<Flex alignItems="flex-end">
										<Button
											variant="link"
											colorScheme="purple"
											onPress={() => handleReset()}
										>
											Forgot password?
										</Button>
									</Flex>
								</Stack>
							</FormControl>
						</Stack>
					</Box>
				</Box>
				<Stack alignItems="center" mt={20} space={4}>
					<Button
						py={2}
						size="lg"
						w="full"
						rounded="full"
						bg="purple.600"
						_pressed={{
							bgColor: 'purple.500',
						}}
						_text={{
							fontWeight: 500,
						}}
						onPress={() => handleLogin()}
					>
						Login
					</Button>

					<Button
						py={2}
						size="lg"
						w="full"
						rounded="full"
						bg="purple.600"
						_pressed={{
							bgColor: 'purple.500',
						}}
						_text={{
							fontWeight: 500,
						}}
						onPress={() => signInWithEmail()}
						_loading={loading}
					>
						Sign in with email
					</Button>

					<Flex direction="row" alignItems="center" justifyContent="center">
						<Box px={2}>
							<Text>or</Text>
						</Box>
					</Flex>

					<Button variant="link" colorScheme="purple" onPress={() => handleSignUp()}>
						Sign Up
					</Button>
				</Stack>
			</Box>
		</BaseLayout>
	);
};

export default Login;
