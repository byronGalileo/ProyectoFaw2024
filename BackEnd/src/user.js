const connection = require('./mysql');
const crypto = require('crypto');

module.exports = (app) => {

    app.post('/login', (req, res) => {

        var params = req.body;
        const user = params.user;
        const password = params.password;

        // Hashear la contraseña usando MD5
        // const hashedPassword = crypto.createHash('md5').update(password).digest('hex');

        const query = 'SELECT * FROM user WHERE email = ? AND pass = ?';

        connection.query(query, [user, password], (error, results) => {
            if (error) {
                console.error('Error al ejecutar la consulta:', error);
                res.status(500).json({ error: true, message: 'Error al ejecutar la consulta' });
                return;
            }

            if (results.length > 0) {
                console.log(results);
                res.status(200).json({ error: false, results });
            } else {
                res.status(401).json({ error: 1, message: 'invalid credentials' });
            }
        });

    }); 

    app.post('/register', async (req, res) => {
        const { user, password,nombre, fecha_nacimiento, genero } = req.body;
    
       
    
        const query = 'INSERT INTO user (email, pass, nombre,fecha_nacimiento, genero) VALUES (?, ?, ?, ?, ?)';
    
        connection.query(query, [user, password,nombre, fecha_nacimiento, genero], (error, results) => {
            if (error) {
                console.error('Error inserting user:', error);
                res.status(500).json({ error: 'Error inserting user' });
                return;
            }
    
            res.status(201).json({ message: 'User created', userId: results.insertId });
        });
    });
}
