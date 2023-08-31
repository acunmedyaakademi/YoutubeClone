const menuIcon = document.querySelector(".menu_icon")
const sidebar = document.querySelector(".sidebar")
const content = document.querySelector(".content")

menuIcon.onclick =function(){
    sidebar.classList.toggle("small-sidebar")
    content.classList.toggle("large-content")
}
