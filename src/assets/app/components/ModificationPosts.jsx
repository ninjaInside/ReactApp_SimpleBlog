import React from 'react';
import styles from '../styles/main.sass'
import axios from 'axios'

import PostItem from './PostItem.jsx'
import WarningMessage from './WarningMessage.jsx'
import PostList from './PostList.jsx'
import FormAddPost from './FormAddPost.jsx'

class ModificationPosts extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			postList: null,
			title: '',
			body: '',
			tags: ''
		}

		this.handleModificatePost = this.handleModificatePost.bind(this)
		this.handleGetPostList = this.handleGetPostList.bind(this)
		this.handleGetPost = this.handleGetPost.bind(this)
	}

	componentDidMount() {
		this.handleGetPostList()
	}

	handleModificatePost(values, {setSubmitting}) {
		values.tags = values.tags.split(' ')

		axios({
			method: 'put',
			url: `https:\/\/govnoblog.herokuapp.com/api/v1/posts/${this.props.postId}/`,
			headers: {
				'Authorization': `Token ${localStorage.getItem('AuthKey')}`
			},
			data: values
		})
		.then(response => {
			location.reload()
		})
	}

	handleGetPost(postId) {
		axios({
			method: 'get',
			url: `https:\/\/govnoblog.herokuapp.com/api/v1/posts/${postId}/`,
		})
		.then(response => {
			this.setState({
				title: response.data.title,
				body: response.data.body,
				tags: response.data.tags.map((i) => i.name).join(' '),
			})

			this.props.handleChangePostId(postId)
		})
	}

	handleGetPostList() {
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

		if (this.props.postId) {

			render = <FormAddPost 
						responseFunction={this.handleModificatePost} 
						title={this.state.title}
						body={this.state.body}
						tags={this.state.tags} />
		
		} else {
			
			render = <PostList 
						postList={this.state.postList} 
						handleShow={this.handleGetPost} />
		
		}

		return (
			render
		)
	}
}

export default ModificationPosts