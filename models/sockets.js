

class Sockets {

    constructor(io) {

        this.io = io;
        this.socketsEvents();

    }

    socketsEvents() {
        //"socket en el argumento hace referencia al cliente dispositivo que se esta conectando"
        this.io.on('connection', (socket) => {

            socket.on('mensaje-cliente', (data) => {
                console.log(data);
            });

            //Escuchar el evento: mensaje-to-server
            socket.on('mensaje-to-server', (data) => {
               
                this.io.emit('mensaje-from-server', data);

            });
        });
    }

}

module.exports = Sockets;