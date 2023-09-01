const urlPrefix = 'http://localhost:1337/api/';
const requestPostsUrl = urlPrefix + 'posts';
const btn = document.querySelector('.olderPost');
const content = document.querySelector('.content');
let posts = [];
    

function renderPosts() {
    for (const post of posts) {
        console.log(post.id);

    }

}

function getFirstSentence(content) {
    const sentences = content.split('.');
    if (sentences.length > 0) {
        return sentences[0] + '.';
    }
    return content;
}


const colmd10 = document.querySelector('.posts .row .col-md-10');


function render() {
    for (let i = 0; i < 5; i++) {
        const currPost = posts[i];
        const firstSentence = getFirstSentence(currPost.content);
        colmd10.innerHTML += `
        <div class="deneme">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/fQBqaga9ElU?si=8iL7F_F_TBN7gbeq" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>${firstSentence}</iframe>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/yJVwNyVUOvc?si=htf5YzBvpZgLMVTq" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/TES4wyplp_I?si=7whbIx7H0IyG8VH_" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </div>

        `;
    }
    bindPostsClicks();
}






const postsContainer = document.querySelector('#postsContainer');
const baseUrl = 'http://localhost:1337/api/';
const commentForm = document.querySelector('.comment form');

async function loadData() {
    postsContainer.innerHTML = '';
    let post = await fetch('http://localhost:1337/api/posts/1').then(x => x.json());
    let comments = await fetch('http://localhost:1337/api/comments?filters[post][id][$eq]=' + post.data.id).then(x => x.json());
    postsContainer.innerHTML += `<h1>${post.data.attributes.title}</h1>`;
    postsContainer.innerHTML += `<p>${post.data.attributes.content}</p>`;
    postsContainer.innerHTML += `<hr>`;
    postsContainer.innerHTML += `<h2>Yorumlar:</h2>`;

    for (const comment of comments.data) {
        postsContainer.innerHTML += `<p>${comment.attributes.name} ${new Date(comment.attributes.createdAt).toLocaleString('tr')} demiş ki: <br>${comment.attributes.comment}  </p>`;
    }
}

async function showPostDetail(postId) {
    postsContainer.innerHTML = '';

    let post = await fetch(`http://localhost:1337/api/posts/${postId}`).then(x => x.json());
    postsContainer.innerHTML += `<h1>${post.data.attributes.title}</h1>`;
    postsContainer.innerHTML += `<p>${post.data.attributes.content}</p>`;
    postsContainer.innerHTML += `<hr>`;
    postsContainer.innerHTML += `<h2>Yorumlar:</h2>`;

    commentForm.style.display = 'block';

    await getComments(postId);

}

async function getPosts() {
    const response = await fetch('http://localhost:1337/api/posts');
    const postsData = await response.json();

    if (postsData.data && postsData.data.length > 0) {
        postsData.data.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post-preview');
            postElement.innerHTML = `
                <a href="javascript:void(0);" class="post-link" data-postid="${post.id}">
                    <h2 class="post-title">${post.attributes.title}</h2>
                    <h3 class="post-subtitle">${post.attributes.summary}</h3>
                </a>
            `;
            postElement.addEventListener('click', () => {
                const postId = post.id;
                showPostDetail(postId);

            });

            postsContainer.appendChild(postElement);
        });
    } else {
        postsContainer.innerHTML = 'Henüz gönderi yok.';
    }
}

async function getComments(postId) {
    try {
        const response = await fetch(`${baseUrl}comments?populate=*&filters[post][id][$eq]=${postId}`);
        const commentsData = await response.json();

        if (commentsData.data && commentsData.data.length > 0) {
            const comments = commentsData.data;

            for (const comment of comments) {
                // Her yorumu div içine yerleştirip bastım
                const commentDiv = document.createElement('div');
                commentDiv.classList.add('comment');
                commentDiv.innerHTML = `
                    <p><strong>${comment.attributes.name}</strong> ${new Date(comment.attributes.createdAt).toLocaleString('tr')} demiş ki: <br>${comment.attributes.comment}</p>
                `;
                postsContainer.appendChild(commentDiv);
            }
        } else {
            postsContainer.innerHTML += '<p>Henüz yorum yok.</p>';
        }
    } catch (error) {
        console.error('Yorumlar alınamadı', error);
    }

}

commentForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(commentForm);
    const formObj = Object.fromEntries(formData);
    formObj.post = 1;

    fetch('http://localhost:1337/api/comments', {
        method: 'POST',
        body: JSON.stringify({ data: formObj }),
        headers: {
            "Content-Type": "application/json"
        }
    }).catch(function () {
        alert('Gönderilemedi');
    }).then(function (response) {
        return response.json();
    }).then(function (responseData) {
        // Yorumları yeniden yükle
        const postId = responseData.data.attributes.post;
        getComments(postId);
        commentForm.reset();
    })
});
getPosts();