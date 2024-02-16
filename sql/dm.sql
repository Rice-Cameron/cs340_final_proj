-- Data Manipulation Queries
-- File to allow for users to interact with data
-- Ex: Users writing reviews, users getting assigned books they checked out

-- Query to add a review to a book
INSERT INTO Reviews (userID, isbn, rating, reviewText)
VALUES (:userID, :isbn, :rating, :reviewText);

-- Query to check out a book to a userID
INSERT INTO Books_Users (isbn, userID, dateBorrowed, dueDate)
VALUES (:isbn, :userID, :dateBorrowed, :dueDate);

/*
INSERT INTO Genres (genreName)
VALUES
('Dystopian Fiction'),
('Southern Gothic'),
('Coming-of-Age Fiction');

INSERT INTO Authors (name, birthdate, biography)
VALUES
('George Orwell', '1903-06-25', 'British novelist, essayist, journalist, and critic.'),
('Harper Lee', '1926-04-28', 'American novelist widely known for "To Kill a Mockingbird".'),
('J.D. Salinger', '1919-01-01', 'American writer best known for his novel "The Catcher in the Rye".');

INSERT INTO Publishers(publisherName)
VALUES
('Penguin Books'),
('Harper Perennial Modern Classics'),
('Little, Brown and Company');

INSERT INTO Books(isbn, title, authorID, genreID, publicationYear, copiesAvailable, publisherID)
VALUES
('978-1982131739', '1984', (SELECT authorID from Authors where name='George Orwell'), (SELECT genreID from Genres where genreName = 'Dystopian Fiction'), 1949, 5, (SELECT publisherID from Publishers where publisherName='Penguin Books')),
('978-0061120084', 'To Kill a Mockingbird', (SELECT authorID from Authors where name='Harper Lee'), (SELECT genreID from Genres where genreName = 'Southern Gothic'), 1960, 3, (SELECT publisherID from Publishers where publisherName='Harper Perennial Modern Classics')),
('978-0307474278', 'The Catcher in the Rye', (SELECT authorID from Authors where name='J.D. Salinger'), (SELECT genreID from Genres where genreName = 'Coming-of-Age Fiction'), 1951, 7, (SELECT publisherID from Publishers where publisherName='Little, Brown and Company'));

INSERT INTO Users (name, address, email, phoneNumber)
VALUES
('John Smith', '123 Main St, Corvallis, USA', 'john.smith@email.com', '555-123-4567'),
('Emily Johnson', '456 Elm St, Corvallis, USA', 'emily.johnson@email.com', '555-987-6543'),
('Michael Brown', '789 Oak St, Corvallis, USA', 'michael.brown@email.com', '555-876-5432');

*/