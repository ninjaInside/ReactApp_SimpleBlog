import React from 'react';
import styles from 'Styles/main.sass'
import axios from 'axios'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { blogContentAPI as BlogAPI } from 'Services/BlogAPI'

import PostItem from './PostItem.jsx'
import WarningMessage from './WarningMessage.jsx'
import PostList from './PostList.jsx'
import FormModificatePost from './FormModificatePost.jsx'

class ModificationPosts extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			postList: [],
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

	async handleGetPost(props) {
		let post = await BlogAPI.getPostById(props.match.params.id)

		return post
	}

	render() {
		return (
			<Switch>
				<Route exact path='/postChanges/modificate'>
					<PostList 
						postList={this.state.postList} 
						afterUrl={''}
						beforeUrl={'post/'} />
				</Route>

				<Route path='/postChanges/modificate/post/:id' render={props => <FormModificatePost {...props} />} />
			</Switch>
		)
	}
}

export default ModificationPosts