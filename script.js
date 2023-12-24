class Book {
    constructor(title, author, pages, isRead){
        this.title = title;
        this.author = author;
        this.page = pages;
        this.isRead = isRead;
    }
}

class Library{
    constructor(...books){
        this.myLibrary = books;
        this.init();
        for(let book of books){
            this.addBookToPage(book);
        }
    }
    init() {
        this.cacheDom();
        this.bindEvents();
    }
    cacheDom() {
        this.add_new_book_dialog = document.getElementById("add-new-book-dialog");
        this.submit_new_book_btn = document.getElementById("submit-new-book-btn");
        this.cancel_new_book_btn = document.getElementById("cancel-new-book-btn");
        this.add_new_book_btn = document.querySelector(".add-book-btn");
        this.form = document.getElementById('add-new-book-form');
        this.book_grid = document.querySelector(".book-grid");
    }
    bindEvents() {
        this.add_new_book_btn.addEventListener("click", (event) => this.openModal (event))
        
        // Add an event listener to the form for form submission
        this.form.addEventListener('submit', (event) => this.newBookSubmission(event));
        
        this.cancel_new_book_btn.addEventListener('click', (event) => this.cancelNewBookSubmission(event));
    }
    openModal(event){
        this.add_new_book_dialog.showModal();
    }
    cancelNewBookSubmission(event){
        event.preventDefault();
        this.form.reset();
        this.add_new_book_dialog.close();
    }
    newBookSubmission (event) {
        // Prevent the default form submission behavior
        event.preventDefault();
        // Access the form elements directly
        const book = this.getBookFromInput();
        this.addBookToLibrary(book);
        this.addBookToPage(book);
        // Reset the form for a new entry 
        this.form.reset();
        this.add_new_book_dialog.close();
    }
    addBookToLibrary(book){
        this.myLibrary.push(book);
    }
    removeBook(removeBook){
        this.myLibrary = this.myLibrary.filter((book) => removeBook !== book);
    }
    getBookFromInput() {
        const title = document.getElementById('input-title').value;
        const author = document.getElementById('input-author').value;
        const pages = document.getElementById('input-pages').value;
        const isRead = document.getElementById('input-read').checked;
        return new Book(title, author, pages, isRead);
    }
    addBookToPage(book){
        const book_card = document.createElement('div');
        book_card.classList.add('book-card');
    
        const book_title = document.createElement('p');
        book_title.classList.add('book-title');
        const book_page = document.createElement('p');
        book_page.classList.add('book-page');
        const book_author = document.createElement('p');
        book_author.classList.add('book-author');
    
        book_title.textContent = "Title: " + book.title;
        book_page.textContent = "Pages: " + book.page;
        book_author.textContent = "Author: " + book.author;
    
        book_card.appendChild(book_title);
        book_card.appendChild(book_author);
        book_card.appendChild(book_page)
    
        // creating close button
        const close_btn = document.createElement('div');
        close_btn.textContent = "✕"
        close_btn.classList.add('close-button');
        close_btn.onclick = () => {
            this.book_grid.removeChild(book_card);
            this.removeBook(book);
        }
        book_card.appendChild(close_btn);
    
        // creating read button/status
        const read_status = document.createElement('button');
        read_status.classList.add('read-status');
        if(book.isRead)
        {
            read_status.classList.add('read');
            read_status.textContent = "Read"
        }
        else{
            read_status.textContent = "Not Read"
        }
        read_status.onclick = () =>{
            read_status.classList.toggle('read');
            const newStatus = read_status.classList.contains("read");
            this.updateReadStatus(book, newStatus);
            read_status.textContent = newStatus ? "Read" : "Not Read";
        }
        book_card.appendChild(read_status);
        this.book_grid.appendChild(book_card);
    }
    updateReadStatus(book, newStatus) {
        book.isRead = newStatus;
    }
    get getLibrary(){
        return this.myLibrary;
    }
}
 


const book_1 = new Book("Book1", "Author1", 694, false);
const book_2 = new Book("Book2", "Author2", 694, false);
const book_3 = new Book("book3", "Author3", 694, true);
const library  = new Library(book_1, book_2, book_3);