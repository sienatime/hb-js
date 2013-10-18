var Booklist = function( arrayOfBooks ) {
    
    this.lastBook = null;
    this.bookShelf = [];
    this.booksRead = 0;
    this.booksNotRead = 0;
 
    this.addToDom = function(book){
        var content = document.getElementById("container");
        var p = document.createElement("p");
        p.setAttribute("id",book.bookTitle);
        p.className = "book";

        p.innerHTML="<img src="+book.coverURL+" class=\"cover\" width=\"200\"><ul><li>Title: " + book.bookTitle + "</li><li>Author: " + book.author + "</li></ul>";

        content.appendChild(p);

        if (book.read){
            showBookAsRead(book);
        }
    };

    this.add = function(book) {
        //add book to list
        this.bookShelf.push(book);
        if (book.read){
            this.booksRead++;
        }else{
            this.booksNotRead++;
        }
        this.addToDom(book);
    };

    for (var i = 0; i < arrayOfBooks.length; i++) {
        this.add(arrayOfBooks[i]);
    }

    this.currentBook = this.bookShelf[0];

    this.finishCurrentBook = function() {
        if(this.currentBook){
            this.currentBook.read = true;
            this.currentBook.readDate = Date.now();
            this.booksRead++;
            showBookAsRead(this.currentBook);
            this.booksNotRead--;
            this.lastBook = this.currentBook;
            this.resetStyle();
            this.currentBook = this.nextBook;
            styleCurrentBook(this.currentBook);
            this.nextBook = this.findNextBook();
        }else{
            console.log("You've read all the books!");
        }
    };

    this.findNextBook = function(){
        for (var i=0; i<this.bookShelf.length; i++) {
            book = this.bookShelf[i];

            if (!book.read && book.bookTitle != this.currentBook.bookTitle){
                console.log("Returning bookshelf at " + i);
                return this.bookShelf[i];
            }
        }
        return null;
    };

    this.resetStyle = function(){
        var last = document.getElementById(this.lastBook.bookTitle);
        console.log(last);
        last.className = "book read";
    };

    this.nextBook = this.findNextBook();

    //loop through all the books in the bookshelf, check if they are read or not, add to appropriate list
    //sum and add to either booksRead and booksNotRead
    for (var i=0; i<this.bookShelf.length; i++) {
        if (this.bookShelf[i].read === true){
            this.booksRead++;
        }else{
            this.booksNotRead++;
        }
    }
};

//read should be a boolean
var Book = function(bookTitle, genre, author, read, coverURL) {
    this.bookTitle = bookTitle;
    this.genre = genre;
    this.author = author;
    this.read = read;
    this.readDate = null;
    this.coverURL = coverURL;
};

function showBookAsRead(book){
    var p = document.getElementById(book.bookTitle);
    p.className = p.className + " read";
}

function styleCurrentBook(book) {
    var p = document.getElementById(book.bookTitle);
    p.className = p.className + " currentBook";
}

function addBook(e) {
    /* get all the values of the form, 
    make a new book object with those values,
    call booklist.add() with the new book we just made */
    bookTitle = document.getElementsByName("bookTitle")[0].value;
    bookGenre = document.getElementsByName("genre")[0].value;
    bookAuthor = document.getElementsByName("author")[0].value;
    bookRead = document.getElementsByName("read")[0].value;
    if (bookRead === "Yes") {
        bookRead = true;
    }else{
        bookRead = false;
    }
    bookCover = document.getElementsByName("coverURL")[0].value;

    var newBook = new Book(bookTitle, bookGenre, bookAuthor, bookRead, bookCover);
    myBooklist.add(newBook);
    
    // e.preventDefault(); // browser - don't act!
    // e.stopPropagation(); // bubbling - stop
    // return false; // added for completeness
}

var gulliver = new Book("Gulliver's Travels", "Satire", "Johnathan Swift", false, "http://4.bp.blogspot.com/-4G4nwN7K7mA/TkWDW4J_08I/AAAAAAAAAmc/xegiKU2mqDs/s400/Gulliver%2527s+Travels+movie+pictures+image.jpg");
var oliver = new Book("Oliver Twist", "Historical", "Charles Dickens", true, "http://www.mountainsoftravelphotos.com/ReferenceImages/Charles%20Dickins%20Oliver%20Twist%20Book.jpg");
var twilight = new Book("Twilight", "Young Adult Fantasy", "Stephanie Meyers", false, "http://upload.wikimedia.org/wikipedia/en/1/1d/Twilightbook.jpg");
var potter = new Book("Harry Potter", "Fantasy", "JK Rowling", false, "http://library.wheelock.edu/blog/wp-content/uploads/harrypotter.jpg");
var iceAndFire = new Book("Game of Thrones", "Fantasy", "George R R Martin", true, "http://3.bp.blogspot.com/-Sc5_-__fCsg/Tl6N3BQ03CI/AAAAAAAABGk/fpGPt74Jqk8/s1600/Game+of+thrones+US+1.jpg");

var books = [gulliver, iceAndFire, oliver, potter, twilight];
var myBooklist = new Booklist(books);

var content = document.getElementById("container");

// for (var i=0; i<myBooklist.bookShelf.length; i++) {
//     var p = document.createElement("p");
//     p.setAttribute("id",myBooklist.bookShelf[i].bookTitle);
//     p.className = "book";

//     p.innerHTML="<img src="+myBooklist.bookShelf[i].coverURL+" class=\"cover\" width=\"200\"><ul><li>Title: " + myBooklist.bookShelf[i].bookTitle + "</li><li>Author: " + myBooklist.bookShelf[i].author + "</li></ul>";

//     content.appendChild(p);

//     if (myBooklist.bookShelf[i].read){
//         showBookAsRead(myBooklist.bookShelf[i]);
//     }
// }

styleCurrentBook(myBooklist.currentBook);

var submitButton = document.getElementById("submitBook");
submitButton.addEventListener('click', addBook, false);