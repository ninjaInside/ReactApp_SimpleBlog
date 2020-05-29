import React from 'react';
import ReactDOM from 'react-dom';
import styles from './styles/main.sass'
import axios from 'axios'
import WebFont from 'webfontloader'

WebFont.load({
	google: {
	  families: ['Montserrat', 'Open-Sans']
	}
  });

import AuthorizationButton from './components/AuthorizationButton.jsx'
import WarningMessage from './components/WarningMessage.jsx'
import PostList from './components/PostList.jsx'
import TagList from './components/TagList.jsx'
import BlogItem from './components/BlogItem.jsx'
import AddingPostField from './components/AddingPostField.jsx' 


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
			tagList: null,
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

	componentDidMount() {
		new Promise(resolve => {
			this.handleGetPosts()

			resolve()
		})
		.then(() => {
			this.setState({
				tagList: this.handleGetTags()
			})
		})
	}

	handleToggleFieldAdd(value) {
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
		this.setState(state => {
			return {
				fieldPostItem: state.postList[postId]
			}
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
			})
		}
		
	}

	handleGetTags() {
		if (!(this.state.postList instanceof Array)) console.log(1)

		return ['жопа']
	}

	render() {
		let contentWrap = contents => {
			return (
				<div className={styles.appField}>
					{contents}
				</div>
			)
		}

		setTimeout(() => {
			console.log(this.state.tagList)
		}, 1000)

		let content
		let endRendering

		if (!this.state.contentVisible) {

			content = <WarningMessage 
						text={`
						Ну, ты как бы не зареган. Прошу тебя зарегаться, ибо только так ты сможешь создавать посты,
						для этого ты можешь нажать левую верхнюю кнопочку, но ты можешь и продолжить без регистрации :)`} 
						textButton='Продолжить' 
						toggleContent={this.handleShowContent}
						/>

		} else {

			content = (
				<>
					<PostList postList={this.state.postList} />

					<TagList 
						postList={this.state.postList}
						tagList={this.state.tagList}
						handleToggle={this.handleToggleTag} />
				</>
			)

		}

		if (this.state.fieldPostItem) {

			endRendering = <BlogItem item={this.state.fieldPostItem} handleEmpty={this.handleEmptyField} />

		} else {

			endRendering = contentWrap(content)

		}


		if (this.state.fieldAdd) {
			endRendering = <AddingPostField closeField={this.handleToggleFieldAdd} />
		}

		return (
			<div className={styles.main}>
				<header className={styles.header}>
					<div className={`${styles.wrraper} ${styles.wrraper_flexSb} ${styles.wrraper_p15} ${styles.wrraper_colorBlue}`}>
						<AuthorizationButton token={this.state.AuthorizationToken} toggleFieldAdd={this.handleToggleFieldAdd} />
						<span className={styles.header__logo}>The Blog</span>
					</div>
				</header>
				
				{endRendering}
			</div>
		)
	}
}

ReactDOM.render(
	<App />,
	document.querySelector('#root')
)
