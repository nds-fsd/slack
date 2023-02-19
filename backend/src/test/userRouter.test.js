const supertest = require('supertest')
const { app, server } = require('../index')
const fakeRequest = supertest(app);
const { connectDB, disconnectDB } = require('../Mongo');




describe('user router TEST', () => {
    beforeAll(async () => {
        const connectionError = await connectDB();
        
        console.log('¿ConnectionError?',connectionError);
    });
    afterAll(async () => {
        await disconnectDB();
        server.close();
    });


    let userId
    let token
    let email
    describe('POST /register', () => {
        it('Can register user', async () => {
            const res = await fakeRequest.post('/register').send({
                userName: 'user test',
                name: 'name test',
                email: 'test@test.es',
                lastName: 'lastest',
                password: '1234'

            });
            const user = res.body.user;
            userId = user.id            
            email = user.email
            expect(res.status).toBe(201);
            expect(res.body.token).not.toBe(undefined);
            expect(user.name).toBe('name test');
            expect(user.email).toBe('test@test.es');
            expect(user.id).not.toBe(undefined);

        });

    });

    describe(`POST /login`, () => {
        it('Can login', async () => {
            const res = await fakeRequest.post(`/login`).send({
                email: email,
                password: '1234'
            });


            token = res.body.token
            expect(res.status).toBe(200);
            expect(res.body.user.name).toBe('name test');
            expect(res.body.user.email).toBe('test@test.es');
            expect(res.body.user.id).not.toBe(undefined);
            expect(res.body.token).not.toBe(undefined);
        });
    });

    describe(`GET /user/:id`, () => {
        it('Can view user', async () => {
            const res = await fakeRequest.get(`/user/${userId}`).set('Authorization', `Bearer ${token}`);



            expect(res.status).toBe(200);
            expect(res.body.userName).toBe('user test');
            expect(res.body.name).toBe('name test');
            expect(res.body.email).toBe('test@test.es');
            expect(res.body.lastName).toBe('lastest');
            expect(res.body._id).not.toBe(undefined);
        });
    });
    let idOrg
    describe('POST /organizacion', () => {
        it('can create organizacion', async () => {
            const res = await fakeRequest
            .post('/organizacion')
            .send({
                OrgName: 'organizacion test',
                OrgMail: 'orgTest@test.es',
                OrgDescription: 'description test'
            })
            .set('Authorization', `Bearer ${token}`);

            
            expect(res.body.OrgName).toBe('organizacion test');
            expect(res.body.OrgMail).toBe('orgTest@test.es');
            expect(res.body.OrgDescription).toBe('description test');
            expect(res.body._id).not.toBe(undefined);
            idOrg= res.body._id;
        })
    })

    describe('GET /organizacion/:id', ()=>{
        it('can view organizacion', async () => {
            const res = await fakeRequest
            .get(`/organizacion/${idOrg}`)
            .set('Authorization', `Bearer ${token}`);

            expect(res.body.OrgName).toBe('organizacion test');
            expect(res.body.OrgMail).toBe('orgTest@test.es');
            expect(res.body.OrgDescription).toBe('description test');
            expect(res.body._id).toBe(idOrg);
        })
  
    })


});

