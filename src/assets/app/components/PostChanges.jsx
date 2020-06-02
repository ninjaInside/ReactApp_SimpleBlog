import React from 'react';
import styles from '../styles/main.sass'
import axios from 'axios'
import {Formik} from 'formik'

import ModificationPosts from './ModificationPosts.jsx'
import ErrorMessage from './ErrorMessage.jsx'
import FormAddPost from './FormAddPost.jsx'

class AddingPost extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			modificateField: null,
			currentPostId: null
		}

		this.handleAddPost = this.handleAddPost.bind(this)
		this.handleChangePostId = this.handleChangePostId.bind(this)
	}

	handleChangePostId(postId) {
		this.setState({
			currentPostId: postId
		})
	}

	handleAddPost(values, {setSubmitting}) {
		values.tags = values.tags.split(' ')

		axios({
			method: 'post',
			url: 'https:\/\/govnoblog.herokuapp.com/api/v1/posts/',
			headers: {
				'Content-type': 'application/json',
				'Authorization': `Token ${localStorage.getItem('AuthKey')}`
			},
			data: values
		})
		.then((response) => {
			location.reload()
		})
	}

	render() {
		let render

		if (!this.state.modificateField) {
			render = <FormAddPost 
						responseFunction={this.handleAddPost}
						/>
		} else {
			render = <ModificationPosts 
						handleChangePostId={this.handleChangePostId} 
						postId={this.state.currentPostId} />
		}

		return (
			<div className={styles.addingPostField}>
				<div className={styles.addingPostField__btns}>
					<button 
						className={styles.addingPostField__closeBtn}
						onClick={this.props.closeField.bind(this, null)}>Close</button>
					<button 
						className={styles.addingPostField__modificateBtn}
						onClick={() => {
							this.setState((state) => {
								return {
									modificateField: !state.modificateField
								}
							})
						}}>{this.state.modificateField ? 'Add Post' : 'Modification my posts'}</button>	
					{this.state.currentPostId ? 
						<button 
							className={styles.addingPostField__closeBtn}
							onClick={this.handleChangePostId.bind(this, null)}>Back</button>
						:
						''
					}			
				</div>
				{render}
			</div>
		)
	}
}

export default AddingPost