import React, { useCallback, useEffect, useState } from 'react';
import BaseLayout from '../components/BaseLayout';
import { Box, Center, Flex, Pressable, ScrollView, Text, Stack } from 'native-base';
import { Icon } from '@rneui/base';
import { supabase } from '../lib/supabase';
import { useFocusEffect } from '@react-navigation/native';

const Group = ({ navigation }) => {
	const [groups, setGroups] = useState();
	const [allExpense, setAllExpenses] = useState();

	const getAllGroups = async () => {
		const { data, error } = await supabase.from('groups').select('*');

		if (data) {
			setGroups(data);
		}

		if (error) {
			console.log(error);
		}
	};

	// fetch group everytime the view group open
	useFocusEffect(
		useCallback(() => {
			getAllGroups();
			getAllExpense();
		}, [])
	);

	const getAllExpense = async () => {
		const { data, err } = await supabase.from('expenses').select('*');

		if (data) {
			console.log(data);
		}

		if (err) {
			console.log(err);
		}
	};

	return (
		<BaseLayout bgColor="purple.200">
			<Box safeAreaTop={true}>
				<Box>
					<Text fontSize="2xl" fontWeight="bold">
						Overall
					</Text>
					<Text fontSize="2xl" fontWeight="bold">
						You are owed $22.80
					</Text>
					<Text fontSize="2xl" fontWeight="bold">
						You owe $1.80
					</Text>
				</Box>

				<Flex
					mt={6}
					direction="row"
					justifyContent="space-between"
					alignItems="center"
					w="full"
				>
					<Text fontSize="2xl" fontWeight="bold">
						My groups
					</Text>
					<Pressable
						onPress={() => navigation.navigate('CreateGroup', { title: 'Test' })}
					>
						<Icon size={30} name="plus-circle" type="feather" />
					</Pressable>
				</Flex>

				<ScrollView horizontal={true} showsHorizontalScrollIndicator={false} mt={4}>
					<Stack direction="row" space={2}>
						{groups?.map((group) => (
							<Pressable
								key={group.group_id}
								bg="white"
								rounded="xl"
								shadow={1}
								_pressed={{
									bg: 'light.200',
								}}
								onPress={() =>
									navigation.navigate('ViewGroup', {
										title: group.group_name,
										data: group,
									})
								}
							>
								<Box>
									<Center
										w={'32'}
										h={'32'}
										_text={{
											fontSize: 'lg',
											fontWeight: 'bold',
											textAlign: 'center',
										}}
									>
										{group.group_name}
										<Text>{group.totalBill ?? 'not exist'} bills</Text>
										<Text>
											{group.totalMember ?? 'not exist'}{' '}
											{/* {group.totalMember > 1 ? 'members' : 'member'} */}
										</Text>
									</Center>
								</Box>
							</Pressable>
						))}
					</Stack>
				</ScrollView>

				<Flex
					mt={6}
					direction="row"
					justifyContent="space-between"
					alignItems="center"
					w="full"
				>
					<Text fontSize="2xl" fontWeight="bold">
						Settled up groups
					</Text>
					<Pressable onPress={() => alert('hidden')}>
						<Text fontSize="md" fontWeight="bold">
							Hide
						</Text>
					</Pressable>
				</Flex>

				<ScrollView horizontal={true} showsHorizontalScrollIndicator={false} mt={4}>
					<Stack direction="row" space={2}>
						{groups?.map((group) => (
							<Pressable
								key={group.group_id}
								bg="white"
								rounded="xl"
								shadow={1}
								_pressed={{
									bg: 'light.200',
								}}
							>
								<Box>
									<Center
										w={'32'}
										h={'32'}
										_text={{
											fontSize: 'lg',
											fontWeight: 'bold',
											textAlign: 'center',
										}}
									>
										{group.group_name ?? 'asdas'}
										<Text>{group.totalBill ?? 'asdasd'} bills</Text>
										<Text>
											{group.totalMember ?? 'asdasd'}{' '}
											{group.totalMember > 1 ? 'members' : 'member'}
										</Text>
									</Center>
								</Box>
							</Pressable>
						))}
					</Stack>
				</ScrollView>
			</Box>
		</BaseLayout>
	);
};

export default Group;
