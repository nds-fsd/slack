import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://SkuadLack:tOBlTJq3tFofFwPa@skuadlack.zvlzpow.mongodb.net/?retryWrites=true&w=majority');


const mongo = mongoose.connection;
mongo.on('error', (error) => console.error(error));
mongo.once('open', () => {
    console.log('connected to database');
});

export default mongo;