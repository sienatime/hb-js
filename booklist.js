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

        p.innerHTML="<img src="+book.coverURL+" class=\"cover\" height=\"300\"><ul><li>Title: " + book.bookTitle + "</li><li>Author: " + book.author + "</li></ul>";

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
            removeFinishButton();
            this.currentBook = this.nextBook;
            styleCurrentBook(this.currentBook);
            addFinishButton();
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

function addBook() {
    /* get all the values of the form, 
    make a new book object with those values,
    call booklist.add() with the new book we just made */
    var bookTitle = document.getElementsByName("bookTitle")[0].value;
    var bookGenre = document.getElementsByName("genre")[0].value;
    var bookAuthor = document.getElementsByName("author")[0].value;
    var bookRead = document.getElementsByName("read")[0].checked;
    var bookCover = document.getElementsByName("coverURL")[0].value;

    if (!checkFormData(bookTitle, bookGenre, bookAuthor, bookCover)){
        return;
    }

    var newBook = new Book(bookTitle, bookGenre, bookAuthor, bookRead, bookCover);
    myBooklist.add(newBook);

    document.getElementsByName("bookTitle")[0].value = "";
    document.getElementsByName("genre")[0].value = "";
    document.getElementsByName("author")[0].value = "";
    document.getElementsByName("read")[0].checked = false;
    document.getElementsByName("coverURL")[0].value = "";
    
    // e.preventDefault(); // browser - don't act!
    // e.stopPropagation(); // bubbling - stop
    // return false; // added for completeness
}

function checkFormData(bookTitle, bookGenre, bookAuthor, bookCover){
    var errors = document.getElementsByClassName("error");
    //check the data
    var flag = true;
    //blank strings are falsey
    if (!bookTitle){
        errors[0].setAttribute("style","display: inline");
        flag = false;
    }else{
        errors[0].setAttribute("style","display: none");
    }

    if(!bookGenre){
        errors[1].setAttribute("style","display: inline");
        flag = false;
    }else{
        errors[1].setAttribute("style","display: none");
    }

    if(!bookAuthor){
        errors[2].setAttribute("style","display: inline");
        flag = false;
    }else{
        errors[2].setAttribute("style","display: none");
    }

    var imgregex = /\.(png|gif|jpg)$/;

    if(!bookCover || !imgregex.exec(bookCover)){
        errors[3].setAttribute("style","display: inline");
        flag = false;
    }else{
        errors[3].setAttribute("style","display: none");
    }

    return flag;
}

function callFinishBook(){
    myBooklist.finishCurrentBook();
}

function addFinishButton(){
    var finishButton = document.createElement("button");
    finishButton.setAttribute("id","finish");

    finishButton.innerHTML = "Finish This Book";
    var currentBook = document.getElementsByClassName("currentBook")[0];
    currentBook.appendChild(finishButton);
    finishButton.addEventListener('click', callFinishBook, false);
}

function removeFinishButton(){
    var node = document.getElementById("finish");
    if (node.parentNode) {
      node.parentNode.removeChild(node);
    }
}

function checkKeypress(e) {
    if (e.charCode == 13) {
        addBook();
    }
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

var inputFields = document.getElementsByTagName("input");

for (var i = 0; i < inputFields.length; i++) {
    if(inputFields[i].type === "text"){
        //add event listener for keypress of Enter
        inputFields[i].addEventListener('keypress', checkKeypress, false);
    }
}

addFinishButton();