import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import styles from './styles/main.sass'
import axios from 'axios'
import WebFont from 'webfontloader'

WebFont.load({
	google: {
	  families: ['Montserrat', 'Open-Sans']
	}
});

import AuthorizationButton from 'Components/AuthorizationButton.jsx'
import WarningMessage from 'Components/WarningMessage.jsx'
import BlogItem from 'Components/BlogItem.jsx'
import PostChanges from 'Components/PostChanges.jsx' 

import Home from 'Components/componentsPages/Home.jsx' 


class App extends React.Component {
	constructor(props) {
		super(props)

		this.handleGetUserToken = this.handleGetUserToken.bind(this)
		this.handleShowContent = this.handleShowContent.bind(this)
		this.handleShowPost = this.handleShowPost.bind(this)
		this.handleEmptyField = this.handleEmptyField.bind(this)
		this.handleToggleTag = this.handleToggleTag.bind(this)
		this.handleGetPosts = this.handleGetPosts.bind(this)
		this.handleGetTags = this.handleGetTags.bind(this)
		this.handleToggleFieldAdd = this.handleToggleFieldAdd.bind(this)

		this.state = {
			postList: null,
			tagList: [],
			AuthorizationToken: this.handleGetUserToken(),
			contentVisible: this.handleGetUserToken(),
			fieldPostItem: null,
			tag: null,
			currentTag: null,
			fieldAdd: null,
			modificateField: null,
			pointerOne: 0,
			pointerTwo: 50,
		}
	}

	componentDidMount () {
		this.handleGetPosts()
	}

	handleToggleFieldAdd (value) {
		this.setState({
			fieldAdd: value 
		})
	}

	handleGetUserToken() {
		if (localStorage.getItem('AuthKey')) {
			return localStorage.getItem('AuthKey')
		}

		return false
	}

	handleShowContent() {
		this.setState({
			contentVisible: true
		})
	}

	handleShowPost(postId) {
		axios({
			method: 'get',
			url: `https:\/\/govnoblog.herokuapp.com/api/v1/posts/${postId}`,
			headers: {
				'Content-type': 'application/json',
			}
		})
		.then(res => {
			this.setState({
				fieldPostItem: res.data
			})
		})
	}

	handleEmptyField() {
		this.setState({
			fieldPostItem: null
		})
	}

	handleToggleTag(tag) {
		new Promise(resolve => {
			this.setState({
				tag: tag
			})

			resolve()
		})
		.then(r => {
			this.handleGetPosts()
		})
	}

	handleGetPosts() {
		if (this.state.currentTag !== this.state.tag) {
			this.setState((state) => {
				return {
					currentTag: state.tag
				}
			})
		}

		if (!this.state.currentTag) {
			
			axios({
				method: 'get',
				url: 'https:\/\/govnoblog.herokuapp.com/api/v1/posts/'
			})
			.then((response) => {
				this.setState({
					postList: response.data
				})

				this.handleGetTags()
			})
		
		} else {

			axios({
				method: 'get',
				url: `https:\/\/govnoblog.herokuapp.com/api/v1/posts/tag/${this.state.currentTag}`
			})
			.then((response) => {
				this.setState({
					postList: response.data
				})
			})

		}
		
	}

	handleGetTags() {
		let collection = new Set()

		this.state.postList.forEach(item => {
			for (let tag of item.tags) {
				let isExist

				for (let i of Array.from(collection)) {
					if (i.name === tag.name) isExist = true
				}	

				if (!isExist) {
					collection.add({...tag})
				}
			}
		})

		this.setState({
			tagList: Array.from(collection)
		})
	}

	render() {
		let contentWrap = contents => {
			return (
				<div className={styles.appField}>
					{contents}
				</div>
			)
		}

		let content
		let endRendering

		if (this.state.fieldPostItem) {

			endRendering = <BlogItem item={this.state.fieldPostItem} handleEmpty={this.handleEmptyField} />

		} else {

			endRendering = contentWrap(content)

		}


		if (this.state.fieldAdd) {
			endRendering = <PostChanges closeField={this.handleToggleFieldAdd} />
		}

		return (
			<div className={styles.main}>
				<header className={styles.header}>
					<div className={`${styles.wrraper} ${styles.wrraper_flexSb} ${styles.wrraper_p15} ${styles.wrraper_colorBlue}`}>
						<AuthorizationButton 
							token={this.state.AuthorizationToken} 
							toggleFieldAdd={this.handleToggleFieldAdd}
							username={'U'} />
						<span className={styles.header__logo}>The Blog</span>
					</div>
				</header>
				
				<Switch>
					<Route exact path='/'>
						{contentWrap(
							<Home 
								userAuth={this.state.AuthorizationToken}
								postList={this.state.postList}
								tagList={this.state.tagList}
								handleShowPost={this.handleShowPost}
								handleToggleTag={this.handleToggleTag}/>)}
					</Route>
					<Route path='/:id/post' component={BlogItem} />
				</Switch>
			</div>
		)
	}
}

ReactDOM.render(
	<Router>
		<App />
	</Router>,
	document.querySelector('#root')
)
