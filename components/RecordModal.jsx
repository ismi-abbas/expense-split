import { Center, Button, Modal, Heading, Text, VStack, Stack, Flex, Box } from 'native-base';
import { formatDate } from '../lib/methods';
import { Icon } from '@rneui/themed';
import { supabase } from '../lib/supabase';
import { useLogin } from '../context/LoginProvider';
import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';

const RecordModal = ({ navigation, route }) => {
	const [expenseDetails, setExpenseDetails] = useState();
	const isFocused = useIsFocused();

	useEffect(() => {
		fetchData();
	}, [isFocused]);

	const { userDetails } = useLogin();
	const { record } = route.params;

	const closeModal = () => {
		navigation.goBack();
	};

	const fetchData = async () => {
		const { data, error } = await supabase
			.from('expense_participants')
			.select(
				`
			status, 
			amount, 
			pending_from, 
			paid_by, 
			users(username), 
			expenses(description, created_by, created_at, status)`
			)
			.eq('expense_id', record.expense_id)
			.eq('pending_from', userDetails.user_id)
			.single();
		if (error) {
			console.log(error);
		}
		console.log(data);

		setExpenseDetails(data);
	};

	const settleUp = async () => {
		const { status } = await supabase
			.from('expense_participants')
			.update({
				status: 'settled',
			})
			.eq('expense_id', record.expense_id)
			.eq('pending_from', userDetails.user_id);

		const { data, error } = await supabase.from('transactions').insert({
			amount: record.total_amount,
			expense_id: record.expense_id,
			payee_id: record.created_by,
			payer_id: userDetails.user_id,
		});

		if (data) console.log({ data });
		if (error) {
			console.log(error);
		}
	};

	return (
		<Center>
			<Modal isOpen={true} onClose={closeModal}>
				<Modal.Content width="400px" alignItems="center" py={10}>
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
							{record?.description ? record.description : 'Settlement'}
						</Heading>
					</Stack>
					<Flex alignItems="center" mt={2} maxW="320px">
						<Text fontSize="lg" fontWeight="medium">
							Total bill amount: ${record.total_amount}
						</Text>

						<Stack space={2} mt={4}>
							<Text fontSize="md">Bill Creator: {record.creator_name}</Text>
							<Text fontSize="md">
								Bill Created on {formatDate(record.created_at)}
							</Text>
							<Text fontSize="md">
								Divided by {record.participant_count},{' '}
								<Text fontSize="md" color="red.500">
									you owe ${expenseDetails?.amount}{' '}
								</Text>
								for this expense
							</Text>
						</Stack>
					</Flex>
					<VStack mt={4} alignItems="center">
						<Button.Group space={10}>
							<Button
								w={'1/3'}
								colorScheme="purple"
								rounded="full"
								onPress={settleUp}
							>
								Settle Up
							</Button>
							<Button
								w={'1/3'}
								rounded="full"
								colorScheme="purple"
								onPress={closeModal}
							>
								Close
							</Button>
						</Button.Group>
					</VStack>
				</Modal.Content>
			</Modal>
		</Center>
	);
};

export default RecordModal;
