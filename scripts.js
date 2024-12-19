let usersData = []


async function loadData() {
    const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users')
    usersData = await usersResponse.json()


    const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts')
    const post = await postsResponse.json()


    post.forEach(post => {
        const user = usersData.find(u => u.id == post.userId)
        $("#gallery-container").append(`
            <div class="post" onclick="showPostPage(${post.id})">
                <button class="username-link" onclick="event.stopPropagation() showUserPage(${post.userId})">
                    ${user.name} @${user.username}
                </button>
                <h1>${post.title}</h1>
                <p>${post.body}</p>
            </div>
        `)
    })
}
loadData()


async function showUserPage(userId) {
    const user = usersData.find(user => user.id == userId)
    $("#gallery-container").hide()
    $("#user-page-container").show()


    $("#user-info").html(`
        <h1>${user.name}</h1>
        <h3>@${user.username}</h3>
        <p>${user.email}</p>
        <p>${user.address.city}, ${user.address.street}</p>
    `)


    const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    const post = await postsResponse.json()
    $("#user-posts").html(`<h2>Posts:</h2>`)
    post.forEach(post => {
        $("#user-posts").append(`
            <div class="post" onclick="showPostPage(${post.id})">
                <h3>${post.title}</h3>
                <p>${post.body}</p>
            </div>
        `)
    })
}


async function showPostPage(postId) {
    const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    const post = await postResponse.json()


    const user = usersData.find(u => u.id == post.userId)
    const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
    const comments = await commentsResponse.json()


    $("#gallery-container").hide()
    $("#user-page-container").show()


    $("#user-info").html(`
        <div id="post-title">
            <h1>${post.title}</h1>
            <p>by <button class="username-link" onclick="showUserPage(${user.id})">${user.name} @${user.username}</button></p>
        </div>
        <p>${post.body}</p>
    `)

}


function goBack() {
    $("#user-page-container").hide()
    $("#gallery-container").show()
}
