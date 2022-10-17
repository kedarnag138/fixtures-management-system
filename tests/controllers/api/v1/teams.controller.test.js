'use strict';

const supertest = require('supertest');
const server = require('../../../../server');
const http = require('http');
const db = require('../../../../app/models/index');

let serverInstance = supertest(http.createServer(server));

describe('Teams API', () => {
    describe('200, GET /api/v1/teams', () => {
        it('should return all teams', async () => {
            serverInstance
                .get('/api/v1/teams')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        throw err;
                    }
                    expect(res.body.statusCode).toEqual(200);
                    expect(res.body.message).toEqual('OK');
                    expect(res.body.data.results).toEqual([]);
                    expect(res.body.errors).toEqual([]);
                }
            );
        });
    });

    describe('201, POST /api/v1/teams', () => {
        it('should create a new team', async () => {
            serverInstance
                .post('/api/v1/teams')
                .send({
                    "team": {
                        "name": "Everton",
                        "manager": "Frank Lampard",
                        "location": "Goodison Park",
                        "capacity": 40000,
                        "league": "Premier League"
                    }
                })
                .expect('Content-Type', /json/)
                .expect(201)
                .end((err, res) => {
                    if (err) {
                        throw err;
                    }
                    expect(res.body.statusCode).toEqual(201);
                    expect(res.body.message).toEqual('OK');
                    expect(res.body.data.result.name).toEqual('Everton');
                    expect(res.body.data.result.manager).toEqual('Frank Lampard');
                    expect(res.body.data.result.location).toEqual('Goodison Park');
                    expect(res.body.data.result.capacity).toEqual(40000);
                    expect(res.body.data.result.league).toEqual('Premier League');
                    expect(res.body.errors).toEqual([]);
                }
            );
        });
    });
});



afterAll(async () => {
    await server.close();
    await db.sequelize.close();
});