const menuToggle = document.querySelector('.menuToggle');
const navigation = document.querySelector('.navigation');
menuToggle.addEventListener('click', function () {
    navigation.classList.toggle('open');
})
const list = document.querySelectorAll(".list")
function activeLink(){
    list.forEach((item) =>
        item.classList.remove("chosen"))
        this.classList.add("chosen")
}
list.forEach((item) =>
    item.addEventListener("click", activeLink))