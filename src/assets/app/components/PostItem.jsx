import React from 'react';
import styles from '../styles/main.sass'

class PostItem extends React.Component {
	render() {
		return (
			<div className={styles.postItem}>
				<h2 className={styles.postItem__title}>{this.props.title}</h2>
				<span className={styles.postItem__text}>{this.props.text}</span>
				<div className={styles.postItem__tagList}>
					{this.props.tags.map(t => <span className={styles.postItem__tag} key={t.slug}>{t.name}</span>)}
				</div>
				<button 
					className={styles.postItem__openBtn}
					onClick={this.props.handleShow}>{this.props.btnText ? this.props.btnText : 'Open'}</button>
			</div>
		)
	}
}

export default PostItem


