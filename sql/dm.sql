-- Data Manipulation Queries
-- File to allow for users to interact with data
-- Ex: Users writing reviews, users getting assigned books they checked out

-- Query to add a review to a book
INSERT INTO Reviews (userID, isbn, rating, reviewText)
VALUES (:userID, :isbn, :rating, :reviewText);

-- Query to check out a book to a userID
INSERT INTO Books_Users (isbn, userID, dateBorrowed, dueDate)
VALUES (:isbn, :userID, :dateBorrowed, :dueDate);

