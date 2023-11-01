import { useCallback, useEffect, useState } from 'react';
import BaseLayout from '../components/BaseLayout';
import {
	Text,
	View,
	Heading,
	Box,
	Center,
	Pressable,
	Stack,
	Flex,
	Input,
	Select,
	CheckIcon,
	Button,
} from 'native-base';
import { Icon } from '@rneui/base';
import { supabase } from '../lib/supabase';
import { useFocusEffect } from '@react-navigation/native';
import { useLogin } from '../context/LoginProvider';

const AddBill = () => {
	const { userDetails } = useLogin();
	const [splitType, setSplitType] = useState('');
	const [groupList, setGroupList] = useState([]);
	const [selectedGroup, setSelectedGroup] = useState();
	const [groupMember, setGroupMember] = useState([]);
	const [itemName, setItemName] = useState('');
	const [totalAmount, setTotalAmount] = useState(0);
	const [equalSplit, setEqualSplit] = useState(0);

	useFocusEffect(
		useCallback(() => {
			loadAllGroup();
		}, [])
	);

	const loadAllGroup = async () => {
		const { data, error } = await supabase.from('groups').select(`
		group_id, 
		group_name, 
		created_at, 
		group_description, 
		created_by, 
		group_type,
		expenses(total_amount, description, expense_type, status, created_at, created_by),
		group_members(user_id, role),
		users(username, email, gender)`);

		const filteredGroups = data.filter((group) =>
			group.group_members.some((member) => member.user_id === userDetails?.user_id)
		);

		if (filteredGroups) setGroupList(filteredGroups);
		if (error) console.log(error);
	};

	const handleSelectGroup = async (group) => {
		setSelectedGroup(group);
		const { data: groupMembers, error } = await supabase
			.from('group_members')
			.select(`user_id, users(username)`)
			.eq('group_id', group.group_id);

		if (groupMembers) {
			const formattedMembers = groupMembers.map((member) => ({
				user_id: member.user_id,
				username: member.users.username,
			}));
			setGroupMember(formattedMembers);
		}

		if (error) console.log(error);
	};

	const handleSplit = (type) => {
		setSplitType(type);

		if (type === 'equal') {
			const splittedAmount = (totalAmount / groupMember.length).toFixed(2);
			setEqualSplit(splittedAmount);
			setGroupMember(
				groupMember.map((member) => ({ ...member, amountToPay: splittedAmount }))
			);
		} else {
			console.log('Split inequally');
		}
	};

	useEffect(() => {
		loadAllGroup();
	}, []);

	const cancelCreate = () => console.log('cancelCreate');
	const saveBill = () => console.log('saveBill');

	return (
		<BaseLayout>
			<Box safeAreaTop={true}>
				<View>
					<Heading textAlign="center">Create a bill</Heading>
					<Box mt={4}>
						<Text fontSize="lg" fontWeight="medium">
							Select a group
						</Text>
						<Flex
							w="350px"
							direction="row"
							wrap="wrap"
							alignItems="center"
							justifyContent="flex-start"
						>
							{groupList.map((group) => (
								<Pressable
									key={group.group_id}
									_focus={{
										bg: 'light.50',
										borderWidth: 4,
										borderColor: 'black',
									}}
									m={1}
									bg="white"
									rounded="xl"
									onPress={() => {
										handleSelectGroup(group);
									}}
									borderColor="purple.800"
									borderWidth={selectedGroup == group ? 2 : 0}
								>
									<Center height={100} w={100} rounded="2xl" p={2}>
										<Text fontSize="md" fontWeight="bold" textAlign="center">
											{group.group_name}
										</Text>
									</Center>
								</Pressable>
							))}
						</Flex>
					</Box>
					<Flex direction="row" py={6} rounded="xl" mt={2}>
						<Stack space={4} w="75%" mx="auto" pr={10}>
							<Flex direction="row" w="100%" maxW="300px" alignItems="center">
								<Box bg="light.50" p={1} rounded="md">
									<Icon
										size={40}
										name="credit-card-check-outline"
										type="material-community"
										color="black"
									/>
								</Box>
								<Input
									borderColor="purple.800"
									focusOutlineColor="purple.700"
									size="md"
									variant="underlined"
									placeholder="Enter item"
									colorScheme="purple"
									ml={4}
									placeholderTextColor="black"
									value={itemName}
									onChangeText={(name) => setItemName(name)}
								/>
							</Flex>
							<Flex direction="row" w="100%" maxW="300px" alignItems="center">
								<Box bg="light.50" p={1} rounded="md">
									<Icon
										size={40}
										name="credit-card-check-outline"
										type="material-community"
										color="black"
									/>
								</Box>
								<Input
									type="number"
									borderColor="purple.800"
									focusOutlineColor="purple.700"
									size="md"
									variant="underlined"
									placeholder="Price"
									keyboardType="numeric"
									colorScheme="purple"
									ml={4}
									placeholderTextColor="black"
									value={totalAmount}
									onChangeText={(price) => setTotalAmount(price)}
								/>
							</Flex>
							<Flex direction="row" w="full" alignItems="center">
								<Box bg="light.50" p={1} rounded="md">
									<Icon
										size={40}
										name="credit-card-check-outline"
										type="material-community"
										color="black"
									/>
								</Box>
								<Box w="full" ml={4}>
									<Select
										bg="white"
										borderColor="purple.800"
										colorScheme="purple"
										variant="rounded"
										selectedValue={splitType}
										placeholder="Choose type"
										_selectedItem={{
											bg: 'teal.200',
											endIcon: <CheckIcon size="5" />,
										}}
										mt={1}
										size="md"
										onValueChange={(itemValue) => handleSplit(itemValue)}
									>
										<Select.Item label="Split equally" value="equal" />
										<Select.Item label="Split inequally" value="inequal" />
									</Select>
								</Box>
							</Flex>
						</Stack>
					</Flex>
					<Flex alignItems="center" mt={4}>
						<Box w="300px">
							<Text textAlign="center" fontSize="md">
								You lent ${equalSplit} to the other {groupMember.length} members of
								your group equally
							</Text>
						</Box>
					</Flex>
					<Flex alignItems="center" mt={6}>
						<Button.Group space={4}>
							<Button
								variant="subtle"
								rounded="full"
								w="100px"
								colorScheme="purple"
								_text={{ fontSize: 'md', fontWeight: 'bold' }}
								onPress={cancelCreate}
							>
								Cancel
							</Button>
							<Button
								variant="subtle"
								rounded="full"
								w="100px"
								colorScheme="purple"
								_text={{ fontSize: 'md', fontWeight: 'bold' }}
								onPress={saveBill}
							>
								Save
							</Button>
						</Button.Group>
					</Flex>
				</View>
			</Box>
		</BaseLayout>
	);
};

export default AddBill;
