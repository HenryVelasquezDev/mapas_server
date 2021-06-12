const Marcadores = require("./marcadores");


class Sockets {

    constructor(io) {

        this.io = io;

        this.marcadores = new Marcadores();

        this.socketsEvents();

    }

    socketsEvents() {
        //"socket en el argumento hace referencia al cliente dispositivo que se esta conectando"
        this.io.on('connection', (socket) => {

            socket.emit( 'marcadores-activos' , this.marcadores.activos );

            socket.on( 'marcador-nuevo' , ( marcador ) =>{
                
                this.marcadores.agregarMarcador( marcador );

                //broadcaste permite emitir desde el socket a todos los clientes excepto quien emitio en principio el evento
                socket.broadcast.emit( 'marcador-nuevo', marcador );
            });

            socket.on( 'marcador-actualizado' , ( marcador ) =>{
                this.marcadores.actualizarMarcador( marcador );
                socket.broadcast.emit( 'marcador-actualizado', marcador );
            })

        });
    }

}

module.exports = Sockets;