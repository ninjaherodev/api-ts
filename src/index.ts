import {Server} from './app'

const PORT = parseInt(process.env.PORT ?? '3010', 10) || 3010;
const server = new Server(PORT)
server.start()
