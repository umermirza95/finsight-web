import React, { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const App: React.FC = () => {
	const navigate = useNavigate();
	useEffect(() => {
		onAuthStateChanged(getAuth(), user => {
			if(!user){
				navigate("/login")
			}
		})
	}, [])

	return (
		<h1>hello</h1>
	);
}


export default App;
