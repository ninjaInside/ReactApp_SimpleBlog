import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../styles/main.sass'

class WarningMessage extends React.Component {
	render() {
		return (
			<div className={styles.warningMessage}>
				<span className={styles.warningMessage__title}>{this.props.text}</span>
				<button onClick={this.props.toggleContent} className={styles.warningMessage__btn}>{this.props.textButton}</button>
			</div>
		)
	}
}

export default WarningMessage


