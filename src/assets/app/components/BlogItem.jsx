import React from 'react';
import styles from 'Styles/main.sass'
import BlogAPI from 'Services/BlogAPI'
import {Link} from 'react-router-dom'

import CommentList from './CommentList.jsx'

class BlogItem extends React.Component {
	constructor(props) {
		super(props)

		this.handleLoadPost = this.handleLoadPost.bind(this)

		this.state = {
			post: {},
			postId: this.props.match.params.id,
			tagList: []
		}
	}

	componentDidMount() {
		this.handleLoadPost(this.state.postId)
		this.handleLoadTagList(this.state.postId)
	}

	async handleLoadPost(id) {
		let post = await BlogAPI.getPostById(id) 

		this.setState({
			post: post
		})
	}

	async handleLoadTagList(id) {
		let tagList = await BlogAPI.getTagListByPost(id)

		this.setState({
			tagList: tagList
		})
	}

	render() {
		return (
			<>
				<div className={styles.blogItem}>
					<Link to={'/'}>
						<button onClick={this.props.handleEmpty} className={styles.blogItem__btn}>Back</button>
					</Link>
					<h1 className={styles.blogItem__title}>{
						this.state.post.title
					}</h1>
					<span className={styles.blogItem__text}>{
						this.state.post.body
					}</span>
					<div className={styles.blogItem__tagList}>
						{
							this.state.tagList.map(item => <span className={styles.blogItem__tag} key={item.slug}>{item.name}</span>)}
					</div>
				</div>
				<CommentList postId={this.state.postId} />
			</>
		)
	}
}

export default BlogItem