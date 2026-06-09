import express, { json } from 'express'
import logError from './middlewares/error/log-error'
import config from 'config'
import respondError from './middlewares/error/error-responder'
import notFound from './middlewares/not-found'
import cors from 'cors'
import sequelize from './db/sequelize'
import groupsRouter from './routers/groups'
import meetingsRouter from './routers/meetings'


(async () => {
    const port = config.get<number>('app.port')
    const name = config.get<string>('app.name')


    const app = express()

    // middlewares
    app.use('/', cors())
    app.use('/', json())

    // load routers here...
    app.use('/groups', groupsRouter)
    app.use('/meetings', meetingsRouter)

    // not found
    app.use('/', notFound)

    // error middlewares
    app.use('/', respondError)

    await sequelize.sync({force: !!config.get('app.sync.force')})

    // starting the server
    app.listen(port, () => console.log(`app ${name} started on port ${port}....`))
})()
