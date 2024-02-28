-- Data Manipulation Queries
/* Names: Cameron Rice, Brandon Healey */
/* Group: 82 */
/* Project Title: Library Database System */
/* Class: CS340 */
/* Description: Project Step 3 Final */

--
-- INSERT QUERIES
--

-- Query to add a book to the database
INSERT INTO Books (isbn, title, publicationYear, copiesAvailable, publisherID)
VALUES (:isbn_input, :title_input, :publication_year_input, :copies_available_input, :publisherID_from_publisher_name);

-- Query to add a publisher to the database
INSERT INTO Publishers (publisherName)
VALUES (:publisher_name_input);

-- Query to add an author to the database
INSERT INTO Authors (name, birthdate, biography)
VALUES (:author_name_input, :birthdate_input, :biography_input);

-- Query to add a user to the database
INSERT INTO Users (name, address, email, phoneNumber)
VALUES (:name_input, :address_input, :email_input, :phone_number_input);

-- Query to add a genre to the database
INSERT INTO Genres (genreName)
VALUES (:genre_name_input);

-- Query to add a review to a book
INSERT INTO Reviews (userID, isbn, rating, reviewText)
VALUES (:userID_from_account, :isbn_from_book_title, :ratingInput, :reviewTextInput);

-- Query to check out a book to a userID
INSERT INTO Books_Users (isbn, userID, dateBorrowed, dueDate)
VALUES (:isbn_from_book_title, :userID, :dateBorrowed_from_current_date, :dueDate_by_adding_checkout_period);

-- Query to add an author to a book
INSERT INTO Books_Authors (isbn, authorID)
VALUES (:isbn_from_book_title, :authorID_from_author_name);

-- Query to add a genre to a book
INSERT INTO Books_Genres (isbn, genreID)
VALUES (:isbn_from_book_title, :genreID_from_genre_name);

--
-- SELECT QUERIES
--

-- Query to get all books
SELECT * FROM Books;

-- Query to get all publishers
SELECT * FROM Publishers;

-- Query to get all authors
SELECT * FROM Authors;

-- Query to get all users
SELECT * FROM Users;

-- Query to get all genres
SELECT * FROM Genres;

-- Query to get all reviews
SELECT * FROM Reviews;

-- Query to get all books checked out by a user
SELECT * FROM Books_Users
WHERE userID = :userID_from_account;

-- Query to get all authors for a book
SELECT * FROM Books_Authors
WHERE isbn = :isbn_from_book_title;

-- Query to get all genres for a book
SELECT * FROM Books_Genres
WHERE isbn = :isbn_from_book_title;

-- Query to get all reviews for a book
SELECT * FROM Reviews
WHERE isbn = :isbn_from_book_title;

-- Query to get all books by a specific author
SELECT * FROM Books_Authors
WHERE authorID = :authorID_from_author_name;

-- Query to get all books in a specific genre
SELECT * FROM Books_Genres
WHERE genreID = :genreID_from_genre_name;

-- Query to get all books published by a specific publisher
SELECT * FROM Books
WHERE publisherID = :publisherID_from_publisher_name;

--
-- DELETE QUERIES
--

-- Delete a Book
DELETE FROM Books
WHERE isbn = :isbn_input

-- Delete a User
DELETE FROM Users
WHERE userID = :userID_from_name

-- Delete a Review
DELETE FROM Reviews
WHERE reviewID = :reviewID_from_review_text

-- Delete an Author
DELETE FROM Authors
WHERE authorID = :authorID_from_author_name

-- Delete a Genre
DELETE FROM Genres
WHERE genreID = :genreID_from_genre_name

-- Delete a Publisher
DELETE FROM Publisher
WHERE publisherID = :publisherID_from_publisher_name


--
-- UPDATE QUERIES
--

-- Query to update the number of copies available for a book
UPDATE Books
SET copiesAvailable = :newCopiesAvailable
WHERE isbn = :isbn_from_book_title;

-- Query to update the information for a book
UPDATE Books
SET title = :newTitle, publicationYear = :newPublicationYear, publisherID = :newPublisherID
WHERE isbn = :isbn_from_book_title;

-- Query to update the information for a publisher
UPDATE Publishers
SET publisherName = :newPublisherName
WHERE publisherID = :publisherID_from_publisher_name;

-- Query to update the information for an author
UPDATE Authors
SET name = :newAuthorName, birthdate = :newBirthdate, biography = :newBiography
WHERE authorID = :authorID_from_author_name;

-- Query to update the information for a user
UPDATE Users
SET name = :newName, address = :newAddress, email = :newEmail, phoneNumber = :newPhoneNumber
WHERE userID = :userID_from_account;

-- Query to update the information for a genre
UPDATE Genres
SET genreName = :newGenreName
WHERE genreID = :genreID_from_genre_name;

-- Query to update the information for a review
UPDATE Reviews
SET rating = :newRating, reviewText = :newReviewText
WHERE reviewID = :reviewID_from_review_text;

-- Query to update the author for a book
UPDATE Books_Authors
SET authorID = :newAuthorID
WHERE isbn = :isbn_from_book_title AND authorID = :authorID_from_author_name;

-- Query to update the genre for a book
UPDATE Books_Genres
SET genreID = :newGenreID
WHERE isbn = :isbn_from_book_title AND genreID = :genreID_from_genre_name;

-- Query to update the date returned for a book
UPDATE Books_Users
SET dateReturned = :dateReturned_from_current_date
WHERE isbn = :isbn_from_book_title AND userID = :userID_from_account;