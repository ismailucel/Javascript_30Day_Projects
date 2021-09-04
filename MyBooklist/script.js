// book class : represent a single book

class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// ui class : handle user interface

class UI {
    static displayBooks() {

        const books = Store.getBooks();

        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href ="#" class ="btn btn-danger btn-sm delete">X</a></td> 
        `;

        list.appendChild(row);

    }

    static deleteBook(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove(); //elementin parentinin parenti tüm satır olur
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));// put something in the div
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form); //divi formdan önce container'a ekle

        //vanish in 3s

        setTimeout(() => {
            document.querySelector('.alert').remove()
        }, 3000);
    }

    static clearFields() {
        document.querySelector('#title').value = "";
        document.querySelector('#author').value = "";
        document.querySelector('#isbn').value = "";
    }
}

// store class : handles local storage

class Store {

    // metotlar static çükü instantiate etmeden çağırmamız lazım

    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books')); //object arrayi olarak kullanmak için parse ettik
        }

        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books)); //local storage şu anda array olduğu için stringe dönüştürdük
    }

    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

// events : display books

document.addEventListener('DOMContentLoaded', UI.displayBooks);

// events : add books

document.querySelector('#book-form').addEventListener('submit', (e) => {

    e.preventDefault();

    //get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    // validate book

    if (title === '' || author === '' || isbn === '') {
        UI.showAlert('Please fill in al fields', 'danger');
    } else {
        // instatiate book

        const book = new Book(title, author, isbn);

        // add book to UI

        UI.addBookToList(book);

        // add book to store

        Store.addBook(book);

        //Show success message

        UI.showAlert('Book added', 'success');

        // clear field

        UI.clearFields();
    }




})

// events : remove books

document.querySelector('#book-list').addEventListener('click', (e) => {

    // remove book from uı
    UI.deleteBook(e.target);

    // remove book from store

    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    //Show success message

    UI.showAlert('Book removed', 'success');
});