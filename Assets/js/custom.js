const contentVideo = document.querySelector('.content-video');
const baseUrl = 'http://localhost:1337/api/';
const commentForm = document.querySelector('.comment form');

async function loadData() {
    contentVideo.innerHTML = '';
    let post = await fetch('http://localhost:1337/api/posts/5').then(x => x.json());
    let comments = await fetch('http://localhost:1337/api/comments?filters[post][id][$eq]=' + post.data.id).then(x => x.json());
    contentVideo.innerHTML += `<h1>${post.data.attributes.title}</h1>`;
    contentVideo.innerHTML += `<p>${post.data.attributes.content}</p>`;
    contentVideo.innerHTML += `<hr>`;
    contentVideo.innerHTML += `<h2>Yorumlar:</h2>`;

    for (const comment of comments.data) {
        contentVideo.innerHTML += `<p>${comment.attributes.name} ${new Date(comment.attributes.createdAt).toLocaleString('tr')} demiş ki: <br>${comment.attributes.comment}  </p>`;
    }
}

async function showPostDetail(postId) {
    contentVideo.innerHTML = '';

    let post = await fetch(`http://localhost:1337/api/posts/${postId}`).then(x => x.json());
    contentVideo.innerHTML += `<h1>${post.data.attributes.title}</h1>`;
    contentVideo.innerHTML += `<p>${post.data.attributes.content}</p>`;
    contentVideo.innerHTML += `<hr>`;
    contentVideo.innerHTML += `<h2>Yorumlar:</h2>`;

    commentForm.style.display = 'block';

    await getComments(postId);

}

async function getPosts() {
    const response = await fetch('http://localhost:1337/api/posts');
    const postsData = await response.json();

    if (postsData.data && postsData.data.length > 0) {
        postsData.data.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('content');
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

            contentVideo.appendChild(postElement);
        });
    } else {
        contentVideo.innerHTML = 'Henüz gönderi yok.';
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
                contentVideo.appendChild(commentDiv);
            }
        } else {
            contentVideo.innerHTML += '<p>Henüz yorum yok.</p>';
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