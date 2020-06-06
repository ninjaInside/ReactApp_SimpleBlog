import axios from 'axios'

class BlogUserAPI {

}

class BlogCommentAPI {
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

class BlogContentAPI {
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
}

let blogCommentAPI = new BlogCommentAPI()
let blogUserAPI = new BlogUserAPI()
let blogContentAPI = new BlogContentAPI()

export {blogContentAPI, blogUserAPI, blogCommentAPI}