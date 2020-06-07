import React from 'react';
import axios from 'axios';
import { blogContentAPI as BlogAPI } from 'Services/BlogAPI'

import FormPost from 'Components/FormPost.jsx'

class FormModificatePost extends React.Component {
	constructor(props) {
		super(props)

		this.handleLoadPost = this.handleLoadPost.bind(this)

		this.state = {
			post: {}
		}
	}

	componentDidMount() {
		this.handleLoadPost(this.props.match.params.id)
	} 

	async handleLoadPost(id) {
		let post = await BlogAPI.getPostById(id)

		post.tags = post.tags.map(item => item.name).join(' ')

		this.setState({
			post: post
		})
	}

	render() {
		return (
			<FormPost 
				title={this.state.post.title}
				body={this.state.post.body}
				tags={this.state.post.tags}
				/>
		)
	}
}

export default FormModificatePost