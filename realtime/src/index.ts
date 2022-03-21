import { config as envConfig } from 'dotenv';
import createServer, { ISocketServerOptions } from 'action-service';

// setup env for use
envConfig();

const port = parseInt(process.env['SOCKET_SERVER_PORT'] || '9000', 10);
const serverOptions: ISocketServerOptions = {
    port,
};
const server = createServer(serverOptions);

server.start(() => console.log(`Server started on port ${port}`))