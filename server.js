import { fastify } from 'fastify'
// import { DatabaseMemory } from './database-memory'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify()

// const database = new DatabaseMemory()
const database = new DatabasePostgres()

server.post('/videos', async (request, reply) => {
  const { title, description, duration } = request.body

  console.log(body)

  await database.create({ 
    title,
    description,
    duration
  })
  return replay.status(201).send()
})

server.get('/videos/:id', async (request) => {
  const search = request.query.search

  console.log(search)

  const video = await database.list(search)

  return video
})


server.put('/videos/:id', async (request, reply) => {
  const videoId = request.params.id
  const { title, description, duration } = request.body

 await database.update(videoId, {
    title,
    description,
    duration
  })

  return reply.status(204).send()
})


server.delete('/videos/:id', async (request, reply) => {
  const videoId = request.params.id

  await database.delete(videoId)

  return reply.status(204).send()
})


server.listen({
  host: '0.0.0.0',
  port: process.env.PORT ?? 3333,
})