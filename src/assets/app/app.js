import React from 'react';
import ReactDOM from 'react-dom';
import styles from './styles/main.sass'

import AuthorizationButton from './components/AuthorizationButton'
import WarningMessage from './components/WarningMessage'
import PostItem from './components/PostItem'
import TagItem from './components/TagItem'
import BlogItem from './components/BlogItem'

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

		this.state = {
			postList: null,
			tagList: null,
			AuthorizationToken: this.handleGetUserToken(),
			contentVisible: this.handleGetUserToken(),
			fieldPostItem: null,
			tag: null,
			currentTag: null,
			pointerOne: 0,
			pointerTwo: 50,
		}
	}

	componentDidMount() {
		this.setState({
			postList: this.handleGetPosts(),
			tagList: this.handleGetTags(),
		})
	}

	handleGetUserToken() {
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
		this.setState({
			tag: tag
		})
	}

	handleGetPosts() {
		if (this.state.currentTag !== this.state.tag) {
			this.setState((state) => {
				return {
					currentTag: state.tag
				}
			})

			console.log(this.state.currentTag)
		}

		if (!this.state.currentTag) {
			return [
				{
					title: `This is allow title`,
					text: `
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius alias culpa doloremque ipsam debitis eligendi reprehenderit asperiores sint, eum iusto doloribus. Quae, est consequatur corporis molestias cum aut nemo quaerat animi pariatur, provident nisi voluptates.
					`,
					tag: 'another', 
					id: 0
				},
				{
					title: `This is garbage title`,
					text: `
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, pariatur qui tempore. Optio odit eos velit neque consectetur quidem. Repudiandae, quia. Voluptate beatae, fuga laudantium.
					`,
					tag: 'hellooooo',
					id: 1
				},
				{
					title: `This is no title`,
					text: `
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod, tempore! Commodi illum fugit, iste officiis!
					`,
					tag: 'another',
					id: 2
				},
				{
					title: `This is my title`,
					text: `
						Lorem ipsum dolor sit amet.
					`,
					tag: 'hellooooo',
					id: 3
				}
			]
		}
	}

	handleGetTags() {
		return [
			{text: 'another'},
			{text: 'hellooooo'}
		]
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
						text='Пожалуйста убейте меня' 
						textButton='продолжить' 
						toggleContent={this.handleShowContent}
						/>

		} else {

			content = (
				<>
					<div className={styles.appField__postList}>
						{this.state.postList.map((i) => {
							return <PostItem title={i.title} text={
								i.text.length > 370 ? i.text.slice(0, 370) : i.text 
							} tag={i.tag} key={i.id} handleShow={() => this.handleShowPost(i.id)} />
						})}
					</div>

					<div className={styles.appField__tagList}>
						{this.state.tagList.map((i) => {
							return <TagItem text={i.text} key={i.text} onClick={this.handleToggleTag.bind(this, i.text)} />
						})}
					</div>
				</>
			)

		}

		if (this.state.fieldPostItem) {

			endRendering = <BlogItem item={this.state.fieldPostItem} handleEmpty={this.handleEmptyField} />

		} else {

			endRendering = contentWrap(content)

		}

		return (
			<div className={styles.main}>
				<header className={styles.header}>
					<div className={`${styles.wrraper} ${styles.wrraper_flexSb}`}>
						<AuthorizationButton token={this.state.AuthorizationToken} />
						<span>Блог типа</span>
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
