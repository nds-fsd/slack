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
            expect(res.status).toBe(201);
            expect(res.body.userName).toBe('user test');
            expect(res.body.name).toBe('name test');
            expect(res.body.email).toBe('test@test.es');
            expect(res.body.lastName).toBe('lastest');
            expect(res.body.password).not.toBe(undefined)
            expect(res.body._id).not.toBe(undefined);
            company = res.body;
        });
    });
});

