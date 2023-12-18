let myLibrary = []

function Book (title, author, pages, read){
    this.title = title;
    this.author = author;
    this.page = pages;
    this.read = read;
}

function addBookToLibrary(book){
    myLibrary.push(book);
}
function removeBook(removeBook){
    myLibrary = myLibrary.filter((book) => removeBook !== book);
}

const book_1 = new Book("Book1", "Author1", 694, false);
const book_2 = new Book("Book2", "Author2", 694, false);
const book_3 = new Book("book3", "Author3", 694, true);
addBookToLibrary(book_1);
addBookToLibrary(book_2);
addBookToLibrary(book_3);

const book_grid = document.querySelector(".book-grid");

function addBookToPage(book){
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
        book_grid.removeChild(book_card);
        removeBook(book);
    }
    book_card.appendChild(close_btn);

    // creating read button/status
    const read_status = document.createElement('button');
    read_status.classList.add('read-status');
    if(book.read)
    {
        read_status.classList.add('read');
        read_status.textContent = "Read"
    }
    else{
        read_status.textContent = "Not Read"
    }
    read_status.onclick = () =>{
        read_status.classList.toggle('read');
        if(read_status.classList.contains("read")){
            read_status.textContent = "Read";
        }
        else{
            read_status.textContent = "Not Read";
        }
    }
    book_card.appendChild(read_status);

    book_grid.appendChild(book_card);
}

for(const book of myLibrary)
{
    addBookToPage(book);
}