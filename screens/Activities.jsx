import { Box, Flex, Heading, Text, FlatList, Button } from 'native-base';
import { Icon } from '@rneui/base';
import BaseLayout from '../components/BaseLayout';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useLogin } from '../context/LoginProvider';
import { RefreshControl } from 'react-native';

function Activities() {
	const [activities, setActivities] = useState([]);
	const [refreshing, setRefreshing] = useState(false);

	const { userDetails } = useLogin();

	useEffect(() => {
		fetchActivities();
		console.log('userDetails ==========>', userDetails);
	}, []);

	const onRefresh = () => {
		setRefreshing(true);
		fetchActivities();
		setRefreshing(false);
	};

	async function fetchActivities() {
		const { data, error } = await supabase.from('activities').select();

		if (data) {
			console.log(data);
			setActivities(data);
		}

		if (error) {
			console.log(error);
		}
	}

	return (
		<BaseLayout>
			<Flex mb={20} safeAreaTop={true}>
				<Flex alignItems="start" alignContent="center">
					<Heading>Activities</Heading>
				</Flex>

				<FlatList
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
					}
					mt={5}
					data={activities}
					renderItem={({ item: activity }) => (
						<Flex
							direction="row"
							rounded="lg"
							p={2}
							bg="light.50"
							alignItems="center"
							my={1}
						>
							<Flex direction="row" alignItems="center" justifyContent="center" p={4}>
								<ActivityIcon type={activity.activity_type} />
							</Flex>
							<TransactionDetails activity={activity} />
						</Flex>
					)}
					keyExtractor={(activity) => activity.activity_id}
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

	switch (activity.activity_type) {
		case 'transaction':
			return (
				<Box>
					<Text fontSize="lg" fontWeight="bold" color="green.800">
						{activity.status === 'success' ? 'Successful !' : 'Pending'}
					</Text>
					<Text>{activity.activity_description}</Text>
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
		case 'group_request':
			return (
				<Box>
					<Text fontSize="lg" fontWeight="bold" color="green.800">
						Group Request
					</Text>
					<Text>{activity.activity_description}</Text>
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
		case 'group_request':
			return <Icon name="users" type="feather" color="black" size={36} />;
		default:
			return <Icon name="check-circle" type="feather" color="black" size={36} />;
	}
}

export default Activities;
