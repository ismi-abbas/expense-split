import { Box, StatusBar, View, Flex } from 'native-base';

const BaseLayout = ({ children, bgColor }) => {
	return (
		<Box bg={bgColor} justifyContent="start" alignItems="center">
			<StatusBar barStyle={'default'} />
			<Flex
				mt={4}
				h="full"
				_ios={{
					w: '380px',
				}}
				_android={{
					w: '350px',
				}}
			>
				{children}
			</Flex>
		</Box>
	);
};

export default BaseLayout;
