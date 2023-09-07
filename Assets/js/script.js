const menuIcon = document.querySelector('.menu_icon');
const sidebar = document.querySelector('.sidebar');


menuIcon.onclick =function(){
    sidebar.classList.toggle("small-sidebar")
    content.classList.toggle("large-content")
}


