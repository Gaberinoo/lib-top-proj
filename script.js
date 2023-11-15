let bookShelf = document.querySelector('.shelf');
let addBook = document.querySelector('.add-book');
let dialog = document.querySelector('dialog');
let submitBook = document.querySelector('.sub-book');
let cancel = document.querySelector('.cancel');

const myLibrary = [];

function CreateBook(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function pushBook(obj) {
    myLibrary.push(obj);
    return myLibrary;
}

addBook.addEventListener('click', () => {
    dialog.showModal();
})

cancel.addEventListener('click', () => {
    dialog.close();
})

submitBook.addEventListener('click', (e) => {
    e.preventDefault();
    let titleEl = document.querySelector('#title').value;
    let authorEl = document.querySelector('#author').value;
    let pagesEl = document.querySelector('#pages').value;
    let statusEl = document.querySelector('input[name="read"]:checked').value;
    if (statusEl === 'read') {
        statusEl = 'Read';
    } else statusEl = 'Not read';
    let newBook = new createBook(titleEl, authorEl, pagesEl, statusEl);
    pushBook(newBook);
    document.getElementById('form').reset();
    dialog.close();
})

submitBook.addEventListener('click', (e) => {
    e.preventDefault();
    let bookNodes = document.querySelectorAll('.book-card');
    for (let i = 0; i < myLibrary.length; i++) {
        if (!bookNodes[i]) {
            let bookCard = document.createElement('div');
            bookCard.classList.add('book-card');
            bookCard.setAttribute('data-idx', `${i}`)
            for (const property in myLibrary[i]) {
                let bookProp = document.createElement('p')
                bookProp.textContent = `${myLibrary[i][property]}`;
                bookCard.appendChild(bookProp);
            }
            let changeStatus = document.createElement('button');
            let remove = document.createElement('button');
            changeStatus.setAttribute('data-change', `${i}`);
            remove.setAttribute('data-remove', `${i}`);
            if (myLibrary[i].status === 'Read') {
                changeStatus.textContent = 'Mark as "Not read"';
            } else {
                changeStatus.textContent = 'Mark as "Read"'
            }
            remove.textContent = 'Remove book.'
            bookCard.appendChild(changeStatus);
            bookCard.appendChild(remove);
            bookShelf.appendChild(bookCard);
        } else {
            let bookData = parseInt(bookNodes[i].getAttribute('data-idx'));
            if (bookData === i) {
                continue;
            }
        }
    }
})

document.addEventListener('click', (e) => {
    if (e.target.hasAttribute('data-change')) {
        let data = parseInt(e.target.getAttribute('data-change'));
        if (myLibrary[data].status === 'Read') {
            myLibrary[data].status = 'Not read';
            e.target.textContent = 'Mark as "Read"'
        } else {
            myLibrary[data].status = 'Read';
            e.target.textContent = 'Mark as "Not read"'
        }
        let statusEl = document.querySelectorAll('.book-card :nth-child(4)');
        statusEl[data].textContent = myLibrary[data].status;
    } else return;
})

document.addEventListener('click', (e) => {
    if (e.target.hasAttribute('data-remove')) {
        let data = parseInt(e.target.getAttribute('data-remove'));
        let card = document.querySelectorAll('.book-card');
        card[data].style = 'display: none';
    } else return;
})
