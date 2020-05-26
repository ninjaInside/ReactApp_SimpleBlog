import React from 'react';
import styles from '../styles/main.sass'

class TagItem extends React.Component {
	render() {
		return (
			<button className={styles.tagItem} onClick={this.props.handleToggle}>
				{this.props.text}
			</button>
		)
	}
}

export default TagItem


