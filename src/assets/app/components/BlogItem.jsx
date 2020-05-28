import React from 'react';
import styles from '../styles/main.sass'

import CommentList from './CommentList.jsx'

class BlogItem extends React.Component {
	render() {
		return (
			<>
				<div className={styles.blogItem}>
					<button onClick={this.props.handleEmpty} className={styles.blogItem__btn}>Вернуться</button>
					<h1 className={styles.blogItem__title}>{
						this.props.item.title
					}</h1>
					<span className={styles.blogItem__text}>{
						this.props.item.text
					}</span>
					<span className={styles.blogItem__tag}>{
						this.props.item.tag
					}</span>
				</div>
				<CommentList />
			</>
		)
	}
}

export default BlogItem