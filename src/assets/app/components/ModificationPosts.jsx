import React from 'react';
import styles from '../styles/main.sass'
import axios from 'axios'

import PostItem from './PostItem.jsx'
import WarningMessage from './WarningMessage.jsx'
import PostList from './PostList.jsx'

class ModificationPosts extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			currentPost: null,
			postList: null,
		}

		this.handleModificatePost = this.handleModificatePost.bind(this)
		this.handleGetPost = this.handleGetPost.bind(this)
	}

	componentDidMount() {
		this.handleGetPost()
	}

	handleModificatePost(postId, e) {
		
	}

	handleGetPost() {
		axios({
			method: 'get',
			url: `https:\/\/govnoblog.herokuapp.com/api/v1/users/current/posts/`,
			headers: {
				'Authorization': `Token ${localStorage.getItem('AuthKey')}`
			}
		})
		.then(response => {
			this.setState({
				postList: response.data
			})
		})
	}

	render() {
		let render

		if (!this.state.currentPost) {
			render = <PostList 
						postList={this.state.postList} 
						btnText={'Modificate'} 
						handleShow={this.handleModificatePost}/>

		}

		return (
			render
		)
	}
}

export default ModificationPosts