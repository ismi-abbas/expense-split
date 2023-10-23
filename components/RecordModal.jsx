import { Center, Button, Modal, Heading, Text, VStack, Stack, Flex } from 'native-base';
import { formatDate } from '../lib/methods';
import { Icon } from '@rneui/themed';

const RecordModal = ({ navigation, route }) => {
	const { record } = route.params;
	console.log(record);

	const closeModal = () => {
		navigation.goBack();
	};

	const settleUp = () => {
		console.log('Settled');
	};
	return (
		<Center>
			<Modal isOpen={true} onClose={closeModal}>
				{record.type === 'settlement' ? (
					<SettleMentLayout record={record} closeModal={closeModal} />
				) : (
					<RecordLayout record={record} closeModal={closeModal} settleUp={settleUp} />
				)}
			</Modal>
		</Center>
	);
};

const SettleMentLayout = ({ record, closeModal }) => {
	return (
		<Modal.Content maxWidth="400px" alignItems="center" py={10}>
			<Stack direction="row" space={2}>
				{record.type === 'settlement' ? (
					<Icon
						name="credit-card-check-outline"
						type="material-community"
						color="black"
					/>
				) : (
					<></>
				)}
				<Heading size="md" alignSelf="center">
					{record?.expenseTitle ? record.expenseTitle : 'Settlement'}
				</Heading>
			</Stack>
			<Flex alignItems="center">
				<Text fontSize="lg" fontWeight="medium">
					$ {record.amount}
				</Text>

				<Stack space={2} mt={4}>
					<Text fontSize="md">Bill Creator: {record.createdBy}</Text>
					<Text fontSize="md">Bill made on {formatDate(record.createdDate)}</Text>
					<Text fontSize="md">Settle through: Visa Card</Text>
				</Stack>
			</Flex>

			<Flex alignItems="center" w="full" mt={4}>
				<Button w={'3/5'} rounded="full" colorScheme="purple" onPress={closeModal}>
					Close
				</Button>
			</Flex>
		</Modal.Content>
	);
};

const RecordLayout = ({ record, closeModal, settleUp }) => {
	return (
		<Modal.Content maxWidth="400px" alignItems="center" py={10}>
			<Stack direction="row" space={2}>
				{record.type === 'settlement' ? (
					<Icon
						name="credit-card-check-outline"
						type="material-community"
						color="black"
					/>
				) : (
					<></>
				)}
				<Heading size="md" alignSelf="center">
					{record?.expenseTitle ? record.expenseTitle : 'Settlement'}
				</Heading>
			</Stack>
			<Flex alignItems="center">
				<Text fontSize="lg" fontWeight="medium">
					$ {record.amount}
				</Text>

				<Stack space={2} mt={4}>
					<Text fontSize="md">Bill Creator: {record.createdBy}</Text>
					<Text fontSize="md">Bill Created on {formatDate(record.createdDate)}</Text>
					<Text fontSize="md">
						Divided by 6, {''}
						<Text color="red.500">you awe {record.amount}$</Text>
					</Text>
				</Stack>
			</Flex>
			<VStack mt={4} alignItems="center">
				<Button.Group space={10}>
					<Button w={'1/3'} colorScheme="purple" rounded="full" onPress={settleUp}>
						Settle Up
					</Button>
					<Button w={'1/3'} rounded="full" colorScheme="purple" onPress={closeModal}>
						Close
					</Button>
				</Button.Group>
			</VStack>
		</Modal.Content>
	);
};

export default RecordModal;
