const apiUrl = 'http://localhost:1337/api';
const videoUrl = apiUrl + 'posts/';


const contentEl = document.querySelector('.content');
const table = document.querySelector('.tableOnee');



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

