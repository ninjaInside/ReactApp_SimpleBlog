import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../styles/main.sass'

class PostItem extends React.Component {
	render() {
		return (
			<div className={styles.postItem} onClick={this.props.handleShow}>
				<h2 className={styles.postItem__title}>{this.props.title}</h2>
				<span className={styles.postItem__text}>{this.props.text}</span>
				<span className={styles.postItem__tag}>{this.props.tag}</span>
			</div>
		)
	}
}

export default PostItem


