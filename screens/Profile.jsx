import { View, Button, Heading, Flex, VStack, Text, FormControl, Input, Stack, HStack, Pressable } from 'native-base';
import { useLogin } from '../context/LoginProvider';
import BaseLayout from '../BaseLayout';
import { userDetails } from '../DummyData';
import { truncate } from '../utils/methods';
import { Icon } from '@rneui/base';

const Profile = () => {
	const { setIsLoggedIn } = useLogin();

	const setEmail = value => {
		console.log(value);
	};

	const setPhoneNumber = value => {
		console.log(value);
	};

	const setAddress = value => {
		console.log(value);
	};

	const changePassword = () => {
		console.log('Password changed');
	};

	const updateBankDetails = () => {
		console.log('Bank details updated');
	};
	return (
		<BaseLayout bgColor="purple.100">
			<View flex={1} flexDirection="column" justifyContent="center" w="300px" maxW="400px">
				<Flex alignItems="center" justifyContent="center" alignContent="center">
					<Flex direction="row" alignItems="flex-end" justifyContent="space-between" w="full">
						<Heading>Profile</Heading>
						<Pressable
							onPress={() => console.log('Edit user')}
							_pressed={{
								color: 'light.50',
							}}>
							<Text fontSize="sm" fontWeight="bold">
								Edit
							</Text>
						</Pressable>
					</Flex>

					<HStack w="full" h={20} alignItems="center" justifyContent="center" space={4}>
						<Icon size={50} name="face-man" type="material-community" />
						<Heading size="sm">{userDetails.fullName}</Heading>
					</HStack>

					<VStack space={4} w="300px">
						<FormControl>
							<VStack>
								<FormControl.Label
									_text={{
										fontSize: 'sm',
										color: 'black',
									}}>
									Email Address
								</FormControl.Label>
								<Input
									bg="light.50"
									size="lg"
									variant="rounded"
									keyboardType="default"
									type="text"
									value={userDetails.email}
									onChangeText={value => setUsername(value)}
								/>
							</VStack>
						</FormControl>
						<FormControl>
							<VStack>
								<FormControl.Label
									_text={{
										fontSize: 'sm',
										color: 'black',
									}}>
									Phone Number
								</FormControl.Label>
								<Input
									bg="light.50"
									size="lg"
									variant="rounded"
									keyboardType="default"
									type="text"
									value={userDetails.phoneNumber}
									onChangeText={value => setUsername(value)}
								/>
							</VStack>
						</FormControl>
						<FormControl>
							<VStack>
								<FormControl.Label
									_text={{
										fontSize: 'sm',
										color: 'black',
									}}>
									Address
								</FormControl.Label>
								<Input
									bg="light.50"
									size="lg"
									variant="rounded"
									keyboardType="default"
									type="text"
									value={truncate(userDetails.address, 20)}
									onChangeText={value => setAddress(value)}
								/>
							</VStack>
						</FormControl>
					</VStack>

					<VStack space={4} mt={10} w="full" px={10}>
						<Button rounded="full" colorScheme="purple" onPress={changePassword}>
							Change Password
						</Button>
						<Button rounded="full" colorScheme="purple" onPress={updateBankDetails}>
							Update Bank Account Details
						</Button>
						<Button rounded="full" colorScheme="purple" onPress={() => setIsLoggedIn(false)}>
							Logout
						</Button>
					</VStack>
				</Flex>
			</View>
		</BaseLayout>
	);
};

export default Profile;
