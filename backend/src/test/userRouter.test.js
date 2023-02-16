const supertest = require('supertest') 
const {app, server} = require('../index')
const fakeRequest = supertest(app);
const{ connectDB, disconnectDB }= require('../Mongo');




describe('user router TEST', () => {
    beforeAll(async () => {
        const connectionError = await connectDB();
        if(!connectionError) console.log('🏢 Connected to database!');
        else console.log(connectionError);
    });
    afterAll(async () => {
        await disconnectDB();
        server.close();
    });


    let company;
    describe('POST /user', () => {
        it('Can create user', async () => {
            const res = await fakeRequest.post('/user').send( {
                userName: 'user test',
                name:'name test',
                email: 'test@test.es',
                lastName: 'lastest',
                password: '1234'

            });
            const user = res.body.resUser;
            expect(res.status).toBe(201);
            expect(user.userName).toBe('user test');
            expect(user.name).toBe('name test');
            expect(user.email).toBe('test@test.es');
            expect(user.lastName).toBe('lastest');
            expect(user._id).not.toBe(undefined);
        });
    });
});

