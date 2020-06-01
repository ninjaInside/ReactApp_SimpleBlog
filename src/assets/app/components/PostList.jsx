import React from 'react';
import styles from '../styles/main.sass'

import PostItem from './PostItem.jsx'
import WarningMessage from './WarningMessage.jsx'

class PostList extends React.Component {
	render() {
		return (
			<div className={styles.appField__postList}>
				{this.props.postList instanceof Array ? this.props.postList.map((i) => {
					return <PostItem 
								title={i.title} 
								text={i.body.length > 270 ? i.body.slice(0, 270) + '...' : i.body} 
								tags={i.tags} key={i.id} 
								handleShow={this.props.handleShow.bind(this, i.id)} 
								btnText={this.props.btnText} />
				}) : <WarningMessage 
						text={'Извините, но я ничего не откопал'} 
						otherSelectors={[styles.warningMessage_hAuto, styles.warningMessage_p15]} />}
			</div>
		)
	}
}

export default PostList
