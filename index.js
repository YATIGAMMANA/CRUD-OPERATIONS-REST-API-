const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

const books = [
    { 
        title: "Madol Doowa", 
        author: "Martin Wickramasinghe",
        year: 1947
    },
    {
        title: "Gamperaliya",
        author: "Martin Wickramasinghe",
        year: 1944
    }
];

const bookIds = books.map((book, index) => index);

app.get("/", (req, res) => {
    const bookData = books.map((book, index) => {
        return { id: index, ...book };
    });
    res.status(200).json(
        { 
            message: "Books retrieved successfully", 
            data: bookData 
        }
    );
});

app.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    if (!bookIds.includes(id)) {
        return res.status(404).json(
            { 
                message: "Book not found!" 
            }
        );
    }
    res.status(200).json(
        { 
            message: "Book retrieved successfully", 
            data: books[id] 
        }
    );
});

app.post("/", (req, res) => {
    const { title, author, year } = req.body;
    const newBookId = books.length;
    books.push({ title, author, year });
    bookIds.push(newBookId);
    res.status(201).json(
        { 
            message: "Book created successfully", 
            data: { 
                id: newBookId, 
                ...books[newBookId] 
            } 
        }
    );
});

app.patch("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    if (!bookIds.includes(id)) {
        return res.status(404).json(
            { 
                message: "Book not found!" 
            }
        );
    }
    Object.assign(books[id], req.body);
    res.status(200).json(
        { 
            message: "Book updated successfully", 
            data: req.body 
        }
    );
});

app.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    if (!bookIds.includes(id)) {
        return res.status(404).json(
            { 
                message: "Book not found!" 
            }
        );
    }
    books.splice(id, 1);
    bookIds.splice(bookIds.indexOf(id), 1);
    res.status(200).json(
        { 
            message: "Book deleted successfully" 
        }
    );
});

app.listen(PORT, () => {
    console.log(`Server is running at port http://localhost:${PORT}`);
});
