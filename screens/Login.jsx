import { View } from 'react-native';
import React, { useState } from 'react';
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

const Login = () => {
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();

	const toast = useToast();

	const handleLogin = () => {
		console.log({
			username,
			password,
		});
		if (username === '') {
			toast.show({
				title: 'Please enter your username',
			});
		}

		if (password === '') {
			toast.show({
				title: 'Please enter your password',
			});
		}
	};

	const handleReset = () => {
		toast.show({
			title: 'Reset password request has been sent to your email address',
		});
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
							<FormControl.Label>Username</FormControl.Label>
							<Input type="text" placeholder="username/email" onChangeText={value => setUsername(value)} />
							<FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
								Atleast 6 characters are required.
							</FormControl.ErrorMessage>
						</Stack>
					</FormControl>
					<FormControl isRequired mt={4}>
						<Stack mx="4">
							<FormControl.Label>Password</FormControl.Label>
							<Input type="password" placeholder="password" onChangeText={value => setPassword(value)} />
							<FormControl.HelperText>Must be atleast 6 characters.</FormControl.HelperText>
							<FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
								Atleast 6 characters are required.
							</FormControl.ErrorMessage>

							<Flex alignItems="flex-end">
								<Button variant="link" colorScheme="purple" onPress={() => handleReset()}>
									Reset Password
								</Button>
							</Flex>
						</Stack>
					</FormControl>
				</Box>
			</Box>

			<Box alignItems="center" mt={20}>
				<Button
					size="md"
					mt={4}
					mb={6}
					w="24"
					rounded="full"
					bg="purple.600"
					_pressed={{
						bgColor: 'purple.500',
					}}
					onPress={() => handleLogin()}>
					Sign In
				</Button>

				<Box flexDirection="row" display="flex" w="full" alignItems="center" justifyContent="center">
					<Divider w="1/3"></Divider>
					<Box px={2}>
						<Text>or</Text>
					</Box>
					<Divider w="1/3"></Divider>
				</Box>

				<Box>
					<Button variant="link" colorScheme="purple" onPress={() => console.log('Sign Up')}>
						Sign Up
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default Login;
