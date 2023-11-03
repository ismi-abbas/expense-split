import {
	Box,
	Heading,
	Input,
	FormControl,
	ScrollView,
	Button,
	HStack,
	VStack,
	TextArea,
	IconButton,
	useToast,
	Text,
	Flex,
} from 'native-base';
import React, { useEffect, useState } from 'react';
174;
import BaseLayout from '../components/BaseLayout';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { supabase } from '../lib/supabase';
import { useLogin } from '../context/LoginProvider';

const type = [
	{
		name: 'Trip',
		value: 'trip',
	},
	{
		name: 'Home',
		value: 'home',
	},
	{
		name: 'Couple',
		value: 'couple',
	},
	{
		name: 'Work',
		value: 'work',
	},
];

const CreateGroup = ({ navigation }) => {
	const [selectedMember, setSelectedMember] = useState([]);
	const [groupName, setGroupName] = useState('');
	const [groupType, setGroupType] = useState([]);
	const [groupDescription, setGroupDescription] = useState('');
	const [users, setUsers] = useState([]);
	const { userDetails } = useLogin();

	const toast = useToast();

	useEffect(() => {
		getAllUser();
	}, []);

	const selectMembers = (value) => {
		setSelectedMember(
			selectedMember.includes(value)
				? selectedMember.filter((member) => member !== value)
				: [...selectedMember, value]
		);
	};

	const selectType = (value) => {
		setGroupType(value);
	};

	const getAllUser = async () => {
		const { data, error } = await supabase.from('users').select('*');

		if (data) {
			setUsers(data);
		}

		if (error) {
			console.log(error);
		}
	};

	const registerGroup = async () => {
		if (!groupName || !groupType || !groupDescription || !selectMembers) {
			toast.show({
				title: 'Please fill all the fields',
			});
		} else {
			const { data: groupData, error } = await supabase
				.from('groups')
				.insert({
					group_name: groupName,
					group_description: groupDescription,
					group_type: groupType,
					created_by: userDetails.user_id,
				})
				.select()
				.single();

			if (groupData) {
				const groupMembersData = selectedMember.map((memberId) => ({
					group_id: groupData.group_id,
					user_id: memberId,
					role: 'member',
				}));

				await supabase.from('activities').insert({
					activity_description: `${userDetails?.user_id} has created group ${groupData.group_name}`,
					activity_type: 'group',
					group_id: groupData.group_id,
					status: 'created',
				});

				const { data, error } = await supabase
					.from('group_members')
					.insert(groupMembersData)
					.select();

				if (data) {
					navigation.goBack();
				}

				if (error) {
					toast.show({ title: 'Error creating group' });
					console.log(error);
				}
			}

			if (error) {
				toast.show({ title: 'Error creating group' });
				console.log(error);
			}
		}
	};

	return (
		<BaseLayout>
			<VStack space={4}>
				<Box>
					<Heading textAlign="center">Create Group</Heading>
				</Box>

				<Box>
					<FormControl.Label
						_text={{
							color: 'black',
						}}
					>
						Group Name
					</FormControl.Label>
					<Input
						variant="outline"
						rounded="full"
						size="lg"
						borderColor="black"
						bgColor="white"
						value={groupName}
						onChangeText={(text) => setGroupName(text)}
					/>
				</Box>

				<Box mt={3}>
					<FormControl.Label
						_text={{
							color: 'black',
						}}
					>
						Type
					</FormControl.Label>
					<ScrollView horizontal showsHorizontalScrollIndicator={false}>
						<HStack space={2}>
							{type.map((item, index) => (
								<Button
									key={index}
									_text={{
										fontSize: 'sm',
										fontWeight: 'bold',
									}}
									w="100px"
									variant="subtle"
									colorScheme="purple"
									rounded="full"
									onPress={() => selectType(item.value)}
									borderColor={
										groupType === item.value ? 'purple.500' : 'purple.100'
									}
									borderWidth={2}
								>
									{item.name}
								</Button>
							))}
						</HStack>
					</ScrollView>
				</Box>

				<Box>
					<FormControl.Label
						_text={{
							color: 'black',
						}}
					>
						Group Description
					</FormControl.Label>
					<TextArea
						size="md"
						borderColor="black"
						rounded="xl"
						h={20}
						bgColor="white"
						value={groupDescription}
						onChangeText={(desc) => setGroupDescription(desc)}
					/>
				</Box>

				<Box>
					<FormControl.Label
						_text={{
							color: 'black',
						}}
					>
						Select Members
					</FormControl.Label>
					<ScrollView horizontal showsHorizontalScrollIndicator={false}>
						<HStack space={2}>
							{users.map((user) => (
								<Flex alignItems="center">
									<IconButton
										variant="subtle"
										bgColor="white"
										w={12}
										h={12}
										rounded="full"
										_icon={{
											as: MaterialCommunityIcons,
											name: `${
												user.gender == 'male' ? 'face-man' : 'face-woman'
											}`,
										}}
										borderColor={
											selectedMember.includes(user.user_id)
												? 'purple.500'
												: 'purple.100'
										}
										borderWidth={2}
										onPress={() => selectMembers(user.user_id)}
									/>
									<Text fontSize="xs">{user.username}</Text>
								</Flex>
							))}
						</HStack>
					</ScrollView>
				</Box>

				<Button.Group direction="column" mt={6} alignItems="center">
					<Button
						w="300px"
						rounded="full"
						colorScheme="purple"
						_text={{
							fontWeight: 'bold',
						}}
						onPress={() => registerGroup()}
					>
						Create Group
					</Button>
					<Button
						w="300px"
						rounded="full"
						colorScheme="purple"
						_text={{
							fontWeight: 'bold',
						}}
						onPress={() => navigation.goBack()}
					>
						Cancel
					</Button>
				</Button.Group>
			</VStack>
		</BaseLayout>
	);
};

export default CreateGroup;
