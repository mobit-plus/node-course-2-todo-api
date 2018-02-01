const expect = require('expect');
const request = require('supertest');

var {ObjectID} = require('mongodb');
var {App} = require('./../server');
var {Todo} = require('./../models/todo');

const todos = [{
    _id: new ObjectID(),
    text: 'first text'
},{
    _id: new ObjectID(),
    text: 'second text'
}];

beforeEach((done) => {
    Todo.remove({}).then((err,res) => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

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
        .end(done)
    });
});