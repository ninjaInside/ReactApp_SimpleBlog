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

import AuthorizationButton from './components/AuthorizationButton'
import WarningMessage from './components/WarningMessage'
import PostItem from './components/PostItem'
import TagItem from './components/TagItem'
import BlogItem from './components/BlogItem'
import AddingPostField from './components/AddingPostField' 


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
		console.log(postId)
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
				url: 'http:\/\/localhost:8000/api/v1/posts/'
			})
			.then((response) => {
				this.setState({
					postList: response
				})
			})
		}
		
	}

	handleGetTags() {
		if (!(this.state.postList instanceof Array)) return
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
					<div className={styles.appField__postList}>
						{this.state.postList instanceof Array ? this.state.postList.map((i) => {
							return <PostItem title={i.title} text={
								i.text.length > 370 ? i.text.slice(0, 370) : i.text 
							} tag={i.tags} key={i.id} handleShow={() => this.handleShowPost(i.id)} />
						}) : <WarningMessage text={'Извините, но я ничего не откопал'} />}
					</div>

					<div className={styles.appField__tagList}>
						<TagItem text='all' key='all' handleToggle={this.handleToggleTag.bind(this, null)} />
						{this.state.postList instanceof Array ? this.state.tagList.map((i) => {
							return <TagItem text={i.text} key={i.text} handleToggle={this.handleToggleTag.bind(this, i.text)} />
						}) : ''}
					</div>
				</>
			)

		}

		console.log(this.state.fieldAdd)

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
					<div className={`${styles.wrraper} ${styles.wrraper_flexSb}`}>
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
