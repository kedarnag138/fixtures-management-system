'use strict';

const supertest = require('supertest');
const server = require('../../../../server');
const http = require('http');
const db = require('../../../../app/models/index');
const TeamFactory = require('../../../factories/team.factories');
const FixtureFactory = require('../../../factories/fixture.factories');

let teamFactory = new TeamFactory(db.sequelize);
let fixtureFactory = new FixtureFactory(db.sequelize);
let serverInstance = supertest(http.createServer(server));

describe('Fixtures API', () => {
    describe('200, GET /api/v1/fixtures', () => {
        (async () => {
            for (let i = 0; i < 10; i++) {
                await fixtureFactory.createFixture();
            }
        });

        it('should return all fixtures', () => {
            serverInstance
                .get('/api/v1/fixtures')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        throw err;
                    }
                    expect(res.body.statusCode).toEqual(200);
                    expect(res.body.message).toEqual('OK');
                    expect(Array.isArray(res.body.data.results)).toEqual(true);
                    expect(res.body.data.results).toHaveLength(10);
                    expect(res.body.errors).toEqual([]);
                }
            );
        });

        it('should return all paginated fixtures', () => {
            serverInstance
                .get('/api/v1/fixtures?page=1&limit=5')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        throw err;
                    }
                    expect(res.body.statusCode).toEqual(200);
                    expect(res.body.message).toEqual('OK');
                    expect(Array.isArray(res.body.data.results)).toEqual(true);
                    expect(res.body.data.results).toHaveLength(5);
                    expect(res.body.data.currentPage).toEqual(1);
                    expect(res.body.data.totalPages).toEqual(2);
                    expect(res.body.errors).toEqual([]);
                }
            );
        });

        it('should return all paginated fixtures by date', () => {
            serverInstance
                .get('/api/v1/fixtures?date=17/10/2022')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        throw err;
                    }
                    expect(res.body.statusCode).toEqual(200);
                    expect(res.body.message).toEqual('OK');
                    expect(Array.isArray(res.body.data.results)).toEqual(true);
                    expect(res.body.data.results).toEqual([]);
                    expect(res.body.errors).toEqual([]);
                }
            );
        });
    });

    describe('201, POST /api/v1/fixtures', () => {
        it('should create a new fixture', async () => {
            let team1 = await teamFactory.createTeam();
            let team2 = await teamFactory.createTeam();

            serverInstance
                .post('/api/v1/fixtures')
                .send({
                    "fixture": {
                        "homeTeamId": team1.id,
                        "awayTeamId": team2.id,
                        "date": "2020-01-01",
                        "time": "12:00",
                        "referee": "Mike Dean",
                        "venue": team1.location,
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
                    expect(res.body.data.result.homeTeamId).toEqual(team1.id);
                    expect(res.body.data.result.awayTeamId).toEqual(team2.id);
                    expect(res.body.data.result.date).toEqual('2020-01-01');
                    expect(res.body.data.result.time).toEqual('12:00');
                    expect(res.body.data.result.referee).toEqual('Mike Dean');
                    expect(res.body.data.result.venue).toEqual(team1.location);
                    expect(res.body.errors).toEqual([]);
                }
            );
        });

        it('should not create a new fixture with missing required fields', async () => {
            let team1 = await teamFactory.createTeam();
            let team2 = await teamFactory.createTeam();

            serverInstance
                .post('/api/v1/fixtures')
                .send({
                    "fixture": {
                        "homeTeamId": null,
                        "awayTeamId": team2.id,
                        "date": "2020-01-01",
                        "time": "12:00",
                        "referee": "Mike Dean",
                        "venue": team1.location,
                        "invalid": "invalid"
                    }
                })
                .expect('Content-Type', /json/)
                .expect(422)
                .end((err, res) => {
                    if (err) {
                        throw err;
                    }
                    expect(res.body.statusCode).toEqual(422);
                    expect(res.body.message).toEqual('Validation Failed');
                    expect(res.body.data).toEqual({});
                    expect(res.body.errors).toEqual([
                        "Home team is required"
                    ]);
                }
            );
        });
    });
});

afterAll(async () => {
    await db.sequelize.models.Fixture.destroy({ truncate: true });
    await db.sequelize.models.Team.destroy({ truncate: true });
    await server.close();
    await db.sequelize.close();
});