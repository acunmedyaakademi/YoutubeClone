// Sidebarın Açılıp Kapatılması
const menuIcon = document.querySelector(".menu_icon")
const sidebar = document.querySelector(".sidebar")
const content = document.querySelector(".content")

menuIcon.onclick = function () {
    sidebar.classList.toggle("small-sidebar")
    content.classList.toggle("large-content")
}

// Oturum Açma Sayfasındaki Formun Açılıp Kapatılması 
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

//*******************/
// Oturum Aç butonuna tıklandığında
document.getElementById('formButton').addEventListener('click', function () {
    document.querySelector('.modal').style.display = 'none';

    // Oturum Aç butonunu gizle
    document.getElementById('modal-ac').style.display = 'none'; 
});


//!--------------------FİLTERS--------------------//

let isTransitioning = false; // Geçiş durumunu kontrol etmek için bir bayrak (flag)
let timeout; // Zamanlayıcı için değişken

document.querySelector('.filter-optionstwo').addEventListener('click', function () {
    if (isTransitioning) {
        return; // Geçiş sırasında tıklamayı engelle
    }

    isTransitioning = true; // Geçiş başladı

    const filtersContainer = document.querySelector('.filters');
    const scrollAmount = 200; // Kaydırma miktarı
    const newButtons = [
        "Çocuk Videoları",
        "Yemek Pişirme Videoları",
        "Futbol Videoları",
        "ASMR",
        "Kedi Videoları",
        "Engelsiz Hayat",
        "Daha Fazla İçerik"
    ]; // Eklemek istediğiniz yeni butonlar

    // Aktif butonun sınıfını  ve rengini değiştir 
    const activeButton = document.querySelector('.filter-options.active');
    activeButton.classList.remove('active');
    activeButton.style.backgroundColor = '#dbdbdb'; // Renk düzeltmesi

    // Düğmeleri yana kaydır
    filtersContainer.scrollLeft += scrollAmount;

    // Mevcut butonları önceki halleriyle değiştir
    const existingButtons = document.querySelectorAll('.filter-options:not(.filter-optionstwo)');
    existingButtons.forEach(function (button, index) {
        const previousText = button.textContent;
        button.textContent = newButtons[index];
    });

    // Boş butonları kaldır
    const emptyButtons = document.querySelectorAll('.filter-options:empty');
    emptyButtons.forEach(function (button) {
        button.parentNode.removeChild(button);
    });

    // İşlem yapılmazsa 2 saniye sonra başa dön
    clearTimeout(timeout);
    timeout = setTimeout(function () {
        filtersContainer.scrollLeft = 0; // Başa dön
        isTransitioning = false; // Geçiş tamamlandı
    }, 2000); // 2 saniye bekleyin
});


