import {
	Button,
	Heading,
	Flex,
	VStack,
	Text,
	FormControl,
	Input,
	HStack,
	Pressable,
	Box,
	TextArea,
	useToast,
} from 'native-base';
import { useLogin } from '../context/LoginProvider';
import BaseLayout from '../components/BaseLayout';
import { truncate } from '../lib/methods';
import { Icon } from '@rneui/base';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const Profile = () => {
	const { setIsLoggedIn, userDetails, setUserDetails } = useLogin();
	const toast = useToast();
	const isFocused = useIsFocused();

	const [loading, setLoading] = useState(true);
	const [email, setEmail] = useState();
	const [address, setAddress] = useState();
	const [phoneNumber, setPhoneNumber] = useState();
	const [enableEdit, setEnableEdit] = useState(false);
	const [username, setUsername] = useState();

	useEffect(() => {
		fetchUserProfile();
	}, [isFocused]);

	const logout = async () => {
		try {
			setIsLoggedIn(false);
			setUserDetails(null);
		} catch (err) {
			console.log(err);
		}
	};

	const changePassword = () => {
		console.log('Password changed');
	};

	const updateBankDetails = () => {
		console.log('Bank details updated');
	};

	const fetchUserProfile = async () => {
		const { data: userProfile, error } = await supabase
			.from('users')
			.select()
			.eq('user_id', userDetails.user_id)
			.single();

		if (userProfile) {
			setUserDetails(userProfile);
			setEmail(userProfile.email);
			setPhoneNumber(userProfile.phone_number);
			setAddress(userProfile.address);
			setUsername(userProfile.username);
		}
	};
	async function updateProfile() {
		setLoading(true);

		const { data, status } = await supabase.from('users').upsert({
			address: address,
			email: email,
			phone_number: phoneNumber,
			username: username,
			user_id: userDetails.user_id,
		});

		if (status === 201) {
			toast.show({
				title: 'Update successful',
			});
			fetchUserProfile();
		}
	}

	return (
		<BaseLayout bgColor="purple.100">
			<Box safeAreaTop={true}>
				<Flex alignItems="center" justifyContent="center" alignContent="center">
					<Flex
						direction="row"
						alignItems="flex-end"
						justifyContent="space-between"
						w="full"
					>
						<Heading>Profile</Heading>
						<Pressable
							onPress={() => setEnableEdit(!enableEdit)}
							padding={1}
							_pressed={{
								backgroundColor: 'white',
								padding: 1,
								rounded: 'md',
							}}
						>
							<Text fontSize="sm" fontWeight="bold">
								Edit
							</Text>
						</Pressable>
					</Flex>

					<HStack w="full" h={20} alignItems="center" justifyContent="center" space={4}>
						<Icon
							size={50}
							name={userDetails?.gender === 'male' ? 'face-man' : 'face-woman'}
							type="material-community"
						/>
						{enableEdit ? (
							<Input
								size="2xl"
								w="200px"
								variant="underlined"
								keyboardType="default"
								type="text"
								value={username}
								fontWeight="bold"
								onChangeText={(value) => setUsername(value)}
							/>
						) : (
							<Heading>{username}</Heading> // Display as text when not in edit mode
						)}
					</HStack>

					<VStack space={4} w="300px">
						<FormControl>
							<VStack>
								<FormControl.Label
									_text={{
										fontSize: 'sm',
										color: 'black',
									}}
								>
									Email Address
								</FormControl.Label>
								<Input
									bg="light.50"
									size="lg"
									variant="rounded"
									keyboardType="default"
									type="text"
									isReadOnly={!enableEdit}
									value={email}
									onChangeText={(value) => setEmail(value)}
								/>
							</VStack>
						</FormControl>
						<FormControl>
							<VStack>
								<FormControl.Label
									_text={{
										fontSize: 'sm',
										color: 'black',
									}}
								>
									Phone Number
								</FormControl.Label>
								<Input
									bg="light.50"
									size="lg"
									variant="rounded"
									keyboardType="default"
									type="text"
									isReadOnly={!enableEdit}
									value={phoneNumber}
									onChangeText={(value) => setPhoneNumber(value)}
								/>
							</VStack>
						</FormControl>
						<FormControl>
							<VStack>
								<FormControl.Label
									_text={{
										fontSize: 'sm',
										color: 'black',
									}}
								>
									Address
								</FormControl.Label>
								<TextArea
									bg="light.50"
									size="md"
									rounded="lg"
									keyboardType="default"
									type="text"
									isReadOnly={!enableEdit}
									value={truncate(address ?? 'No address found!', 20)}
									onChangeText={(value) => setAddress(value)}
								/>
							</VStack>
						</FormControl>
					</VStack>

					<VStack space={4} mt={10} w="full" px={10}>
						<Button rounded="full" colorScheme="purple" onPress={() => updateProfile()}>
							Update Profile
						</Button>
						<Button
							rounded="full"
							colorScheme="purple"
							onPress={() => changePassword()}
						>
							Change Password
						</Button>
						<Button
							rounded="full"
							colorScheme="purple"
							onPress={() => updateBankDetails()}
						>
							Update Bank Account Details
						</Button>
						<Button rounded="full" colorScheme="purple" onPress={() => logout()}>
							Logout
						</Button>
					</VStack>
				</Flex>
			</Box>
		</BaseLayout>
	);
};

export default Profile;
