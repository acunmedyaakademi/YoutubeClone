const apiUrl = 'http://localhost:1337/api';
const videoUrl = apiUrl + 'posts';
let posts = [];


const contentEl = document.querySelector('.content');
const table = document.querySelector('.tableOnee');




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



const colmd10 = document.querySelector('.content .tableOnee .one');


function render() {
    for (let i = 0; i < 5; i++) {
        const currPost = posts[i];
        const firstSentence = getFirstSentence(currPost.content);
        colmd10.innerHTML += `
            <div class="content">
            <iframe class="iframe" width="560" height="315" src="https://www.youtube.com/embed/t5vrUExGYtw?si=BPRpb7sisSyvBF2q" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>${posts.id}</iframe>
            <h3 class="headerOne">${posts.attributes.title}</h3>
            <p class="paragone">${posts.attributes.summary}</p>
            </div>
        `;
    }
    bindPostsClicks();
}


async function handlePage() {
    let url = location.hash.substring(1);
    if(url.length < 1) {
        url = '/';
    }

}

handlePage();


addEventListener('hashchange', handlePage);



async function getPosts() {
    const response = await fetch('http://localhost:1337/api/posts');
    const postsData = await response.json();

    if (postsData.data && postsData.data.length > 0) {
        postsData.data.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('tableOnee');
            postElement.innerHTML = `
            <iframe class="iframe" width="560" height="315" src="https://www.youtube.com/embed/t5vrUExGYtw?si=BPRpb7sisSyvBF2q" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>${post.id}</iframe>
            <h3 class="headerOne">${post.attributes.title}</h3>
            <p class="paragone">${post.attributes.summary}</p>
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

