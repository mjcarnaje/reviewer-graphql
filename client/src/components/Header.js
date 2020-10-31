import React from 'react';
import { Box, Heading, Flex, Text, Button } from '@chakra-ui/core';
import { Link } from 'react-router-dom';

const MenuItems = ({ children, to }) => (
	<Link to={to}>
		<Text display='block' fontFamily='inter'>
			{children}
		</Text>
	</Link>
);

const Header = (props) => {
	const [show, setShow] = React.useState(false);
	const handleToggle = () => setShow(!show);

	return (
		<Flex
			as='nav'
			align='center'
			justify='space-between'
			wrap='wrap'
			height='4rem'
			paddingY='.75rem'
			paddingX='2rem'
			color='purple.500'
			position='absolute'
			bg='white'
			top='0'
			left='0'
			width='100%'
			shadow='sm'
		>
			<Flex align='center' mr={5}>
				<Heading as='h1' size='lg' fontWeight='sm' fontFamily='berkshire'>
					QuizShare
				</Heading>
			</Flex>

			<Box display={{ base: 'block', md: 'none' }} onClick={handleToggle}>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='24'
					height='24'
					viewBox='0 0 24 24'
				>
					<path d='M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z' />
				</svg>
			</Box>

			<Box
				display={{ base: show ? 'block' : 'none', md: 'flex' }}
				width={{ base: 'full', md: 'auto' }}
				alignItems='center'
				flexGrow={1}
			>
				<MenuItems to='/home'>Home</MenuItems>
			</Box>

			<Box
				display={{ base: show ? 'flex' : 'none', md: 'block' }}
				flexDirection={{ base: show ? 'column' : '' }}
				mt={{ base: 4, md: 0 }}
				width={{ base: 'full', md: 'auto' }}
				fontFamily='inter'
			>
				<Link to='/register'>
					<Button
						bg='transparent'
						border='1px'
						fontSize='15px'
						mt={{ base: 4, md: 0 }}
						mr={6}
						padding='1rem'
						size='sm'
					>
						Sign Up
					</Button>
				</Link>
				<Link to='/login'>
					<Button
						bg='transparent'
						border='1px'
						fontSize='15px'
						mt={{ base: 4, md: 0 }}
						mr={6}
						padding='1rem'
						size='sm'
					>
						Log in
					</Button>
				</Link>
			</Box>
		</Flex>
	);
};

export default Header;