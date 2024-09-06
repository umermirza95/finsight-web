import React, { useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Page from './components/Page';
import { Box, Grid, GridItem, Heading, Show } from '@chakra-ui/react';
import { pathNameToHeading } from './utils/helpers';

const App: React.FC = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation()
	useEffect(() => {
		onAuthStateChanged(getAuth(), user => {
			if (!user) {
				console.log("redirecting")
				//navigate("/login")
			}
		})
	}, [])

	return (
		<Grid
			h='100vh'
			templateRows='repeat(10, 1fr)'
			templateColumns='repeat(12, 1fr)'
		>
			<Show above='lg'>
				<GridItem minW='250px' rowSpan={10} colSpan={2} bg='tomato'>
					Finsight
				</GridItem>
			</Show>
			<GridItem boxShadow='base' px='2' display='flex' alignItems='center'  rowSpan={1} colSpan={[12, 12, 12, 10]}>
				<Heading size='lg'>
				{pathNameToHeading(pathname)}
				</Heading>
			</GridItem>
			<GridItem overflowY='scroll' px='2' py='4' rowSpan={9} colSpan={[12, 12, 12, 10]}>
				<Outlet />
			</GridItem>

		</Grid>
	);
}


export default App;
