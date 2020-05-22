import React from 'react';
import ReactDOM from 'react-dom';
import styles from './styles/main.sass'

import AuthorizationButton from './components/AuthorizationButton'
import WarningMessage from './components/WarningMessage'
import PostItem from './components/PostItem'
import TagItem from './components/TagItem'

class App extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			postList: [
				{
					text: 'Это типа какой-то текст',
					title: 'Ну а это заголовок',
					tag: 'член',
					id: 0

				}, 
								{
					text: `Это типа какой-то текст Это типа какой-то текст Это типа какой-то текст Это типа какой-то текст
					Это типа какой-то текст Это типа какой-то текст Это типа какой-то текст Это типа какой-то текст Это типа какой-то текст
					Это типа какой-то текст Это типа какой-то текст Это типа какой-то текст`,
					title: 'Ну а это заголовок',
					tag: 'член',
					id: 1
				}
			],
			tagList: [
				{text: 'какая то категория'}
			],
			AuthorizationToken: this.handleGetUserToken(),
			contentVisible: this.handleGetUserToken(),
			fieldPostItem: null
		}

		this.handleGetUserToken = this.handleGetUserToken.bind(this)
		this.handleShowContent = this.handleShowContent.bind(this)
		this.handleLoadPost = this.handleLoadPost.bind(this)
	}

	handleGetUserToken() {
		return false
	}

	handleShowContent() {
		this.setState({
			contentVisible: true
		})
	}

	handleLoadPost(postId) {
		console.log(this.state.postList[postId])
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
							} tag={i.tag} key={i.id} handleLoad={() => this.handleLoadPost(i.id)} />
						})}
					</div>

					<div className={styles.appField__tagList}>
						{this.state.tagList.map((i) => {
							return <TagItem text={i.text} key={i.text} />
						})}
					</div>
				</>
			)

		}

		return (
			<div className={styles.main}>
				<header className={styles.header}>
					<div className={`${styles.wrraper} ${styles.wrraper_flexSb}`}>
						<AuthorizationButton token={this.state.AuthorizationToken} />
						<span>Блог типа</span>
					</div>
				</header>
				
				{contentWrap(content)}
			</div>
		)
	}
}

ReactDOM.render(
	<App />,
	document.querySelector('#root')
)
