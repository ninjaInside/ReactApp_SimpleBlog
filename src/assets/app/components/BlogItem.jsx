import React from 'react';
import styles from 'Styles/main.sass'
import axios from 'axios'

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
						this.props.item.body
					}</span>
					<div className={styles.blogItem__tagList}>
						{this.props.item.tags.map(t => <span className={styles.blogItem__tag} key={t.slug}>{t.name}</span>)}
					</div>
				</div>
				<CommentList currentPost={this.props.item.id} />
			</>
		)
	}
}

export default BlogItem