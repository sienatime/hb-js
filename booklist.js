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
var Book = function(bookTitle, genre, author, read) {
    this.bookTitle = bookTitle;
    this.genre = genre;
    this.author = author;
    this.read = read;
    this.readDate = null;
};



var gulliver = new Book("Gulliver's Travels", "Satire", "Johnathan Swift", false);
var oliver = new Book("Oliver Twist", "Historical", "Charles Dickens", true);
var twilight = new Book("Twilight", "Young Adult Fantasy", "Stephanie Meyers", false);
var potter = new Book("Harry Potter", "Fantasy", "JK Rowling", false);
var iceAndFire = new Book("Game of Thrones", "Fantasy", "George R R Martin", true);

var books = [gulliver, oliver, twilight, potter];

var myBooklist = new Booklist(books);
//myBooklist.finishCurrentBook();
myBooklist.add(iceAndFire);