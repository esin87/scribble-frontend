import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Logout = (props) => {
	useEffect(() => {
		props.handleLogOut();
		// eslint-disable-next-line
	}, []);
	return (
		<div>
			{' '}
			You are now logged out. Click <Link to='/login'>here</Link> to log back
			in.
		</div>
	);
};

export default Logout;
