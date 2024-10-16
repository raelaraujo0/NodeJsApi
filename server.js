import express, { json, request, response } from "express";

const app = express()
app.use(express.json())

const books = []

app.post('/books', (request, response) => {
    books.push(request.body)
    response.status(201).json(request.body)
})

app.get('/books', (request, response) => {
    response.status(200).json(books)
    response.send('Olar, esse é o inicio do projeto')
})

app.listen(3000)