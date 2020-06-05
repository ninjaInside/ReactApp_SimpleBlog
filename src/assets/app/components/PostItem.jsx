import React from 'react';
import styles from 'Styles/main.sass'
import {Link} from 'react-router-dom'

class PostItem extends React.Component {
	render() {
		return (
			<div className={styles.postItem}>
				<Link
					to={`/${this.props.postId}/post`}
					className={styles.postItem__title}>
						<h2>{this.props.title}</h2>
				</Link>
				<span className={styles.postItem__text}>{this.props.text}</span>
				<div className={styles.postItem__tagList}>
					{this.props.tags.map(t => <span className={styles.postItem__tag} key={t.slug}>{t.name}</span>)}
				</div>
			</div>
		)
	}
}

export default PostItem


