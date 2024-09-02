import React, { useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { Outlet, useNavigate } from 'react-router-dom';
import Page from './components/Page';

const App: React.FC = () => {
	const navigate = useNavigate();
	useEffect(() => {
		onAuthStateChanged(getAuth(), user => {
			if(!user){
				console.log("redirecting")
				//navigate("/login")
			}
		})
	}, [])

	return (
		<Page>
			<Outlet/>
		</Page>
	);
}


export default App;
