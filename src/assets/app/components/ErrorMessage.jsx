import React from 'react';
import styles from 'Styles/main.sass'

class ErrorMessage extends React.Component {
	render() {
		return (
			<ul className={styles.errorMessage}>
				<li>{this.props.text}</li>
			</ul>
		)
	}
}

export default ErrorMessage


