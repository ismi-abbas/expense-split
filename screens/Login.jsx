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
} from 'native-base';
import { Link } from '@react-navigation/native';
import { useLogin } from '../context/LoginProvider';

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
		<Box
			flex="1"
			flexDirection="column"
			justifyContent="center"
			paddingTop={20}
			width="full"
			paddingX={10}
			bg="light.50"
			height="full">
			<Box alignItems="center">
				<Box w="100%" maxWidth="400px">
					<Heading size="xl" textAlign="center">
						Login
					</Heading>
					<FormControl mt={4}>
						<Stack mx="4">
							<FormControl.Label
								_text={{
									fontSize: 'md',
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
					<FormControl isRequired mt={4}>
						<Stack mx="4">
							<FormControl.Label
								_text={{
									fontSize: 'md',
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
				</Box>
			</Box>

			<Box alignItems="center" mt={20}>
				<Button
					py={2}
					size="lg"
					mt={4}
					mb={6}
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
					LOGIN
				</Button>

				<Box flexDirection="row" display="flex" w="full" alignItems="center" justifyContent="center">
					<Divider w="1/3"></Divider>
					<Box px={2}>
						<Text>or</Text>
					</Box>
					<Divider w="1/3"></Divider>
				</Box>

				<Box>
					<Button variant="link" colorScheme="purple" onPress={() => handleSignUp()}>
						SIGN UP
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default Login;
