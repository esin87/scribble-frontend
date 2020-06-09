import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import Signup from './components/Signup/Signup';
import NavBar from './components/NavBar/NavBar';
import { Switch, Route, Redirect, HashRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

const apiURL = process.env.REACT_APP_API_URL;

const App = () => {
	const [userEmail, setUserEmail] = useState('');
	const [username, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [accessToken, setToken] = useState('');
	const [refreshToken, setRefreshToken] = useState('');
	const [loggedIn, setLoggedIn] = useState(false);
	const [error, setError] = useState('');

	const handleLogin = (event) => {
		event.preventDefault();
		const userData = { email: userEmail, password: password };
		fetch(apiURL + 'api/token/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userData),
		})
			.then((res) => {
				console.log(res);
				if (res.status === 401) {
					setError(
						'Email and password did not match. Please try again or sign up.'
					);
					throw error;
				}
				return res.json();
			})
			.then((res) => {
				setError('');
				setLoggedIn(true);
				setToken(res.access);
				setRefreshToken(res.refresh);
				localStorage.token = accessToken;
			})
			.catch((err) => {
				console.error(err);

				// if (!error) setError('Oops, something went wrong. Please try again.');
			});
	};

	const handleSignup = (event) => {
		event.preventDefault();
		const userData = { email: userEmail, password: password, name: username };
		fetch(apiURL + 'user/signup/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userData),
		})
			.then((res) => {
				console.log(res);
				localStorage.token = res.token;
				setToken(res.token);
				setLoggedIn(true);
			})
			.catch((err) => console.error(err));
	};

	const handleLogOut = () => {
		setUserEmail('');
		setUserName('');
		setPassword('');
		setToken('');
		setRefreshToken('');
		setError('');
		setLoggedIn(false);
		localStorage.clear();
	};

	const handleEmail = (event) => {
		setUserEmail(event.target.value);
	};

	const handlePassword = (event) => {
		setPassword(event.target.value);
	};

	const handleName = (event) => {
		setUserName(event.target.value);
	};

	return (
		<div className='App'>
			<HashRouter basename='/'>
				<NavBar loggedIn={loggedIn} />
				<main>
					<Container>
						<Switch>
							<Route
								exact
								path='/login'
								render={() => (
									<Login
										handleLogin={handleLogin}
										handleEmail={handleEmail}
										handlePassword={handlePassword}
										userEmail={userEmail}
										password={password}
									/>
								)}
							/>
							<Route
								exact
								path='/signup'
								render={() => {
									return (
										<Signup
											handleSignup={handleSignup}
											handleEmail={handleEmail}
											handlePassword={handlePassword}
											userEmail={userEmail}
											password={password}
											name={username}
											handleName={handleName}
										/>
									);
								}}
							/>
							<Route
								exact
								path='/logout'
								render={() => {
									return <Logout handleLogOut={handleLogOut} />;
								}}
							/>
						</Switch>
						{loggedIn && (
							<Alert variant={'success'}>"You are now logged in"</Alert>
						)}
						{error && <Alert variant={'danger'}>{error}</Alert>}
					</Container>
				</main>
			</HashRouter>
		</div>
	);
};

export default App;
