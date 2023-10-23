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
	Alert,
} from 'native-base';
import { useLogin } from '../context/LoginProvider';
import BaseLayout from '../components/BaseLayout';
import { getData, truncate } from '../lib/methods';
import { Icon } from '@rneui/base';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
	const { setIsLoggedIn } = useLogin();

	const [session, setSession] = useState(null);
	const [loading, setLoading] = useState(true);
	const [username, setUsername] = useState('');
	const [website, setWebsite] = useState('');
	const [avatarUrl, setAvatarUrl] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [address, setAddress] = useState('');
	const [fullName, setFullName] = useState('');
	const [email, setEmail] = useState('');
	const [userId, setUserId] = useState('');

	useEffect(() => {
		getUserProfile();
	}, []);

	const logout = async () => {
		try {
			AsyncStorage.clear();
			setIsLoggedIn(false);
		} catch (err) {
			console.log(err);
		}
	};

	const getUserProfile = async () => {
		const data = await getData('userDetails');
		setUserId(data.id);

		getProfile();
	};

	const changePassword = () => {
		console.log('Password changed');
	};

	const updateBankDetails = () => {
		console.log('Bank details updated');
	};

	async function getProfile() {
		try {
			setLoading(true);
			const { data, error, status } = await supabase
				.from('users')
				.select(`username, email, address, role_id, phone_number`)
				.eq('id', userId)
				.single();

			if (error && status !== 406) {
				throw error;
			}

			if (data) {
				setUsername(data.username);
				setPhoneNumber(data.phone_number);
				setEmail(data.email);
				setAddress(data.address);
			}
		} catch (error) {
			if (error) {
				console.log(error.message);
			}
		} finally {
			setLoading(false);
		}
	}

	async function updateProfile({ username, website, avatar_url }) {
		try {
			setLoading(true);
			if (!session?.user) throw new Error('No user on the session!');

			const updates = {
				id: session?.user.id,
				username,
				website,
				avatar_url,
				updated_at: new Date(),
			};

			const { error } = await supabase.from('profiles').upsert(updates);

			if (error) {
				throw error;
			}
		} catch (error) {
			if (error instanceof Error) {
				Alert.alert(error.message);
			}
		} finally {
			setLoading(false);
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
							onPress={() => console.log('Edit user')}
							_pressed={{
								color: 'light.50',
							}}
						>
							<Text fontSize="sm" fontWeight="bold">
								Edit
							</Text>
						</Pressable>
					</Flex>

					<HStack w="full" h={20} alignItems="center" justifyContent="center" space={4}>
						<Icon size={50} name="face-man" type="material-community" />
						<Heading size="sm">{fullName}</Heading>
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
									value={email}
									onChangeText={(value) => console.log(value)}
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
									value={phoneNumber}
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
								<Input
									bg="light.50"
									size="lg"
									variant="rounded"
									keyboardType="default"
									type="text"
									value={truncate(address, 20)}
								/>
							</VStack>
						</FormControl>
					</VStack>

					<VStack space={4} mt={10} w="full" px={10}>
						<Button
							rounded="full"
							colorScheme="purple"
							onPress={() =>
								updateProfile({ username, website, avatar_url: avatarUrl })
							}
						>
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
