import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Drawer, DrawerContent, DrawerOverlay, Grid, GridItem, Heading, HStack, Show, VStack } from '@chakra-ui/react';
import { pathNameToHeading } from './utils/helpers';
import { HamburgerIcon } from '@chakra-ui/icons';
import FSDrawer from './components/FSDrawer';

const App: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [authInit, setInit] = useState(false);
	const navigate = useNavigate();
	const { pathname } = useLocation()

	


	return (
		<Grid
			h='100%'
			w='100vw'
			position='fixed'
			templateRows='repeat(10, 1fr)'
			templateColumns='repeat(12, 1fr)'
		>
			<Show above='lg'>
				<GridItem minW='250px' rowSpan={11} colSpan={2}>
					<FSDrawer onClick={() => setIsOpen(false)} />
				</GridItem>
			</Show>
			<GridItem px='2' display='flex' alignItems='center' rowSpan={1} colSpan={[12, 12, 12, 10]}>
				<HStack justifyContent='space-between' w='100%'>
					<Heading size='lg'>
						{pathNameToHeading(pathname)}
					</Heading>
					<Show below='lg'>
						<HamburgerIcon onClick={() => setIsOpen(true)} boxSize='10' color='teal' />
					</Show>

				</HStack>
			</GridItem>
			<GridItem overflowY='scroll' px='2' py='4' rowSpan={9} colSpan={[12, 12, 12, 10]}>
				<Outlet />
			</GridItem>
			<Drawer
				isOpen={isOpen}
				placement='left'
				onClose={() => setIsOpen(false)}
			>
				<DrawerOverlay />
				<DrawerContent>
					<FSDrawer onClick={() => setIsOpen(false)} />
				</DrawerContent>
			</Drawer>
		</Grid>
	);
}


export default App;
