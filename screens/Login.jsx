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
import { comparePasswords, storeData } from '../lib/methods';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
	const { setIsLoggedIn, setUserDetails } = useLogin();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const toast = useToast();

	const signInWithEmail = async () => {
		if (email === '' || email === undefined) {
			toast.show({
				title: 'Please enter your email',
			});
		} else if (password === '' || email === undefined) {
			toast.show({
				title: 'Please enter your password',
			});
		} else {
			try {
				setLoading(true);
				const { data, error, status } = await supabase
					.from('users')
					.select('user_id, email, password')
					.eq('email', email)
					.single();

				if (status === 200) {
					const isPasswordCorrect = comparePasswords(password, data.password);
					if (isPasswordCorrect) {
						await storeData('userDetails', data);
						setLoading(false);
						setIsLoggedIn(true);
					} else {
						setLoading(false);
						toast.show({
							title: 'Invalid email or password',
						});
					}
				}

				if (error) {
					toast.show({
						title: 'User not found',
					});
					setLoading(false);
				}
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
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
										Email
									</FormControl.Label>
									<Input
										size="lg"
										variant="rounded"
										keyboardType="default"
										type="email"
										placeholder="username/email"
										onChangeText={(value) => setEmail(value)}
										autoCapitalize="none"
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
						isLoading={loading}
						onPress={() => signInWithEmail()}
					>
						Login
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
