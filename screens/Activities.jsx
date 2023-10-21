import BaseLayout from '../BaseLayout';
import { Box, Flex, Heading, Text, VStack, View, ScrollView, FlatList } from 'native-base';
import { Icon } from '@rneui/base';
import { activities } from '../DummyData';

const Activities = () => {
	return (
		<BaseLayout bgColor="purple.200">
			<Flex
				w="400px"
				_android={{
					w: '350px',
				}}
				mt={20}
				justifyContent="center"
				maxW="400px">
				<Flex alignItems="start" alignContent="center">
					<Heading>Activities</Heading>
				</Flex>

				<FlatList
					data={activities}
					renderItem={({ item }) => (
						<Flex direction="row" rounded="lg" p={2} bg="light.50" alignItems="center" my={1}>
							<Flex alignItems="center" justifyContent="center" p={4}>
								<ActivityIcon type={item.type} />
							</Flex>
							<TransactionDetails activity={item} />
						</Flex>
					)}
					keyExtractor={item => item.id}
					showsVerticalScrollIndicator={false}
				/>
			</Flex>
		</BaseLayout>
	);
};

const TransactionDetails = ({ activity }) => {
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
						Successful !
					</Text>
					<Text>
						Added to {activity.addedTo} by {activity.addedBy}
					</Text>
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
};

const ActivityIcon = ({ type }) => {
	switch (type) {
		case 'transaction':
			return <Icon name="credit-card-check-outline" type="material-community" color="black" size={36} />;
		case 'group':
			return <Icon name="user-check" type="feather" color="black" size={36} />;
		case 'group-request':
			return <Icon name="user-check" type="feather" color="black" size={36} />;
		default:
			return <Icon name="check-circle" type="feather" color="black" size={36} />;
	}
};

export default Activities;
