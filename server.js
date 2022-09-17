const app = require('./app')
const { mongoConn } = require('./databases/configuration')
const dotenv = require('dotenv').config()

app.set('port', process.env.PORT || 3000)

const conn = mongoConn()

app.listen(app.get('port'), () => {
    console.log(`Servidor arrancó por puerto ${app.get('port')}`);
});

