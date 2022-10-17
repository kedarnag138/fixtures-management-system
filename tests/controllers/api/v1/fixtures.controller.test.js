'use strict';

const supertest = require('supertest');
const server = require('../../../../server');
const http = require('http');
const db = require('../../../../app/models/index');
const Models = require('../../../../app/models/index');
const TeamFactory = require('../../../factories/team.factories');
const FixtureFactory = require('../../../factories/fixture.factories');

let teamFactory = new TeamFactory(Models.sequelize);
let fixtureFactory = new FixtureFactory(Models.sequelize);
let serverInstance = supertest(http.createServer(server));

describe('Fixtures API', () => {
    describe('200, GET /api/v1/fixtures', () => {
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
                    expect(res.body.data.results).toEqualLength(10);
                    expect(res.body.errors).toEqual([]);
                }
            );
        });
    });

    describe('201, POST /api/v1/fixtures', () => {
        it('should create a new fixture', async () => {
            let team1 = {
                "team": {
                    "name": "Everton",
                    "manager": "Frank Lampard",
                    "location": "Goodison Park",
                    "capacity": 40000,
                    "league": "Premier League"
                }
            };

            let team2 = {
                "team": {
                    "name": "Chelsea",
                    "manager": "Frank Lampard",
                    "location": "Stamford Bridge",
                    "capacity": 40000,
                    "league": "Premier League"
                }
            };

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
    });
});

afterAll(async () => {
    await db.sequelize.models.Fixture.destroy({ truncate: true });
    await db.sequelize.models.Team.destroy({ truncate: true });
    await server.close();
    await db.sequelize.close();
});