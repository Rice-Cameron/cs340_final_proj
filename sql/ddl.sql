-- Data Definition Queries

-- MAKE THE CHANGES STATED IN THE STEP 3 WORD DOC

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT=0;

CREATE OR REPLACE TABLE Books (
    isbn varchar(255) NOT NULL,
    title varchar(255) NOT NULL,
    authorID int NOT NULL,
    genreID int NOT NULL,
    publicationYear int NOT NULL,
    copiesAvailable int NOT NULL DEFAULT 0,
    publisherID int NOT NULL,
    UNIQUE (isbn),
    PRIMARY KEY (isbn),
    FOREIGN KEY (authorID) REFERENCES Authors(authorID),
    FOREIGN KEY (genreID) REFERENCES Genres(genreID),
    FOREIGN KEY (publisherID) REFERENCES Publishers(publisherID)
);

CREATE OR REPLACE TABLE Publishers (
    publisherID int AUTO_INCREMENT NOT NULL,
    publisherName varchar(255) NOT NULL,
    UNIQUE (publisherID),
    PRIMARY KEY (publisherID)
);

CREATE OR REPLACE TABLE Authors (
    authorID int AUTO_INCREMENT NOT NULL,
    name varchar(255) NOT NULL,
    birthdate date,
    biography text,
    UNIQUE (authorID),
    PRIMARY KEY (authorID)
);

CREATE OR REPLACE TABLE Users (
    userID int AUTO_INCREMENT NOT NULL,
    name varchar(255) NOT NULL,
    address varchar(255),
    email varchar(255) NOT NULL,
    phoneNumber varchar(255),
    UNIQUE (userID),
    PRIMARY KEY (userID)
);

CREATE OR REPLACE TABLE Genres (
    genreID int AUTO_INCREMENT NOT NULL,
    genreName varchar(255) NOT NULL,
    UNIQUE (genreID),
    PRIMARY KEY (genreID)
);

CREATE OR REPLACE TABLE Reviews (
    reviewID int AUTO_INCREMENT NOT NULL,
    userID int NOT NULL,
    isbn varchar(255) NOT NULL,
    rating int NOT NULL,
    reviewText text,
    UNIQUE (reviewID),
    PRIMARY KEY (reviewID),
    FOREIGN KEY (userID) REFERENCES Users(userID),
    FOREIGN KEY (isbn) REFERENCES Books(isbn)
);

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


INSERT INTO Reviews(userID, isbn, rating, reviewText)
VALUES
((SELECT userID from Users where userID = 1), (SELECT isbn from Books where isbn = '978-1982131739'), 4, 'A thought-provoking classic that remains relevant to this day.'),
((SELECT userID from Users where userID = 2), (SELECT isbn from Books where isbn = '978-0061120084'), 5, 'A timeless masterpiece with powerful themes.'),
((SELECT userID from Users where userID = 3), (SELECT isbn from Books where isbn = '978-0307474278'), 3, 'An interesting coming-of-age story, but not my favorite."');

SET FOREIGN_KEY_CHECKS=1;
COMMIT;