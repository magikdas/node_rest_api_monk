const request = require('supertest');

const expect = require('chai').expect;

const app = require('../src/app');

const fixtures = require('./fixtures');

require("dotenv").config();

///////////////////////////////////////
//// Testing Chai
///////////////////////////////////////

describe('Testing Chai by - GET All Students', () => {
    it('responds with a json message', (done) => {
        request(app)
            .get('/api/v1/student')
            .expect(200, done)
    });
    console.log("Chai Testing is working");
});

///////////////////////////////////////
//// POST ASSERTIONS.....
///////////////////////////////////////

describe('Post Submit - First Name Check', () => {
    it('responds with a json error', (done) => {
        //console.log("Hey " + JSON.stringify(fixtures.students_firstNameMandatory));
        request(app)
            .post('/api/v1/student')
            .send(fixtures.students_firstNameMandatory)
            .set('Accept', 'application/json')
            .expect(500)
            .then((response) => {
                //console.log('bye' + JSON.stringify(response.body));
                expect(response.body.message).to.contain('first_name');
                expect(response.body.message).to.be.a('string');
                done();
            });
    });
    //console.log("Hey" + process.env.NODE_ENV);
});

describe('Post Submit - Mobile Mandatory Check', () => {
    it('responds with a json error', (done) => {
        request(app)
            .post('/api/v1/student')
            .send(fixtures.students_mobileMandatory)
            .set('Accept', 'application/json')
            .expect(500)
            .then((response) => {
                expect(response.body.message).to.contain('mobile');
                expect(response.body.message).to.be.a('string');
                done();
            });
    });
    //console.log("Hey" + process.env.NODE_ENV);
});

describe('Post Submit - Mobile Number Check', () => {
    it('responds with a json error', (done) => {
        request(app)
            .post('/api/v1/student')
            .send(fixtures.students_mobileNumber)
            .set('Accept', 'application/json')
            .expect(500)
            .then((response) => {
                expect(response.body.message).to.contain('mobile');
                expect(response.body.message).to.be.a('string');
                done();
            });
    });
    //console.log("Hey" + process.env.NODE_ENV);
});

describe('Post Submit - Gender Check', () => {
    it('responds with a json error', (done) => {
        request(app)
            .post('/api/v1/student')
            .send(fixtures.students_genderOutOfList)
            .set('Accept', 'application/json')
            .expect(500)
            .then((response) => {
                expect(response.body.message).to.contain('gender');
                expect(response.body.message).to.be.a('string');
                done();
            });
    });
    //console.log("Hey" + process.env.NODE_ENV);
});

describe('Post Submit - Email Check', () => {
    it('responds with a json error', (done) => {
        request(app)
            .post('/api/v1/student')
            .send(fixtures.students_emailFormat)
            .set('Accept', 'application/json')
            .expect(500)
            .then((response) => {
                expect(response.body.message).to.contain('email');
                expect(response.body.message).to.be.a('string');
                done();
            });
    });
    //console.log("Hey" + process.env.NODE_ENV);
});

describe('Post Submit - DOB Check', () => {
    it('responds with a json error', (done) => {
        request(app)
            .post('/api/v1/student')
            .send(fixtures.students_dateFormat)
            .set('Accept', 'application/json')
            .expect(500)
            .then((response) => {
                expect(response.body.message).to.contain('dob');
                expect(response.body.message).to.be.a('string');
                done();
            });
    });
    //console.log("Hey" + process.env.NODE_ENV);
});





//// PUT ASSERTIONS.....


//// DELETE ASSERTIONS.....



//// GET ONE ASSERTIONS.....


//// GET ALL ASSERTIONS.....


//// GET SEARCH ASSERTIONS.....


/*
describe('GET All Students', () => {
    it('responds with a json message', (done) => {
        request(app)
            .get('/api/v1/student')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).to.be.a('array');
                //expect('first_name').to.be.a('string');
                expect(response.body).to.deep.equal(fixtures.students);
                done();
            });
        //console.log("Hey" + process.env.NODE_ENV);
    });
});

describe('GET All Data', () => {
    it('responds with a json message', (done) => {
        request(app)
            .get('/api/v1/student')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).to.be.a('array');
                //expect('first_name').to.be.a('string');
                expect(response.body).to.deep.equal(fixtures.students);
                done();
            });
    });
});


describe('GET One Student', () => {
    it('responds with a json message', (done) => {
        request(app)
            .get('/api/v1/student/5f2f74b83741ed09c707f86a')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200,)
            .then((response) => {
                expect(response.body.first_name).to.equal("Amrita");
                done();
            });
    });
});
*/

