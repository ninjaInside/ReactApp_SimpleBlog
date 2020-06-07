import React from 'react';
import styles from 'Styles/main.sass'

import TagList from 'Components/TagList.jsx'
import PostList from 'Components/PostList.jsx'
import WarningMessage from 'Components/PostList.jsx'

class Home extends React.Component {
	render() {
		return (
			<>{this.props.userAuth ? 
				<>
					<PostList 
						postList={this.props.postList} 
						handleShow={this.props.handleShowPost} 
						afterUrl={'/post'}
						beforeUrl={'/'}/>

					<TagList 
						tagList={this.props.tagList}
						handleSortByTag={this.props.handleSortByTag} />
				</>
				:
				<WarningMessage 
						text={`
							Ну, ты как бы не зареган. 
							Прошу тебя зарегаться, ибо только так 
							ты сможешь создавать посты,
							для этого ты можешь нажать левую верхнюю кнопочку, 
							но ты можешь и продолжить без регистрации :)
						`} 
						textButton='Продолжить' 
						toggleContent={this.handleShowContent}
						/>
			}</>
		)
	}
}

export default Home
