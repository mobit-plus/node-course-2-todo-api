const expect = require('expect');
const request = require('supertest');

var {ObjectID} = require('mongodb');
var {App} = require('./../server');
var {Todo} = require('./../models/todo');
var {User} = require('./../models/user');
var {todos, populateTodos,users,populateUsers} = require('./seed/seed');


  beforeEach(populateUsers);
  beforeEach(populateTodos);


describe('POST /todos', () => {

        it('Should create a new todo', (done) => {
            var text = "test todo text";

            request(App)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err,res) => {
                if (err) {
                    return done(err);
                }

                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((er) => done(er));
            });
        });

        it('Should not create todo with a invaild body data',(done) => {
            request(App)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err,res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((er) => done(er));
            });
        });
});

describe('GET /todos',(done) => {
    it('should all get todos', (done) => {
        request(App)
        .get('/todos')
        .send({})
        .expect(200)
        .expect((res) =>{
            expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    });

});

describe('GET Todos/:id',() => {
    it('should return todo docs',(done) => {
        request(App)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(todos[0].text)
        })
        .end(done);
    });

    it('should return 404 if todo not found',(done) => {
        var hexid = new ObjectID().toHexString();

        request(App)
        .get(`/todos/${hexid}`)
        .expect(404)
        .end(done);
    });

    it('should return 404 for non-object ids',(done) => {
        request(App)
        .get('/todos/12sdk')
        .expect(404)
        .end(done);
    });
});

describe('DELETE /todos/:id',() => {

    it('should remove todos',(done) => {
        var hexid = todos[1]._id.toHexString();

        request(App)
        .delete(`/todos/${hexid}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo._id).toBe(hexid);
        })
        .end((err,res) => {
            if (err) {
                return done(err);
            }

            Todo.findById(hexid).then((todo) => {
                //expect(todo).toNotExist();
                done();
            }).catch((er) => done(er));
        });
    });

    it('should return 404 if not found',(done) => {
        var hexid = new ObjectID().toHexString();

        request(App)
        .delete(`/todos/${hexid}`)
        .expect(404)
        .end(done);
    });

    it('should return 404 if not valid',(done) => {
        request(App)
        .delete('/todos/12sdk')
        .expect(404)
        .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it('should update the todo',(done) => {
        var hexid = todos[0]._id.toHexString();
        var text = 'this should be the new text';

        request(App)
        .patch(`/todos/${hexid}`)
        .send({
            completed: true,
            text
        })
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(text);
            expect(res.body.todo.completed).toBe(true);
           // expect(res.body.todo.completedAt).toBeA('number');
        })
        .end(done);
    });

    it('should clear completedAt when todo is not completed',(done) => {
        var hexid = todos[1]._id.toHexString();
        var text = 'this should be the new text!!';

        request(App)
        .patch(`/todos/${hexid}`)
        .send({
            completed: false,
            text
        })
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(text);
            expect(res.body.todo.completed).toBe(false);
           // expect(res.body.todo.completedAt).toNotExist();
        })
        .end(done);
    });
});

describe('GET /users/me', () => {
    it('should return user if autheticated', (done) => {
        request(App)
        .get('/users/me')
        .send('x-auth', users[0].tokens[0].token)
        .expect(200)
        .expect((res) => {
            expect(res.body._id).toBe(users[0]._id.toHexString());
            expect(res.body.email).toBe(users[0].email);
        })
        .end(done);
    });
    it('should return 401 if not authenticated', (done) => {
        request(App)
        .get('/users/me')
        .expect(401)
        .expect((res) => {
            expect(res.body).toEqual({})
        })
        .end(done);
    });
    
});

describe('POST /users', () => {
    it('should create user', (done) => {
        var email = 'example@gmail.com';
        var password = 'abcdef';

        request(App)
        .post('/users')
        .send({email,password})
        .expect(200)
        .expect((res) => {
            expect(res.headers['x-auth']).toExist();
            //expect(res.body._id).toExist();
            expect(res.body.email).toBe(email);
        })
        .end((err) => {
            if (err) {
                return done(err);
            }
            
            User.findOne({email}).then((user) => {
                expect(user).toExist();
                expect(user.password).toNotBe(password);
                done();
            }).catch((e) => done(e));
        });
    });
    it('should return validation errors if request invalid', (done) => {
        request(App)
        .post('/users')
        .send({
            email: 'and',
            password: '123'
        })
        .expect(400)
        .end(done);
    });
    it('should not create user if email in use', (done) => {
        request(App)
        .post('/users')
        .send({
            email: users[0].email,
            password: 'password123!'
        })
        .expect(400)
        .end(done);
    });
});

describe('POST /users/login', () => {
    it('should login user and return auth token', (done) => {
        request(App)
        .post('/users/login')
        .send({
            email: users[1].email,
            password: users[1].password
        })
        .expect(200)
        .expect((res) => {
            expect(res.headers['x-auth']).toExist();
        })
        .end((err, res) => {
            if (err) {
                return done(err);
            }

            User.findById(users[1]._id).then((user) => {
                expect(user.tokens[0]).toInclude({
                    access: 'auth',
                    token: res.headers['x-auth']
                });
                done();
            }).catch((e) => done(e));
        });
    });

    it('should reject invalid login', (done) => {
        request(App)
        .post('/users/login')
        .send({
            email: users[1].email,
            password: users[1].password + '1'
        })
        .expect(400)
        .expect((res) => {
            expect(res.headers['x-auth']).toNotExist();
        })
        .end((err, res) => {
            if (err) {
                return done(err);
            }

            User.findById(users[1]._id).then((user) => {
                expect(user.tokens.length).toBe(0);
                done();
            }).catch((e) => done(e));
        });
    });
});