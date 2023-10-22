import {
	Text,
	Box,
	Heading,
	Input,
	FormControl,
	ScrollView,
	Button,
	HStack,
	VStack,
	TextArea,
	IconButton,
} from 'native-base';
import React, { useState } from 'react';
import BaseLayout from '../components/BaseLayout';
import { Icon } from '@rneui/base';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const type = [
	{
		name: 'Trip',
		value: 'trip',
	},
	{
		name: 'Home',
		value: 'home',
	},
	{
		name: 'Couple',
		value: 'couple',
	},
	{
		name: 'Work',
		value: 'work',
	},
];

const selectedMembers = [
	{
		name: 'Jack',
		id: 1,
		sex: 'male',
	},
	{
		name: 'Miller',
		id: 2,
		sex: 'female',
	},
	{
		name: 'OD',
		id: 3,
		sex: 'female',
	},
	{
		name: 'Pixel',
		id: 4,
		sex: 'male',
	},
];

const CreateGroup = () => {
	const [selectedValue, setSelectedValue] = useState(null);
	const [selectedMember, setSelectedMember] = useState(null);

	const toggleSelection = (value) => {
		setSelectedValue(value);
	};

	const selectMember = (value) => {
		setSelectedMember(value);
	};
	console.log(selectedValue);
	return (
		<BaseLayout>
			<VStack space={4}>
				<Box>
					<Heading textAlign="center">Create Group</Heading>
				</Box>

				<Box>
					<FormControl.Label
						_text={{
							color: 'black',
						}}
					>
						Group Name
					</FormControl.Label>
					<Input variant="outline" rounded="full" size="lg" borderColor="black" />
				</Box>

				<Box mt={3}>
					<FormControl.Label
						_text={{
							color: 'black',
						}}
					>
						Type
					</FormControl.Label>
					<ScrollView horizontal showsHorizontalScrollIndicator={false}>
						<HStack space={2}>
							{type.map((item, index) => (
								<Button
									key={item.value}
									w="100px"
									variant="subtle"
									colorScheme="purple"
									rounded="full"
									onPress={() => toggleSelection(item.value)}
									borderColor={
										selectedValue === item.value ? 'purple.500' : 'purple.100'
									}
									borderWidth={1}
								>
									{item.name}
								</Button>
							))}
						</HStack>
					</ScrollView>
				</Box>

				<Box>
					<FormControl.Label
						_text={{
							color: 'black',
						}}
					>
						Group Description
					</FormControl.Label>
					<TextArea borderColor="black" rounded="xl" h={20} />
				</Box>

				<Box>
					<FormControl.Label
						_text={{
							color: 'black',
						}}
					>
						Select Members
					</FormControl.Label>
					<HStack space={2}>
						{selectedMembers.map((member) => (
							<IconButton
								colorScheme="indigo"
								variant="subtle"
								w={16}
								h={16}
								rounded="full"
								_icon={{
									as: MaterialCommunityIcons,
									name: `${member.sex == 'male' ? 'face-man' : 'face-woman'}`,
								}}
								borderColor={
									selectedValue === member.id ? 'purple.500' : 'purple.100'
								}
								borderWidth={1}
								onPress={() => toggleSelection(member.id)}
							/>
						))}
					</HStack>
				</Box>

				<Button.Group direction="column" mt={6} alignItems="center">
					<Button
						w="300px"
						rounded="full"
						colorScheme="purple"
						_text={{
							fontWeight: 'bold',
						}}
					>
						Create Group
					</Button>
					<Button
						w="300px"
						rounded="full"
						colorScheme="purple"
						_text={{
							fontWeight: 'bold',
						}}
					>
						Cancel
					</Button>
				</Button.Group>
			</VStack>
		</BaseLayout>
	);
};

export default CreateGroup;
