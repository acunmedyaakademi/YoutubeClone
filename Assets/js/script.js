
const menuIcon = document.querySelector(".menu_icon")
const sidebar = document.querySelector(".sidebar")
const content = document.querySelector(".content")

menuIcon.onclick = function () {
    sidebar.classList.toggle("small-sidebar")
    content.classList.toggle("large-content")
}


const modalBtn = document.getElementById("modal-ac");
const modalKapat = document.getElementById("modal-kapat")
const modal = document.querySelector(".modal");
const formButton = document.getElementById("formButton");

modalBtn.addEventListener("click", () => {
    modal.style.display = "flex";
})

modalKapat.addEventListener("click", () => {
    modal.style.display = "none";
})


document.getElementById('formButton').addEventListener('click', function () {
    document.querySelector('.modal').style.display = 'none';


    document.getElementById('modal-ac').style.display = 'none'; 
});


//!--------------------FİLTERS--------------------//

let isTransitioning = false; 
let timeout; 

document.querySelector('.filter-optionstwo').addEventListener('click', function () {
    if (isTransitioning) {
        return; 
    }

    isTransitioning = true; 

    const filtersContainer = document.querySelector('.filters');
    const scrollAmount = 200; 
    const newButtons = [
        "Çocuk Videoları",
        "Yemek Pişirme Videoları",
        "Futbol Videoları",
        "ASMR",
        "Kedi Videoları",
        "Engelsiz Hayat",
        "Daha Fazla İçerik"
    ]; 

     
    const activeButton = document.querySelector('.filter-options.active');
    activeButton.classList.remove('active');
    activeButton.style.backgroundColor = '#dbdbdb'; 

  
    filtersContainer.scrollLeft += scrollAmount;


    const existingButtons = document.querySelectorAll('.filter-options:not(.filter-optionstwo)');
    existingButtons.forEach(function (button, index) {
        const previousText = button.textContent;
        button.textContent = newButtons[index];
    });


    const emptyButtons = document.querySelectorAll('.filter-options:empty');
    emptyButtons.forEach(function (button) {
        button.parentNode.removeChild(button);
    });

   
    clearTimeout(timeout);
    timeout = setTimeout(function () {
        filtersContainer.scrollLeft = 0; 
        isTransitioning = false; 
    }, 2000); 
});


