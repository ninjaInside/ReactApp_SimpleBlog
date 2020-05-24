import React from 'react';
import ReactDOM from 'react-dom';
import styles from './styles/main.sass'
import WebFont from 'webfontloader'

WebFont.load({
	google: {
	  families: ['Montserrat', 'Open-Sans']
	}
});

import FormRegistration from './components/FormRegistration'
import FormLogin from './components/FormLogin'

class App extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			toggleField: true
		}

		this.handleToggleField = this.handleToggleField.bind(this)
	}

	handleToggleField() {
		this.setState((state) => {
			return {
				toggleField: !state.toggleField
			}
		})
	}

	render() {
		return (
			<div className={styles.authField}>
				{this.state.toggleField ? <FormRegistration /> : <FormLogin />}
				<div className={styles.authField__toggleFieldInterface}>
					<button className={styles.authField__toggleBtn} onClick={this.handleToggleField}>
						{this.state.toggleField ? 'Уже зарегестрированы?' : 'Вернуться к регистрации'}
					</button>
				</div>
			</div>
		)
	}
}

ReactDOM.render(
	<App />,
	document.querySelector('#root')
)