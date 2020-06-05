import axios from 'axios'

class BlogAPI {
	getUsers() {}

	async getPostList(tag) {
		let postList

		if (!tag) {
			
			postList = await axios('https:\/\/govnoblog.herokuapp.com/api/v1/posts/')
		
		} else {

			postList = await axios(`https:\/\/govnoblog.herokuapp.com/api/v1/posts/tag/${tag}`)

		}

		return postList.data
	}

	async getTagList() {
		let tagList = await axios('https:\/\/govnoblog.herokuapp.com/api/v2/tags/')

		return tagList.data
	}

	async getTagListByPost(id) {
		let tagList = await axios(`https:\/\/govnoblog.herokuapp.com/api/v2/posts/${id}/tags`)

		return tagList.data
	}

	async getPostById(id) {
		let post = await axios(`https:\/\/govnoblog.herokuapp.com/api/v1/posts/${id}`) 

		return post.data
	}

	async getCommentsListById(id) {
		let commentsList = await axios(`https:\/\/govnoblog.herokuapp.com/api/v2/posts/${id}/comments`)

		return commentsList.data.reverse()
	}

	async addCommentToPost(postId, text) {
		let comment = await axios({
								method: 'post',
								url: 'https:\/\/govnoblog.herokuapp.com/api/v1/comments/',
								headers: {
									'Content-type': 'application/json',
									'Authorization': `Token ${localStorage.getItem('AuthKey')}`
								},
								data: {
									text: text,
									post: postId
								}
							})

		return comment
	}

}

let blogApi = new BlogAPI()

export default blogApi