import { Box, StatusBar, View, Flex } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';

const BaseLayout = ({ children, isWhite }) => {
	return (
		<Box>
			{!isWhite ? (
				<LinearGradient colors={['#E29BEE', '#B4B4EC']}>
					<Box justifyContent="start" alignItems="center">
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
				</LinearGradient>
			) : (
				<Box>
					<Box justifyContent="start" alignItems="center">
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
				</Box>
			)}
		</Box>
	);
};

export default BaseLayout;
