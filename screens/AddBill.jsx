import { useState } from 'react';
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

const AddBill = () => {
	const [service, setService] = useState('');
	const [isSelected, setIsSelected] = useState();

	const cancelCreate = () => {
		console.log('cancelCreate');
	};

	const saveBill = () => {
		console.log('saveBill');
	};

	return (
		<BaseLayout bgColor="purple.200">
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
							{groups.map((group, index) => (
								<Pressable
									mr={2}
									mb={2}
									key={index}
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
								>
									<Center height={100} w={100} rounded="2xl" p={2}>
										<Text fontSize="md" fontWeight="bold" textAlign="center">
											{group}
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
									underlineColorAndroid="purple.400"
									ml={4}
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
										selectedValue={service}
										placeholder="Choose type"
										_selectedItem={{
											bg: 'teal.200',
											endIcon: <CheckIcon size="5" />,
										}}
										mt={1}
										size="md"
										onValueChange={(itemValue) => setService(itemValue)}
									>
										<Select.Item label="Split equally" value="equal" />
										<Select.Item label="Web Development" value="web" />
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
