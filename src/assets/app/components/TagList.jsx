import React from 'react';
import styles from '../styles/main.sass'

import TagItem from './TagItem.jsx'
import WarningMessage from './WarningMessage.jsx'

class TagList extends React.Component {
	render() {
		return (
			<div className={styles.appField__tagList}>
				<TagItem text='all' key='all' handleToggle={this.props.handleToggle.bind(this, null)} />
				{this.props.postList instanceof Array ? this.props.tagList.map((i) => {
					return <TagItem text={i.text} key={i.text} handleToggle={this.props.handleToggle.bind(this, i.text)} />
				}) : ''}
			</div>
		)
	}
}

export default TagList
