import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../styles/main.sass'

class TagItem extends React.Component {
	render() {
		return (
			<button className={styles.tagItem}>
				<span>{this.props.text}</span>
			</button>
		)
	}
}

export default TagItem


