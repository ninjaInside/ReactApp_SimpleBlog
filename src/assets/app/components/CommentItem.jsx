import React from 'react';
import styles from '../styles/main.sass'

class CommentItem extends React.Component {
	render() {
		return (
			<div className={styles.commentItem}>
				<span className={styles.commentItem__author}>{this.props.author}</span>
				<span className={styles.commentItem__text}>{this.props.text}</span>
				<span className={styles.commentItem__time}>{this.props.time}</span>
			</div>
		)
	}
}

export default CommentItem