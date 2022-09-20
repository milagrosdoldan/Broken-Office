const {assert} = require("chai")
const app = require("../index")
const request = require('supertest')
const should = require('should')


var Cookies;
 
describe('Functional Test <Sessions>:', function () {
  it('should be able to log in to your existing account', function (done) {
    request(app)
      .post('/api/user/login')
      .set('Accept','application/json')
      .send({"email": "nueva@nueva.com", "password": "nuevanueva"})
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        res.body.email.should.equal('nueva@nueva.com');
        // Save the cookie to use it later to retrieve the session
        Cookies = res.headers['set-cookie'].pop().split(';')[0];
        done();
      });
  });
  it('should be able to log in to your admin account', function (done) {
    request(app)
      .post('/api/user/login')
      .set('Accept','application/json')
      .send({"email": "nueva@nueva.com", "password": "nuevanueva"})
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        res.body.isAdmin.should.equal(true);
        // Save the cookie to use it later to retrieve the session
        Cookies = res.headers['set-cookie'].pop().split(';')[0];
        done();
      });
  });
  it('should be able to get your own data', function (done) {
    var req = request(app).get('/api/user/me');
    // Set cookie to get saved user session
    req.cookies = Cookies;
    req.set('Accept','application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        res.body.email.should.equal('nueva@nueva.com');
        res.body.name.should.equal('nueva');
        res.body.lastname.should.equal('nueva');
        done();
      });
  });
  it('should be able to update your own data', function (done) {
    var req = request(app).put('/api/user/6323348cd994403d5dbffb42');
    req.set('Accept','application/json')
      .send({"lastname": "nuevisima"})
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        res.body[0].lastname.should.equal('nuevisima');
        done();
      });
  });
  it('should be able to update your own data as many times as you want it to', function (done) {
    var req = request(app).put('/api/user/6323348cd994403d5dbffb42');
    req.set('Accept','application/json')
    .send({"lastname": "nueva"})
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        res.body[0].lastname.should.equal('nueva');
        done();
      });
  });
  it('As an admin, you should be able to list every admin', function (done) {
    var req = request(app).get('/api/user/allusers/ADMIN');
    req.cookies = Cookies;
    req.set('Accept','application/json')
    .send({"lastname": "nueva"})
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        res.body.length.should.not.equal(0);
        done();
      });
  });
  it('As an admin, you should be able to list every user', function (done) {
    var req = request(app).get('/api/user/allusers/NOTADMIN');
    req.cookies = Cookies;
    req.set('Accept','application/json')
    .send({"lastname": "nueva"})
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        res.body.length.should.not.equal(0);
        done();
      });
  });
  it('As an admin, you should be able to list every report without an asigned administrator', function (done) {
    var req = request(app).get('/api/report/reportswithoutadmin');
    req.cookies = Cookies;
    req.set('Accept','application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function (err, res) {
        res.body[0].admin.should.equal("No admin.");
        done();
      });
  });
  it('As an admin, you should be able to list all reports', function (done) {
    var req = request(app).get('/api/report/allreports');
    req.cookies = Cookies;
    req.set('Accept','application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        res.body.length.should.not.equal(0);
        done();
      });
  });
  it('As an admin, you should be able to list all your catched reports', function (done) {
    var req = request(app).get('/api/report/catchedreports');
    req.cookies = Cookies;
    req.set('Accept','application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function (err, res) {
        let type = typeof(res.body)
        type.should.equal("object");
        done();
      });
  });
  it('As an admin, you should be able to list all your fulfilled reports', function (done) {
    var req = request(app).get('/api/report/myreportsfullfilled');
    req.cookies = Cookies;
    req.set('Accept','application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function (err, res) {
        let type = typeof(res.body)
        type.should.equal("object");
        done();
      });
  });
  it('As an admin, you should be able to list all your rejected reports', function (done) {
    var req = request(app).get('/api/report/myreportsrejected');
    req.cookies = Cookies;
    req.set('Accept','application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function (err, res) {
        let type = typeof(res.body)
        type.should.equal("object");
        done();
      });
  });
  it('As an admin, you should be able to search for a report', function (done) {
    var req = request(app).get('/api/report/search/franco');
    req.cookies = Cookies;
    req.set('Accept','application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        res.body.length.should.not.equal(0);
        done();
      });
  });
  it('As an admin, you should be able to search for a report based on his userId', function (done) {
    var req = request(app).get('/api/report/reportsbyuserid/6320e5dcdb3723bf73d677ff');
    req.cookies = Cookies;
    req.set('Accept','application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        res.body[0].userId.should.equal("6320e5dcdb3723bf73d677ff");
        done();
      });
  });
  it('As an admin, you should be able to search for a report based on his priority', function (done) {
    var req = request(app).get('/api/report/priorityreports/High');
    req.cookies = Cookies;
    req.set('Accept','application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        res.body[0].priority.should.equal("High");
        done();
      });
  });
  it('As an admin, you should be able to filter pending reports', function (done) {
    var req = request(app).get('/api/report/getpendingreports');
    req.cookies = Cookies;
    req.set('Accept','application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        let type = typeof(res.body)
        type.should.equal("object");
        if(res.body.length){
            res.body[0].state.should.equal("pending")
        }
        done();
      });
  });
  it('As an admin, you should be able to filter rejected reports', function (done) {
    var req = request(app).get('/api/report/getrejectedreports');
    req.cookies = Cookies;
    req.set('Accept','application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        let type = typeof(res.body)
        type.should.equal("object");
        if(res.body.length){
            res.body[0].state.should.equal("rejected")
        }
        done();
      });
  });
  it('As an admin, you should be able to filter fulfilled reports', function (done) {
    var req = request(app).get('/api/report/getsolvedreports');
    req.cookies = Cookies;
    req.set('Accept','application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function (err, res) {
        let type = typeof(res.body)
        type.should.equal("object");
        if(res.body.length){
            res.body[0].state.should.equal("fullfilled")
        }
        done();
      });
  });
  it('As an admin, you should be able to catch reports', function (done) {
    var req = request(app).put('/api/report/catchreport/6321e28fa1ef47b16bc997d6');
    req.cookies = Cookies;
    req.set('Accept','application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function (err, res) {
        res.body.acknowledged.should.equal(true)
        done();
      });
  });
  it('As an admin, you should be able to fulfill a report', function (done) {
    var req = request(app).put('/api/report/solvereport/6321e28fa1ef47b16bc997d6');
    req.cookies = Cookies;
    req.set('Accept','application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function (err, res) {
        done();
      });
  });
  it('As an admin, you should be able to reject a report', function (done) {
    var req = request(app).put('/api/report/rejectedreport/6321e28fa1ef47b16bc997d6');
    req.cookies = Cookies;
    req.set('Accept','application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function (err, res) {
        done();
      });
  });
  it('As an admin, you should be able to fulfill a report', function (done) {
    var req = request(app).put('/api/report/solvereport/6321e28fa1ef47b16bc997d6');
    req.cookies = Cookies;
    req.set('Accept','application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function (err, res) {
        done();
      });
  });
  it('As an admin, you should be able to demote another admin', function (done) {
    var req = request(app).put('/api/admin/demote/6320e5dcdb3723bf73d677ff');
    req.cookies = Cookies;
    req.set('Accept','application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        done();
      });
  });
  it('As an admin, you should be able to promote another user', function (done) {
    var req = request(app).put('/api/admin/promote/6320e5dcdb3723bf73d677ff');
    req.cookies = Cookies;
    req.set('Accept','application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        done();
      });
  });
  it('As an admin, you should be able to deactivate another user', function (done) {
    var req = request(app).put('/api/admin/deactivate/63209eeb21f4d0a46af62ae4');
    req.cookies = Cookies;
    req.set('Accept','application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        res.body.id.should.equal("63209eeb21f4d0a46af62ae4")
        done();
      });
  });
  it('As an admin, you should be able to activate another user', function (done) {
    var req = request(app).put('/api/admin/activate/63209eeb21f4d0a46af62ae4');
    req.cookies = Cookies;
    req.set('Accept','application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        res.body.id.should.equal("63209eeb21f4d0a46af62ae4")
        done();
      });
  });
  it('As an admin, you should be able to see all users', function (done) {
    var req = request(app).get('/api/admin/all');
    req.cookies = Cookies;
    req.set('Accept','application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        let type = typeof(res.body)
        type.should.equal("object");
        done();
      });
  });
  it('As an user, you should be able to get all your reports', function (done) {
    var req = request(app).get('/api/report/myreports');
    req.cookies = Cookies;
    req.set('Accept','application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        let type = typeof(res.body)
        type.should.equal("object");
        done();
      });
  });
  it('Everyone should be able to access reports pages', function (done) {
    var req = request(app).get('/api/report/getreportbyid/6321e28fa1ef47b16bc997d6');
    req.cookies = Cookies;
    req.set('Accept','application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        res.body[0]._id.should.equal("6321e28fa1ef47b16bc997d6")
        done();
      });
  });
  it('should be able to log out', function (done) {
    request(app)
      .post('/api/user/logout')
      .set('Accept','application/json')
      .send({"email": "nueva@nueva.com", "password": "nuevanueva"})
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        // Save the cookie to use it later to retrieve the session
        Cookies = res.headers['set-cookie'].pop().split(';')[0];
        Cookies.should.equal("token=")
        done();
      });
  });
});