const app = require('./src/config');
require('./src/saludo')(app);
require('./src/task')(app);
require('./src/user')(app);
const port = 3000;

app.listen(port, (() => console.log(`Server ejcutandose en puerto ${port} y en localhost`)));