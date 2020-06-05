import React from 'react';
import styles from '../styles/main.sass'

import TagItem from './TagItem.jsx'
import WarningMessage from './WarningMessage.jsx'

class TagList extends React.Component {
	render() {
		return (
			<div className={styles.appField__tagList}>
				<TagItem text='all' key='all' handleSortByTag={this.props.handleSortByTag.bind(this, null)} />
				{this.props.tagList.map((i) => {
					return <TagItem text={i.name} key={i.name} handleSortByTag={this.props.handleSortByTag.bind(this, i.slug)} />
				})}
			</div>
		)
	}
}

export default TagList
