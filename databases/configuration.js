const mongoose = require('mongoose')

const mongoConn = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });
        console.log('conexión OK con Mongo!')
    }catch(e){
        console.log('Error de conexión', e);
        throw new Error('Error de conexión');
    }
}

module.exports = { mongoConn }

