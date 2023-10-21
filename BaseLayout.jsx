import { Box, StatusBar, View } from 'native-base';

const BaseLayout = ({ children, bgColor }) => {
	return (
		<Box safeAreaTop bg={bgColor}>
			<StatusBar barStyle={'light-content'} />
			<View mt={2} alignSelf="center" paddingX={10} h="full">
				{children}
			</View>
		</Box>
	);
};

export default BaseLayout;
