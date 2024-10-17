import express, { json, request, response } from "express";
import { PrismaClient } from "@prisma/client";

const app = express()
const prisma = new PrismaClient()
 
app.use(express.json())

app.post('/books', async  (request, response) => {
    await prisma.book.create({
        data: {
            author: request.body.author,
            title: request.body.title,
            releaseYear: request.body.releaseYear
        }
    })

    response.status(201).json(request.body)
})

app.get('/books', async (request, response) => {
    const books  = await prisma.book.findMany()

    response.status(200).json(books)
    response.send('Olar, esse é o inicio do projeto')
})

app.listen(3000)