import { Link } from '@react-navigation/native';
import {
	Box,
	Heading,
	FormControl,
	Stack,
	Input,
	WarningOutlineIcon,
	Button,
	View,
	useToast,
	Text,
	Flex,
} from 'native-base';
import { useState } from 'react';

const SignUp = ({ navigation }) => {
	const toast = useToast();
	const [fullName, setFullName] = useState('');
	const [email, setEmail] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirmation, setPasswordConfirmation] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const showErrorToast = message => {
		toast.show({
			title: message,
		});
	};

	const handleSignUp = () => {
		if (!fullName || !email || !phoneNumber || !password || !passwordConfirmation) {
			showErrorToast('Please fill all fields');
			return;
		}

		if (password !== passwordConfirmation) {
			showErrorToast('Password mismatch');
			return;
		}

		setIsLoading(true);

		setTimeout(() => {
			toast.show({
				title: `Account has been created for ${fullName}`,
			});
			setIsLoading(false);
		}, 500);
	};

	return (
		<View
			flex={1}
			flexDirection="column"
			justifyContent="center"
			paddingTop={20}
			width="full"
			paddingX={10}
			bg="light.50"
			height="full">
			<View alignItems="center">
				<View w="full" maxWidth="400px">
					<Heading size="xl" textAlign="center">
						Sign Up
					</Heading>
					<Stack space={4} mx="auto" w="85%">
						<FormControl>
							<Stack>
								<FormControl.Label>Full Name</FormControl.Label>
								<Input size="lg" type="text" keyboardType="default" onChangeText={setFullName} variant="rounded" />
								<FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="md" />}>
									At least 6 characters are required.
								</FormControl.ErrorMessage>
							</Stack>
						</FormControl>
						<FormControl>
							<Stack>
								<FormControl.Label>Email Address</FormControl.Label>
								<Input
									autoCapitalize="none"
									size="lg"
									type="email"
									keyboardType="email-address"
									onChangeText={setEmail}
									variant="rounded"
								/>
								<FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
									At least 6 characters are required.
								</FormControl.ErrorMessage>
							</Stack>
						</FormControl>
						<FormControl>
							<Stack>
								<FormControl.Label>Phone Number</FormControl.Label>
								<Input
									size="lg"
									type="text"
									keyboardType="number-pad"
									onChangeText={setPhoneNumber}
									variant="rounded"
								/>
								<FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
									At least 6 characters are required.
								</FormControl.ErrorMessage>
							</Stack>
						</FormControl>
						<FormControl isRequired>
							<Stack>
								<FormControl.Label>Password</FormControl.Label>
								<Input size="lg" type="password" keyboardType="default" onChangeText={setPassword} variant="rounded" />
								<FormControl.HelperText>Must be at least 6 characters.</FormControl.HelperText>
								<FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
									At least 6 characters are required.
								</FormControl.ErrorMessage>
							</Stack>
						</FormControl>
						<FormControl isRequired>
							<Stack>
								<FormControl.Label>Confirm Password</FormControl.Label>
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
				</View>
			</View>

			<Stack alignItems="center" mt={20} mx="auto" w="85%">
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
					onPress={handleSignUp}>
					Create Account
				</Button>

				<Flex direction="row" alignItems="center">
					<Text mr={0}>Alredy have an account?</Text>
					<Button variant="link" onPress={() => navigation.goBack()} ml={0} pl={1} colorScheme="purple">
						Sign In
					</Button>
				</Flex>
			</Stack>
		</View>
	);
};

export default SignUp;
