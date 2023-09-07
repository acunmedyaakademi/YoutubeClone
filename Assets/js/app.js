const apiUrl = 'http://localhost:1337/api';
const videoUrl = apiUrl + 'posts/';


const content = document.querySelector('.content');
const table = document.querySelector('.tableOnee');




addEventListener('hashchange', handleRoute);

async function handleSubpageLoad(data) {
    document.querySelector('.pageTitle').innerText = data.title;
    document.querySelector('.pageContent').innerHTML = data.body;


}


async function handleRoute() {
    let url = location.hash.substring(1);
    if(url.length < 1) {
        url = '/';
    }

}



handleRoute();