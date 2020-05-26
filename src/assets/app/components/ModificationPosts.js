import React from 'react';
import styles from '../styles/main.sass'
import axios from 'axios'

import PostItem from './PostItem'
import WarningMessage from './WarningMessage'

class ModificationPosts extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			currentPost: null,
			postList: null,
		}

		this.handleModificatePost = this.handleModificatePost.bind(this)
		this.handleGetPost = this.handleGetPost.bind(this)
		this.handleAddPost = this.handleAddPost.bind(this)
	}

	handleModificatePost() {

	}

	handleGetPost() {

	}

	handleAddPost() {

	}

	render() {
		let render

		if (!this.state.currentPost) {
			render = <div className={`${styles.appField__postList} ${styles.h100}`}>
						{this.state.postList instanceof Array ? this.state.postList.map((i) => {
							return <PostItem title={i.title} text={
								i.text.length > 370 ? i.text.slice(0, 370) : i.text 
							} tag={i.tags} key={i.id} handleShow={() => this.handleShowPost(i.id)} />
						}) : <WarningMessage text={'Извините, но я ничего не откопал'} />}
					</div>
		}

		return (
			render
		)
	}
}

export default ModificationPosts