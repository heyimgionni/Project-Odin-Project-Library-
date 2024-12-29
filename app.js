const plusBtn = document.querySelector(".btn-plus")
const myLibray = JSON.parse(localStorage.getItem("myLibrary")) || []
const titleBook = document.querySelector(".title-book")
const genreBook = document.querySelector(".genre-book")
const pages = document.querySelector(".pages")
const checked = document.querySelector("input[type='checkbox']")
const add = document.querySelector(".btn-add")
function Book(title,genre,pages,read) {
    this.title = title
    this.genre = genre
    this.pages = pages
    this.read = read
}
function addBookToLibrary(book) {
    myLibray.push(book)
    localStorage.setItem("myLibrary",JSON.stringify(myLibray))
}
function renderBook() {
    const wrapper = document.querySelector(".wrapper")
    wrapper.innerHTML =""
    myLibray.forEach((book,i) => {
        wrapper.innerHTML += `
        <div class="card" data-index=${i}>
            <div class="card-title">
               <h3>Title: ${book.title}</h3>
            </div>
            <div class="card-body">
                <p>Genre: ${book.genre}</p>
                <p>Pages: ${book.pages}</p>
                <p>Read: ${checked.checked}</p>
            </div>
            <button class="btn-delete">Delete</button>
        </div>
        `;
    });
    document.querySelectorAll(".btn-delete").forEach((btn,index) => {
        btn.addEventListener("click", ()=> {
            myLibray.splice(index,1)
            localStorage.setItem("myLibrary", JSON.stringify(myLibray))
            renderBook()
        })
    })   
}
const init = () => {
    renderBook(); // Mostra le card salvate
    // show book Cards
    // plus btn
    plusBtn.addEventListener("click",(e)=> {
        e.preventDefault()
        document.querySelector(".modal").classList.toggle("none")
    })
    // add btn 
    add.addEventListener("click" , e => {
        e.preventDefault()
        const newBook = new Book(
            titleBook.value,
            genreBook.value,
            pages.value,
            checked.checked
        )
        addBookToLibrary(newBook)
        renderBook()
        titleBook.value = ""
        genreBook.value = ""
        pages.value = ""
        setTimeout(()=> {
            document.querySelector(".modal").classList.toggle("none")
        },100)
    })
}
init()
