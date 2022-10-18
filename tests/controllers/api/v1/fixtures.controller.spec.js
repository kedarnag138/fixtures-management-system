'use strict';

const sinon = require('sinon');
const FixturesController = require('../../../../app/controllers/api/v1/fixtures.controller');
const FixtureService = require('../../../../app/services/fixture.service');
const TeamService = require('../../../../app/services/team.service');
const Fixture = require('../../../../app/models/fixture');
const FixtureFactory = require('../../../factories/fixture.factories');
const TeamFactory = require('../../../factories/team.factories');
const Models = require('../../../../app/models/index');
const { before } = require('mocha');

const fixtureService = new FixtureService(Models.sequelize);
const teamService = new TeamService(Models.sequelize);
const fixtureFactory = new FixtureFactory(Models.sequelize);
const teamFactory = new TeamFactory(Models.sequelize);

var server;

before(async () => {
    server = sinon.fakeServer.create();
    server.respondImmediately = true;

    await fixtureService.deleteAllFixtures();
    await teamService.deleteAllTeams();
});

after(() => {
    server.restore();
});

describe('Fixtures Controller API', () => {
    describe('GET /api/v1/fixtures', () => {
        it('should return all fixtures', async () => {
            let fixtures = await fixtureFactory.createFixtures(5);
            let req = {};
            let res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

            sinon.stub(fixtureService, 'findAll').returns(fixtures);

            await FixturesController.all(req, res);

            sinon.assert.calledWith(res.status, 200);

            sinon.assert.calledWith(res.json, {
                "statusCode": 200,
                "message": "OK",
                "data": sinon.match.object,
                "errors": []
            });

            fixtureService.findAll.restore();
        });

        it('should return all fixtures with date', async () => {
            let fixtures = await fixtureFactory.createFixtures(5);
            let req = { query: { date: '2020-10-10' } };
            let res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

            sinon.stub(fixtureService, 'findAll').returns(fixtures);

            await FixturesController.all(req, res);

            sinon.assert.calledWith(res.status, 200);

            sinon.assert.calledWith(res.json, {
                "statusCode": 200,
                "message": "OK",
                "data": sinon.match.object,
                "errors": []
            });

            fixtureService.findAll.restore();
        });
    });

    describe('POST /api/v1/fixtures', () => {
        it('should create a fixture', async () => {
            let team1 = await teamFactory.createTeam();
            let team2 = await teamFactory.createTeam();

            let req = { 
                body: {
                    fixture: {
                        homeTeamId: team1.id,
                        awayTeamId: team2.id,
                        date: '2020-01-01',
                        time: '12:00',
                        stadium: team1.stadium,
                        referee: 'Referee 1',
                        venue: 'Venue 1',
                        matchStatus: 'upcoming'
                    }
                }
            };
            let res = { status: sinon.stub().returnsThis(), send: sinon.stub() };

            sinon.stub(fixtureService, 'createFixture').returns(null, req.body.fixture);

            await FixturesController.createFixture(req, res);

            sinon.assert.calledWith(res.status, 201);

            sinon.assert.calledWith(res.send, {
                "statusCode": 201,
                "message": "OK",
                "data": {
                    "result": sinon.match.object
                },
                "errors": []
            });

            await fixtureService.deleteRecentFixture();
            await teamService.deleteTeam(team2.id);
            await teamService.deleteTeam(team1.id);

            fixtureService.createFixture.restore();
        });

        it('should not create a fixture if home team is the same as away team', async () => {
            let team1 = await teamFactory.createTeam();

            let req = { 
                body: {
                    fixture: {
                        homeTeamId: team1.id,
                        awayTeamId: team1.id,
                        date: '2020-01-01',
                        time: '12:00',
                        stadium: team1.stadium,
                        referee: 'Referee 1',
                        venue: 'Venue 1',
                        matchStatus: 'upcoming'
                    }
                }
            };
            let res = { status: sinon.stub().returnsThis(), send: sinon.stub() };

            await FixturesController.createFixture(req, res);

            sinon.assert.calledWith(res.status, 422);

            sinon.assert.calledWith(res.send, {
                "statusCode": 422,
                "message": "Validation Failed",
                "data": {},
                "errors": [
                    "Home team and away team cannot be the same"
                ]
            });

            await teamService.deleteTeam(team1.id);
        });

        it('should not create a fixture if home team does not exist', async () => {
            let team2 = await teamFactory.createTeam();

            let req = { 
                body: {
                    fixture: {
                        homeTeamId: 100,
                        awayTeamId: team2.id,
                        date: '2020-01-01',
                        time: '12:00',
                        stadium: team2.stadium,
                        referee: 'Referee 1',
                        venue: 'Venue 1',
                        matchStatus: 'upcoming'
                    }
                }
            };
            let res = { status: sinon.stub().returnsThis(), send: sinon.stub() };

            await FixturesController.createFixture(req, res);

            sinon.assert.calledWith(res.status, 422);

            sinon.assert.calledWith(res.send, {
                "statusCode": 422,
                "message": "Validation Failed",
                "data": {},
                "errors": [
                    "Home team does not exist"
                ]
            });

            await teamService.deleteTeam(team2.id);
        });
    });
});