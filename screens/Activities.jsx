import { Box, Flex, Heading, Text, FlatList, Button } from 'native-base';
import { Icon } from '@rneui/base';
import BaseLayout from '../components/BaseLayout';
import { activities } from '../DummyData';

function Activities() {
	return (
		<BaseLayout bgColor="purple.200">
			<Flex mb={20} safeAreaTop={true}>
				<Flex alignItems="start" alignContent="center">
					<Heading>Activities</Heading>
				</Flex>

				<FlatList
					mt={5}
					data={activities}
					renderItem={({ item }) => (
						<Flex
							direction="row"
							rounded="lg"
							p={2}
							bg="light.50"
							alignItems="center"
							my={1}
						>
							<Flex direction="row" alignItems="center" justifyContent="center" p={4}>
								<ActivityIcon type={item.type} />
							</Flex>
							<TransactionDetails activity={item} />
						</Flex>
					)}
					keyExtractor={(item) => item.id}
					showsVerticalScrollIndicator={false}
				/>
			</Flex>
		</BaseLayout>
	);
}

function TransactionDetails({ activity }) {
	const acceptRequest = () => {
		console.log('Friend request accepted');
	};

	const rejectRequest = () => {
		console.log('Friend request rejected');
	};

	switch (activity.type) {
		case 'transaction':
			return (
				<Box>
					<Text fontSize="lg" fontWeight="bold" color="green.800">
						Successful !
					</Text>
					<Text>
						Transaction amount of ${activity.amount} to {activity.transferTo}
					</Text>
				</Box>
			);
		case 'group':
			return (
				<Box>
					<Text fontSize="lg" fontWeight="bold" color="green.800">
						Added to group
					</Text>
					<Text>
						Added to {activity.addedTo} by {activity.addedBy}
					</Text>
				</Box>
			);
		case 'group-request':
			return (
				<Box>
					<Text fontSize="lg" fontWeight="bold" color="green.800">
						Group Request
					</Text>
					<Text>You're requested to join Room 3A-2</Text>
					<Button.Group space={2}>
						<Button
							variant="subtle"
							colorScheme="purple"
							rounded="full"
							size="sm"
							w="80px"
							onPress={acceptRequest}
						>
							Join
						</Button>
						<Button
							variant="subtle"
							colorScheme="purple"
							rounded="full"
							size="sm"
							w="80px"
							onPress={rejectRequest}
						>
							Delete
						</Button>
					</Button.Group>
				</Box>
			);
		default:
			return (
				<Box>
					<Text fontSize="lg" fontWeight="bold" color="green.800">
						Hi !
					</Text>
					<Text>What is this</Text>
				</Box>
			);
	}
}

function ActivityIcon({ type }) {
	switch (type) {
		case 'transaction':
			return (
				<Icon
					name="credit-card-check-outline"
					type="material-community"
					color="black"
					size={36}
				/>
			);
		case 'group':
			return <Icon name="user-check" type="feather" color="black" size={36} />;
		case 'group-request':
			return <Icon name="users" type="feather" color="black" size={36} />;
		default:
			return <Icon name="check-circle" type="feather" color="black" size={36} />;
	}
}

export default Activities;
