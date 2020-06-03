import React from 'react';
import styles from 'Styles/main.sass'
import axios from 'axios'

import CommentItem from './CommentItem.jsx'
import WarningMessage from './WarningMessage.jsx'

class CommentList extends React.Component {
	constructor(props) {
		super(props)

		this.handleAddComment = this.handleAddComment.bind(this)
		this.handleLoadComments = this.handleLoadComments.bind(this)

		this.state = {
			valueComment: '',
			comments: []
		}
	}

	componentDidMount() {
		this.handleLoadComments()
	}

	handleAddComment(postId) {
		axios({
			method: 'post',
			url: 'https:\/\/govnoblog.herokuapp.com/api/v1/comments/',
			headers: {
				'Content-type': 'application/json',
				'Authorization': `Token ${localStorage.getItem('AuthKey')}`
			},
			data: {
				text: this.state.valueComment,
				post: postId
			}
		})
		.then(() => {
			this.handleLoadComments()
		})
	} 

	handleLoadComments() {
		axios({
			method: 'get',
			url: `https:\/\/govnoblog.herokuapp.com/api/v2/posts/${this.props.currentPost}/comments`
		})
		.then(response => {
			this.setState({
				comments: response.data.reverse()
			})
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
						onClick={this.handleAddComment.bind(this, this.props.currentPost)} >Add Comment</button>
				</div>
				{this.state.comments[0] ? 
					this.state.comments.map(i => <CommentItem 
														author={i.author.username}
														text={i.text}
														time={new Date(i.created).toLocaleTimeString()}
														key={i.author.username} />)
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

