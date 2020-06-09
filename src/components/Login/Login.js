import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Login = (props) => {
	return (
		<Form onSubmit={(e) => props.handleLogin(e)}>
			<Form.Group controlId='formBasicEmail'>
				<Form.Label>Email address</Form.Label>
				<Form.Control
					onChange={props.handleEmail}
					type='email'
					placeholder='Enter email'
					value={props.userEmail}
					name='email'
				/>
			</Form.Group>
			<Form.Group controlId='formBasicPassword'>
				<Form.Label>Password</Form.Label>
				<Form.Control
					onChange={props.handlePassword}
					type='password'
					placeholder='password'
					value={props.password}
					name='password'
				/>
			</Form.Group>
			<Button variant='primary' type='submit'>
				Submit
			</Button>
		</Form>
	);
};

export default Login;
