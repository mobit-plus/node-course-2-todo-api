const expect = require('expect');
const request = require('supertest');

var {App} = require('./../server');
var {Todo} = require('./../models/todo');

const todos = [{
    text: 'first text'
},{
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