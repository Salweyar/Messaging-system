import React, { useEffect} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import fire from '../../Common/lib/firebase';

const Authorized  = (props) => {
	const history = useHistory();
	const location = useLocation();
	useEffect(() => {
		 fire.auth().onAuthStateChanged(user => {
			if(!user){
				history.replace(`/signin?return=${escape(location.pathname)}`);
			}else{
				if(user.emailVerified){
					history.push("/")
				}else{
					// history.replace(`/signin?return=${escape(location.pathname)}`);
					history.push("/verify-email")
				}
				
				console.log(user.emailVerified)
			}
		})
		

	// history.replace(`/signin?return=${escape(location.pathname)}`);		

	   
	}, []);

	return props.children
};

export default Authorized;