-- Data Definition Queries
/* Names: Cameron Rice, Brandon Healey */
/* Group: 82 */
/* Project Title: Library Database System */
/* Class: CS340 */
/* Description: Project Step 3 Draft */


SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT=0;

--
-- CREATE TABLES
--

CREATE OR REPLACE TABLE Books (
    isbn varchar(17) NOT NULL,
    title varchar(140) NOT NULL,
    publicationYear int NOT NULL,
    copiesAvailable int NOT NULL DEFAULT 0,
    publisherID int NOT NULL,
    UNIQUE (isbn),
    PRIMARY KEY (isbn),
    FOREIGN KEY (publisherID) REFERENCES Publishers(publisherID) ON DELETE CASCADE
);

CREATE OR REPLACE TABLE Publishers (
    publisherID int AUTO_INCREMENT NOT NULL,
    publisherName varchar(100) NOT NULL,
    UNIQUE (publisherID),
    PRIMARY KEY (publisherID)
);

-- Maybe add, CONSTRAINT publishedBook FOREIGN KEY (isbn) REFERENCES Books(isbn) ON DELETE CASCADE
CREATE OR REPLACE TABLE Authors (
    authorID int AUTO_INCREMENT NOT NULL,
    name varchar NOT NULL,
    birthdate date,
    biography text,
    UNIQUE (authorID),
    PRIMARY KEY (authorID)
);

CREATE OR REPLACE TABLE Users (
    userID int AUTO_INCREMENT NOT NULL,
    name varchar(100) NOT NULL,
    address varchar(95),
    email varchar(100) NOT NULL,
    phoneNumber varchar(20),
    UNIQUE (userID),
    PRIMARY KEY (userID)
);

CREATE OR REPLACE TABLE Genres (
    genreID int AUTO_INCREMENT NOT NULL,
    genreName varchar(40) NOT NULL,
    UNIQUE (genreID),
    PRIMARY KEY (genreID)
);

CREATE OR REPLACE TABLE Reviews (
    reviewID int AUTO_INCREMENT NOT NULL,
    userID int NOT NULL,
    isbn varchar(17) NOT NULL,
    rating int NOT NULL,
    reviewText text,
    UNIQUE (reviewID),
    PRIMARY KEY (reviewID),
    FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE CASCADE,
    FOREIGN KEY (isbn) REFERENCES Books(isbn) ON DELETE CASCADE
);

--
-- INTERSECTION TABLES
--

CREATE OR REPLACE TABLE Books_Authors (
    authorshipID int AUTO_INCREMENT NOT NULL,
    isbn varchar(17) NOT NULL,
    authorID int NOT NULL,
    PRIMARY KEY (authorshipID),
    FOREIGN KEY (isbn) REFERENCES Books(isbn) ON DELETE CASCADE,
    FOREIGN KEY (authorID) REFERENCES Authors(authorID) ON DELETE CASCADE
);

CREATE OR REPLACE TABLE Books_Users (
    borrowingID int AUTO_INCREMENT NOT NULL,
    isbn varchar(17) NOT NULL,
    userID int NOT NULL,
    dateBorrowed date NOT NULL,
    dueDate date,
    PRIMARY KEY (borrowingID),
    FOREIGN KEY (isbn) REFERENCES Books(isbn) ON DELETE CASCADE,
    FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE CASCADE
);

CREATE OR REPLACE TABLE Books_Genres (
    assignmentID int AUTO_INCREMENT NOT NULL,
    isbn varchar(17) NOT NULL,
    genreID int NOT NULL,
    PRIMARY KEY (assignmentID),
    FOREIGN KEY (isbn) REFERENCES Books(isbn) ON DELETE CASCADE,
    FOREIGN KEY (genreID) REFERENCES Genres(genreID) ON DELETE CASCADE
);


--
-- INSERT DATA
--

-- Insert data into Genres
INSERT INTO Genres (genreName)
VALUES
('Dystopian Fiction'),
('Southern Gothic'),
('Coming-of-Age Fiction');

-- Insert data into Authors
INSERT INTO Authors (name, birthdate, biography)
VALUES
('George Orwell', '1903-06-25', 'British novelist, essayist, journalist, and critic.'),
('Harper Lee', '1926-04-28', 'American novelist widely known for "To Kill a Mockingbird".'),
('J.D. Salinger', '1919-01-01', 'American writer best known for his novel "The Catcher in the Rye".');

-- Insert data into Publishers
INSERT INTO Publishers(publisherName)
VALUES
('Penguin Books'),
('Harper Perennial Modern Classics'),
('Little, Brown and Company');

-- Insert data into Books
INSERT INTO Books(isbn, title, publicationYear, copiesAvailable, publisherID)
VALUES
('978-1982131739', '1984', 1949, 5, (SELECT publisherID from Publishers where publisherName='Penguin Books')),
('978-0061120084', 'To Kill a Mockingbird', 1960, 3, (SELECT publisherID from Publishers where publisherName='Harper Perennial Modern Classics')),
('978-0307474278', 'The Catcher in the Rye', 1951, 7, (SELECT publisherID from Publishers where publisherName='Little, Brown and Company'));

-- Insert data into Users
INSERT INTO Users (name, address, email, phoneNumber)
VALUES
('John Smith', '123 Main St, Corvallis, USA', 'john.smith@email.com', '555-123-4567'),
('Emily Johnson', '456 Elm St, Corvallis, USA', 'emily.johnson@email.com', '555-987-6543'),
('Michael Brown', '789 Oak St, Corvallis, USA', 'michael.brown@email.com', '555-876-5432');

-- Insert data into Books_Authors
INSERT INTO Books_Authors (isbn, authorID)
VALUES
('978-1982131739', (SELECT authorID from Authors where name='George Orwell')),
('978-0061120084', (SELECT authorID from Authors where name='Harper Lee')),
('978-0307474278', (SELECT authorID from Authors where name='J.D. Salinger'));

-- Insert data into Books_Genres
INSERT INTO Books_Genres (isbn, genreID)
VALUES
('978-1982131739', (SELECT genreID from Genres where genreName = 'Dystopian Fiction')),
('978-0061120084', (SELECT genreID from Genres where genreName = 'Southern Gothic')),
('978-0307474278', (SELECT genreID from Genres where genreName = 'Coming-of-Age Fiction'));

-- Insert data into Reviews
-- Eventually, data will be added from user input through dm.sql
INSERT INTO Reviews(userID, isbn, rating, reviewText)
VALUES
((SELECT userID from Users where name = 'John Smith'), '978-1982131739', 4, 'A thought-provoking classic that remains relevant to this day.'),
((SELECT userID from Users where name = 'Emily Johnson'), '978-0061120084', 5, 'A timeless masterpiece with powerful themes.'),
((SELECT userID from Users where name = 'Michael Brown'), '978-0307474278', 3, 'An interesting coming-of-age story, but not my favorite.');
SET FOREIGN_KEY_CHECKS=1;
COMMIT;