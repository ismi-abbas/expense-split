import { Center, Button, Modal, FormControl, Input, Heading, Text } from 'native-base';
import { useModal } from '../context/ModalProvider';

const RecordModal = ({ navigation, route }) => {
	const { record } = route.params;
	console.log(record);

	const closeModal = () => {
		navigation.goBack();
	};

	return (
		<Center>
			<Modal isOpen={true} onClose={closeModal}>
				<Modal.Content maxWidth="400px">
					<Heading mt={10} size="md" alignSelf="center">
						{record?.expenseTitle ? record.expenseTitle : 'Test'}
					</Heading>
					<Modal.Body>
						<Text>{record.amount}</Text>
					</Modal.Body>
					<Modal.Footer>
						<Button.Group space={2}>
							<Button variant="ghost" colorScheme="blueGray" onPress={closeModal}>
								Cancel
							</Button>
							<Button onPress={closeModal}>Save</Button>
						</Button.Group>
					</Modal.Footer>
				</Modal.Content>
			</Modal>
		</Center>
	);
};

export default RecordModal;
