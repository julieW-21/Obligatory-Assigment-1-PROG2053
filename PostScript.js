/*JavaScript for Dynamic Content Loading that fetches posts, diplays them 
|on the webpage and loads more when the user scrolls.*/

//Variables
const postsContainer = document.getElementById('postsContainer');
let page = 1; 						//Initialize page.
const postsPerPage = 3; 			//Only show 3 posts per page.

//Fetches posts from the JSONPlaceholder API.
async function fetchPost() {
	try {							//Fetches from URL using the variables.
		const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${postsPerPage}`);
      	const posts = await response.json();		//Wait for promise and turn to JSON format. 
      	return posts;								//Return the fetched promise.
	} catch (error) { 				//If it can't fetch the posts.
		console.error("Can't fetch the posts", error);
		return null;
	}
}

//Displays the post in the webpage container.
function showPosts(posts) {
	posts.forEach(post => {			//Loop that creates an element for each post. 
		const postElement = document.createElement('div'); //Creates new element.
		postElement.className = 'post';					   //Used to styled with CSS.
		postElement.innerHTML = `<h2>${post.title}</h2>
								 <p>${post.body}</p>`;
		postsContainer.appendChild(postElement); 		   //Post is a child of container.
	});
}

//Loads more posts by calling the other functions.
async function loadPosts() {

	const posts = await fetchPost();
	showPosts(posts);
	page++; 						//Increases page nr.

}

loadPosts(); 						//Load the first 3 posts. 

//If the user scrolls down, it loads more. Using event listener to know when user scrolls.
window.addEventListener('scroll', () => {
	if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
		loadPosts();
	}
});