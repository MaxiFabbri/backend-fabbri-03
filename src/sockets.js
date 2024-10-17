import { Server } from 'socket.io';

const initSocket = (httpServer) => {
    
    const io = new Server(httpServer);
    console.log('Servicio socket.io activo');
    
    io.on('connection', client => {
        console.log(`Cliente conectado, id ${client.id} desde ${client.handshake.address}`);

        client.on('disconnect', reason => {
            console.log('Cierre de conexion: ',reason);
        });
    });
    return io;
}
export default initSocket;
