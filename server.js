import express, { json, request, response } from "express";
import { PrismaClient } from "@prisma/client";

const app = express()
const prisma = new PrismaClient()
 
app.use(express.json())

app.get('/books', async (request, response) => {
    let books = []

    if(request.query){
        books = await prisma.book.findMany({
            where: {
                author: request.query.author,
                title: request.query.title,
                releaseYear: request.query.releaseYear
            }
        })
    } else {
        books  = await prisma.book.findMany()
    }

    response.status(200).json(books)
    response.send('Olar, esse é o inicio do projeto')
})

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

app.put('/books/:id', async  (request, response) => {
    await prisma.book.update({
        where: {
            id: request.params.id
        },

        data: {
            author: request.body.author,
            title: request.body.title,
            releaseYear: request.body.releaseYear
        }
    })

    response.status(201).json(request.body)
})

app.delete('/books/:id', async (request, response) => {
    await prisma.book.delete({
        where: {
            id: request.params.id
        }
    })

    response.status(200).json({message: 'O the book has been deleted'})
})

app.listen(3000)