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

const Login = ({ navigation }) => {
	const { setIsLoggedIn } = useLogin();
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();

	const toast = useToast();

	const handleLogin = () => {
		console.log({
			username,
			password,
		});
		if (username === '' || username === undefined) {
			toast.show({
				title: 'Please enter your username',
			});
		} else if (password === '' || username === undefined) {
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
			<View flex={1} flexDirection="column" justifyContent="center" w="300px" maxWidth="400px">
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
										}}>
										Username
									</FormControl.Label>
									<Input
										size="lg"
										variant="rounded"
										keyboardType="default"
										type="text"
										placeholder="username/email"
										onChangeText={value => setUsername(value)}
									/>
									<FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
										Atleast 6 characters are required.
									</FormControl.ErrorMessage>
								</Stack>
							</FormControl>
							<FormControl isRequired>
								<Stack>
									<FormControl.Label
										_text={{
											fontSize: 'sm',
										}}>
										Password
									</FormControl.Label>
									<Input
										size="lg"
										variant="rounded"
										type="password"
										placeholder="password"
										onChangeText={value => setPassword(value)}
									/>
									<FormControl.HelperText>Must be atleast 6 characters.</FormControl.HelperText>
									<FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
										Atleast 6 characters are required.
									</FormControl.ErrorMessage>

									<Flex alignItems="flex-end">
										<Button variant="link" colorScheme="purple" onPress={() => handleReset()}>
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
						onPress={() => handleLogin()}>
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
			</View>
		</BaseLayout>
	);
};

export default Login;
