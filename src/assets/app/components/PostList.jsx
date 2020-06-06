import React from 'react';
import styles from 'Styles/main.sass'

import PostItem from './PostItem.jsx'
import WarningMessage from './WarningMessage.jsx'

class PostList extends React.Component {
	render() {
		return (
			<div className={styles.appField__postList}>
				{this.props.postList.length !== 0 ? this.props.postList.map(item => {
					return <PostItem 
								title={item.title} 
								text={item.body.length > 270 ? item.body.slice(0, 270) + '...' : item.body} 
								tags={item.tags} 
								key={item.id} 
								postId={item.id} 
								btnText={this.props.btnText} 
								afterUrl={this.props.afterUrl}
								beforeUrl={this.props.beforeUrl}/>
				}) : <WarningMessage 
						text={'Извините, но я ничего не откопал'} 
						otherSelectors={[styles.warningMessage_hAuto, styles.warningMessage_p15]} />}
			</div>
		)
	}
}

export default PostList
