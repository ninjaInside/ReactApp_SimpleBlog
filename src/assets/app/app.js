import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import styles from 'Styles/main.sass'
import WebFont from 'webfontloader'
import { blogContentAPI as BlogAPI } from 'Services/BlogAPI'

WebFont.load({
	google: {
	  families: ['Montserrat', 'Open-Sans']
	}
});

import AuthorizationButton from 'Components/AuthorizationButton.jsx'
import WarningMessage from 'Components/WarningMessage.jsx'
import BlogItem from 'Components/BlogItem.jsx'
import PostChanges from 'Components/PostChanges.jsx'
import Wrraper from 'Components/Wrraper.jsx' 

import Home from 'Components/componentsPages/Home.jsx' 
import Users from 'Components/componentsPages/Users.jsx'


class App extends React.Component {
	constructor(props) {
		super(props)

		this.handleGetUserToken = this.handleGetUserToken.bind(this)
		this.handleShowContent = this.handleShowContent.bind(this)
		this.handleEmptyField = this.handleEmptyField.bind(this)
		this.handleGetPosts = this.handleGetPosts.bind(this)
		this.handleGetTags = this.handleGetTags.bind(this)
		this.handleToggleFieldAdd = this.handleToggleFieldAdd.bind(this)

		this.state = {
			postList: [],
			tagList: [],
			AuthorizationToken: this.handleGetUserToken(),
			tag: null,
		}
	}

	componentDidMount () {
		this.handleGetPosts()
		this.handleGetTags()
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

	handleEmptyField() {
		this.setState({
			fieldPostItem: null
		})
	}

	async handleGetPosts(tag) {
		let postList = await BlogAPI.getPostList(tag)

		this.setState({
			postList: postList,
			tag: tag
		})
	}

	async handleGetTags() {
		let tagList = await BlogAPI.getTagList() 
		
		this.setState({
			tagList: tagList
		})
	}

	render() {
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
						<Wrraper selectorName={styles.appField}>
							<Home 
								userAuth={this.state.AuthorizationToken}
								postList={this.state.postList}
								tagList={this.state.tagList}
								handleShowPost={this.handleShowPost}
								handleSortByTag={this.handleGetPosts}/>
						</Wrraper>
					</Route>
					<Route exact path='/:id/post' component={BlogItem} />
					<Route path='/users' component={Users} />
					<Route path='/postChanges' component={PostChanges} />
					<Route path='/postChanges/modificate/post/:id'>
						'sdfgsdfg'
					</Route>
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
