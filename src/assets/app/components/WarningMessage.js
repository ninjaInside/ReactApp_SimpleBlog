import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../styles/main.sass'

class WarningMessage extends React.Component {
	render() {
		return (
			<div className={styles.warningMessage}>
				<span>{this.props.text}</span>
				<button onClick={this.props.toggleContent}>{this.props.textButton}</button>
			</div>
		)
	}
}

export default WarningMessage


