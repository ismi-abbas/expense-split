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
	useToast,
	VStack,
	PresenceTransition,
} from 'native-base';
import { Icon } from '@rneui/base';
import { supabase } from '../lib/supabase';
import { useFocusEffect } from '@react-navigation/native';
import { useLogin } from '../context/LoginProvider';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const AddBill = () => {
	const { userDetails } = useLogin();
	const [splitType, setSplitType] = useState();
	const [groupList, setGroupList] = useState([]);
	const [selectedGroup, setSelectedGroup] = useState();
	const [groupMember, setGroupMember] = useState([]);
	const [selectedGroupMember, setSelectedGroupMember] = useState([]);
	const [itemName, setItemName] = useState('');
	const [totalAmount, setTotalAmount] = useState();
	const [equalSplit, setEqualSplit] = useState(0);
	const [isHidden, setIsHidden] = useState(true);

	const toast = useToast();

	useEffect(() => {
		loadAllGroup();
	}, []);

	useFocusEffect(
		useCallback(() => {
			loadAllGroup();
			clearField();
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
				username:
					member.users.username === userDetails.username
						? 'Myself'
						: member.users.username,
				is_selected: false,
			}));
			setGroupMember(formattedMembers);
		}

		if (error) console.log(error);
	};

	const updateSelectedMember = (is_selected, selectedMember) => {
		if (!totalAmount) {
			toast.show({
				title: 'Please put the total amount',
			});
			return;
		}

		// set to null if no selected member
		const updatedMembers = groupMember.map((member) => {
			if (member.user_id === selectedMember.user_id) {
				if (!is_selected) {
					return { ...member, is_selected, amountToPay: null };
				}
				return { ...member, is_selected };
			}
			return member;
		});

		const selectedGroupMember = updatedMembers.filter((member) => member.is_selected);

		if (splitType === 'equal') {
			const splittedAmount = (totalAmount / selectedGroupMember.length || 0).toFixed(2);

			selectedGroupMember.map((member) => {
				member.amountToPay = splittedAmount;
			});

			setEqualSplit(splittedAmount);
		}

		setSelectedGroupMember(selectedGroupMember);
		setGroupMember(updatedMembers);
	};

	const changeSplitAmount = (member, value) => {
		const updatedMembers = groupMember.map((m) => {
			if (m.user_id === member.user_id) {
				return { ...m, amountToPay: value };
			}
			return m;
		});

		setSelectedGroupMember(updatedMembers.filter((m) => m.is_selected));
		setGroupMember(updatedMembers);
	};

	const cancelCreate = () => {
		clearField();
	};

	const clearField = () => {
		setItemName(null);
		setTotalAmount(null);
		setSplitType('');
		setSelectedGroup(null);
		setIsHidden(true);
		setGroupMember([]);
	};

	const saveBill = async () => {
		if (!selectedGroup || !itemName || !totalAmount) {
			toast.show({
				title: 'Please fill all the required fields',
			});
			return;
		}

		try {
			const { data: expenseData, error: expenseError } = await supabase
				.from('expenses')
				.insert({
					description: itemName,
					group_id: selectedGroup.group_id,
					paid_by: userDetails?.user_id,
					status: 'Pending',
					total_amount: totalAmount,
					created_by: userDetails?.user_id,
				})
				.select('expense_id')
				.single();

			if (expenseError) {
				toast.show({
					title: 'Error creating expense',
				});
				return;
			}

			if (expenseData) {
				const dataToInsert = selectedGroupMember.map((member) => ({
					amount: member.amountToPay,
					expense_id: expenseData.expense_id,
					pending_from: member.user_id,
					status: member.user_id === userDetails.user_id ? 'settled' : 'unsettled',
					paid_by: userDetails.user_id,
				}));

				const { data: insertData, error: insertError } = await supabase
					.from('expense_participants')
					.insert(dataToInsert)
					.select();

				if (insertError) {
					toast.show({
						title: 'Error inserting expense participants',
					});
					return;
				}

				if (insertData) {
					toast.show({
						title: 'Bill added to expense',
					});
					clearField();
				}
			}
		} catch (error) {
			console.error('Error in saveBill:', error);
			toast.show({
				title: 'An error occurred while saving the bill',
			});
		}
	};

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
											bg: 'purple.200',
											endIcon: <CheckIcon size="5" />,
										}}
										mt={1}
										size="md"
										onValueChange={(itemValue) => {
											setIsHidden(false);
											setSplitType(itemValue);
										}}
									>
										<Select.Item label="Split equally" value="equal" />
										<Select.Item label="Split unequally" value="unequal" />
									</Select>
								</Box>
							</Flex>
							<PresenceTransition
								visible={!isHidden}
								initial={{
									opacity: 0,
								}}
								animate={{
									opacity: 1,
									transition: {
										duration: 250,
									},
								}}
							>
								<VStack
									w="300px"
									bgColor="white"
									rounded="md"
									justifyContent="center"
									py={2}
									px={4}
									space={1}
									shadow={1}
								>
									<Text>Split Type: {splitType}</Text>
									{groupMember?.map((member) => (
										<Flex
											key={member.user_id}
											direction="row"
											alignItems="center"
											justifyContent="space-between"
											w="full"
										>
											<BouncyCheckbox
												fillColor="purple"
												onPress={(isChecked) => {
													updateSelectedMember(
														isChecked,
														member,
														splitType
													);
												}}
												text={member.username}
												textStyle={{
													textDecorationLine: 'none',
												}}
											/>
											<Input
												isDisabled={splitType === 'equal'}
												value={member?.amountToPay?.toString()}
												placeholder="$"
												onChangeText={(value) =>
													changeSplitAmount(member, value)
												}
												w="100px"
											/>
										</Flex>
									))}
								</VStack>
							</PresenceTransition>
						</Stack>
					</Flex>

					<Flex alignItems="center" mt={4}>
						<Box w="300px">
							{splitType === 'equal' ? (
								<Text textAlign="center" fontSize="md">
									You lent ${equalSplit * (selectedGroupMember?.length - 1) ?? 0}{' '}
									to the other {selectedGroupMember?.length - 1}{' '}
									{selectedGroupMember?.length - 1 <= 1 ? 'member' : 'members'} of
									your group equally
								</Text>
							) : (
								<Text fontSize="md" textAlign="center">
									Amount splitted between group members as abovee
								</Text>
							)}
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
