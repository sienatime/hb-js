var Booklist = function( arrayOfBooks ) {
    
    this.lastBook = null;
    this.bookShelf = arrayOfBooks;
    this.currentBook = this.bookShelf[0];

    this.booksRead = 0;
    this.booksNotRead = 0;
 
    this.add = function(book) {
        //add book to list
        this.bookShelf.push(book);
        if (book.read){
            this.booksRead++;
        }else{
            this.booksNotRead++;
        }
    };

    this.finishCurrentBook = function() {
        if(this.currentBook){
            this.currentBook.read = true;
            this.currentBook.readDate = Date.now();
            this.booksRead++;
            showBookAsRead(this.currentBook);
            this.booksNotRead--;
            this.lastBook = this.currentBook;
            this.currentBook = this.nextBook;
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

var gulliver = new Book("Gulliver's Travels", "Satire", "Johnathan Swift", false, "http://4.bp.blogspot.com/-4G4nwN7K7mA/TkWDW4J_08I/AAAAAAAAAmc/xegiKU2mqDs/s400/Gulliver%2527s+Travels+movie+pictures+image.jpg");
var oliver = new Book("Oliver Twist", "Historical", "Charles Dickens", true, "http://www.mountainsoftravelphotos.com/ReferenceImages/Charles%20Dickins%20Oliver%20Twist%20Book.jpg");
var twilight = new Book("Twilight", "Young Adult Fantasy", "Stephanie Meyers", false, "http://upload.wikimedia.org/wikipedia/en/1/1d/Twilightbook.jpg");
var potter = new Book("Harry Potter", "Fantasy", "JK Rowling", false, "http://library.wheelock.edu/blog/wp-content/uploads/harrypotter.jpg");
var iceAndFire = new Book("Game of Thrones", "Fantasy", "George R R Martin", true, "http://3.bp.blogspot.com/-Sc5_-__fCsg/Tl6N3BQ03CI/AAAAAAAABGk/fpGPt74Jqk8/s1600/Game+of+thrones+US+1.jpg");

var books = [gulliver, iceAndFire, oliver, potter];

var myBooklist = new Booklist(books);
//myBooklist.finishCurrentBook();
myBooklist.add(twilight);

var content = document.getElementById("container");

for (var i=0; i<myBooklist.bookShelf.length; i++) {
    var p = document.createElement("p");
    p.setAttribute("id",myBooklist.bookShelf[i].bookTitle);
    p.className = "book";

    p.innerHTML="<img src="+myBooklist.bookShelf[i].coverURL+" class=\"cover\" width=\"200\"><ul><li>Title: " + myBooklist.bookShelf[i].bookTitle + "</li><li>Author: " + myBooklist.bookShelf[i].author + "</li></ul>";
   
    content.appendChild(p);

    if (myBooklist.bookShelf[i].read){
        showBookAsRead(myBooklist.bookShelf[i]);
    }
}