module.exports = (app) => {
    app.get('/saludo', (req, res) => {
        // console.log("Entro al metodo");
        res.json({saludo: "Hola Mundo"});
    })

    app.get('/saludo/:nombre', (req, res) => {
        res.json({saludo: `Hola ${req.params.nombre}`})
    });

    app.get('/saludo/:mensaje/:nombre', (req, res) => {
        res.json({saludo: `${req.params.mensaje} ${req.params.nombre}`})
    });

    app.get('/saludo_multiple', (req, res) => {
        res.json({saludos: [
            {nombre: "Jose", saludo: "Que ondas"},
            {nombre: "Mario", saludo: "Hola"},
            {nombre: "Luisa", saludo: "Hola"}
        ]})
    });

    app.post('/saludo', (req, res) => {
        console.log(req.body);
        res.json({query: `INSERET INTO saludos (nombre, saludo) VALUES ('${req.body.nombre}','${req.body.saludo}')`});
    })

    app.put('/saludo/:id', (req, res) => {
        res.json({query: `UPDATE saludos SET nombre = '${req.body.nombre}', saludo= '${req.body.saludo}' WHERE id = ${req.params.id}`})
    });

    app.delete('/saludo/:id', (req, res) => {
        if (parseInt(req.params.id) > 5) {
            res.json({query: `DELETE FROM saludos WHERE id = ${req.params.id}`});
        }
        res.json({prueba: "Se logro"});
    })
}