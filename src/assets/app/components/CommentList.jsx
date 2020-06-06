import React from 'react';
import styles from 'Styles/main.sass'
import { blogCommentAPI as BlogAPI } from 'Services/BlogAPI'

import CommentItem from './CommentItem.jsx'
import WarningMessage from './WarningMessage.jsx'

class CommentList extends React.Component {
	constructor(props) {
		super(props)

		this.handleAddComment = this.handleAddComment.bind(this)
		this.handleLoadComments = this.handleLoadComments.bind(this)

		this.state = {
			valueComment: '',
			comments: [],
			postId: parseInt(this.props.postId)
		}
	}

	componentDidMount() {
		this.handleLoadComments(this.state.postId)
	}

	async handleAddComment(postId, text) {
		let comment = await BlogAPI.addCommentToPost(postId, text)

		console.log(this.state.postId)

		this.handleLoadComments(this.state.postId)
	} 

	async handleLoadComments() {
		let commentList = await BlogAPI.getCommentsListById(this.state.postId) 

		this.setState({
			comments: commentList
		})
	}

	render() {
		return (
			<div className={styles.commentList}>
				<div className={styles.commentList__fieldAddComment}>
					<textarea 
						className={styles.commentList__textInput}
						value = {this.state.valueComment}
						onChange={e => {
							this.setState({
								valueComment: e.target.value
							})
						}}></textarea>
					<button 
						className={styles.commentList__addBtn}
						onClick={this.handleAddComment.bind(this, this.state.postId, this.state.valueComment)}>Add Comment</button>
				</div>
				{this.state.comments[0] ? 
					this.state.comments.map(item => <CommentItem 
														author={item.author.username}
														text={item.text}
														time={new Date(item.created).toLocaleTimeString()}
														key={item.id} />)
					:
					
					<WarningMessage 
						text='Коментарии не найдены' 
						otherSelectors={[
							styles.warningMessage_hAuto, 
							styles.warningMessage_textLeft]} />
				}
			</div>
		)
	}
}

export default CommentList

