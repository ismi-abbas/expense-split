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
import { truncate } from '../lib/methods';
import { Icon } from '@rneui/base';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
	const { setIsLoggedIn, userDetails } = useLogin();

	const [session, setSession] = useState(null);
	const [loading, setLoading] = useState(true);
	const [currentUser, setCurrentUser] = useState();

	useEffect(() => {
		setCurrentUser(userDetails);
	}, []);

	const logout = async () => {
		try {
			AsyncStorage.clear();
			setIsLoggedIn(false);
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
						<Icon
							size={50}
							name={currentUser?.gender === 'male' ? 'face-man' : 'face-woman'}
							type="material-community"
						/>
						<Heading size="lg">{currentUser?.username}</Heading>
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
									value={currentUser?.email}
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
									value={currentUser?.phone_number}
									onChangeText={(text) => console.log(text)}
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
									// value={truncate(currentUser?.address, 20)}
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
