import { useEffect, useState } from 'react';
import { groups } from '../DummyData';
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
import { G } from 'react-native-svg';

const AddBill = () => {
	const [splitType, setSplitType] = useState('');
	const [isSelected, setIsSelected] = useState();
	const [groupList, setGroupList] = useState([]);
	const [selectedGroup, setSelectedGroup] = useState();
	const [groupMember, setGroupMember] = useState([]);
	const [itemName, setItemName] = useState('');
	const [itemPrice, setItemPrice] = useState(0);

	const loadAllGroup = async (groupId) => {
		const { data, error } = await supabase.from('groups').select('*');

		if (data) {
			setGroupList(data);
			console.log(data);
		}
	};

	const handleSplit = (type) => {
		setSplitType(type);

		if (type === 'equal') {
			console.log('Split equally');
		} else {
			console.log('Split inequally');
		}
		// load popup with group members here
		// handle how the amount should be split
	};

	const loadGroupMembers = async (groupId) => {
		const { data, error } = await supabase
			.from('group_members')
			.select('')
			.eq('group_id', groupId);
		if (data) {
			console.log(data);
			setGroupMember(data);
		}
	};

	useEffect(() => {
		loadAllGroup();
	}, []);

	const cancelCreate = () => {
		console.log('cancelCreate');
	};

	const saveBill = () => {
		console.log('saveBill');
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
									mr={2}
									mb={2}
									key={group.group_id}
									_focus={{
										bg: 'light.50',
										borderWidth: 4,
										borderColor: 'black',
									}}
									bg="white"
									rounded="xl"
									_pressed={{
										bg: 'purple.300',
									}}
									onPress={() => {
										setSelectedGroup(group);
									}}
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
									type="text"
									borderColor="purple.800"
									focusOutlineColor="purple.700"
									size="md"
									variant="underlined"
									placeholder="Enter item"
									colorScheme="purple"
									ml={4}
									placeholderTextColor="black"
									value={itemName}
									onChange={(name) => setItemName(name)}
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
									value={itemPrice}
									onChange={(price) => setItemName(price)}
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
								You lent $50 to the other 5 members of your group equally
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
								_text={{
									fontSize: 'md',
									fontWeight: 'bold',
								}}
								onPress={cancelCreate}
							>
								Cancel
							</Button>
							<Button
								variant="subtle"
								rounded="full"
								w="100px"
								colorScheme="purple"
								_text={{
									fontSize: 'md',
									fontWeight: 'bold',
								}}
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
