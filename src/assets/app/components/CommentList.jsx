import React from 'react';
import styles from '../styles/main.sass'

import CommentItem from './CommentItem.jsx'
import WarningMessage from './WarningMessage.jsx'

class CommentList extends React.Component {
	render() {
		return (
			<div className={styles.commentList}>
				<div className={styles.commentList__fieldAddComment}>
					<textarea className={styles.commentList__textInput}></textarea>
					<button className={styles.commentList__addBtn}>Add Comment</button>
				</div>
				{this.props.listComments instanceof Array ? 
					this.props.listComments.map(i => <CommentItem 
														author={i.author}
														text={i.text}
														time={i.time} />)
					:
					
					<WarningMessage 
						text='Коментарии не найдены' 
						otherSelectors={[
							styles.warningMessage_hAuto, 
							styles.warningMessage_textLeft]} />
				}
			</div>
		)
	}
}

export default CommentList

