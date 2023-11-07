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
	const [enableEdit, setEnableEdit] = useState(false);
	const [userProfile, setUserProfile] = useState({
		email: '',
		address: '',
		phoneNumber: '',
		username: '',
		fullName: '',
	});

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

	const editProfile = (field, value) => {
		setUserProfile((prevProfile) => ({
			...prevProfile,
			[field]: value,
		}));
	};

	const fetchUserProfile = async () => {
		const { data: userProfile, error } = await supabase
			.from('users')
			.select()
			.eq('user_id', userDetails.user_id)
			.single();

		if (userProfile) {
			setUserProfile({
				email: userProfile.email,
				address: userProfile.address,
				phoneNumber: userProfile.phone_number,
				username: userProfile.username,
				fullName: userProfile.full_name,
			});
		}
	};
	async function updateProfile() {
		setLoading(true);

		const { data, status } = await supabase.from('users').upsert({
			address: userProfile.address,
			email: userProfile.email,
			phone_number: userProfile.phoneNumber,
			username: userProfile.username,
			user_id: userDetails.user_id,
			full_name: userProfile.fullName,
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
								value={userProfile.username}
								fontWeight="bold"
								onChangeText={(value) => editProfile('username', value)}
							/>
						) : (
							<Heading>{userProfile.username}</Heading> // Display as text when not in edit mode
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
									value={userProfile.email}
									onChangeText={(value) => editProfile('email', value)}
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
									Full Name
								</FormControl.Label>
								<Input
									bg="light.50"
									size="lg"
									variant="rounded"
									keyboardType="default"
									type="text"
									isReadOnly={!enableEdit}
									value={userProfile.fullName}
									onChangeText={(value) => editProfile('fullName', value)}
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
									value={userProfile.phoneNumber}
									onChangeText={(value) => editProfile('phoneNumber', value)}
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
									value={userProfile.address ?? 'No address found!'}
									onChangeText={(value) => editProfile('address', value)}
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
