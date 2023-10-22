import { Text, Box } from 'native-base';
import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';

const SelectableBox = ({ value, selectColour }) => {
	const [selected, setSelected] = useState(false);

	const toggleSelection = () => {
		setSelected(!selected);
	};

	const boxStyle = selected ? styles.selectedBox : styles.unselectedBox;
	const iconStyle = selected ? styles.selectedIcon : styles.unselectedIcon;

	return (
		<TouchableOpacity onPress={toggleSelection}>
			<Box bg="purple.200">
				<View style={[styles.box, boxStyle]}>
					<Text>{value}</Text>
					{selected}
				</View>
			</Box>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	box: {
		backgroundColor: '#E5E5E5',
		borderRadius: 20,
		padding: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	selectedBox: {
		borderColor: 'purple',
		borderWidth: 1,
	},
	unselectedBox: {},
	selectedIcon: {
		color: 'green',
	},
	unselectedIcon: {},
});

export default SelectableBox;
