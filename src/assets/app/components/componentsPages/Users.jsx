import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import styles from 'Styles/main.sass'

import FormRegistration from 'Components/FormRegistration.jsx'
import FormLogin from 'Components/FormLogin.jsx'
import Wrraper from 'Components/Wrraper.jsx'

class Users extends React.Component {
	render() {
		return (
			<Wrraper selectorName={styles.authField}>
				<Switch>
					<Route exact path='/users' component={FormRegistration} />
					<Route path='/users/login' component={FormLogin} />
				</Switch>
			</Wrraper>
		)
	}
}

export default Users