import {fastify} from 'fastify'
// import { DataBaseMemory } from './database-memory.js'
import { DataBasePostgres } from './database-postgres.js'

const server = fastify()

// const database = new DataBaseMemory()

const database = new DataBasePostgres()

// GET -> Busco informação
// POST -> Criar registro
// PUT -> Alteração
// DELETE -> Deletar

// Route Parameter

// POST http://localhost:3333/videos

// Request Body

server.post('/videos',async (request, reply)=>{
    const {title, description, duration} = request.body

    await database.create({
        title,
        description,
        duration,
    })

    return reply.status(201).send()
})

server.get('/videos',async (request)=>{
    const search = request.query.search

    console.log(search)

    const videos = await database.list(search)

    return videos
})

// recebe id via url
server.put('/videos/:id',async (request,reply)=>{
    const {title, description, duration} = request.body
    const videoId = request.params.id

    await database.update(videoId,{
        title,
        description,
        duration
    })

    return reply.status(204).send()
})

server.delete('/videos/:id',async (request,reply)=>{
    const videoId = request.params.id

    await database.delete(videoId)

    return reply.status(204)
})

server.listen({
    port: process.env.PORT || 3333,
})