'use strict';

const sinon = require('sinon');
const TeamsController = require('../../../../app/controllers/api/v1/teams.controller');
const TeamService = require('../../../../app/services/team.service');
const Team = require('../../../../app/models/team');
const TeamFactory = require('../../../factories/team.factories');
const Models = require('../../../../app/models/index');
const { before } = require('mocha');

const teamService = new TeamService(Models.sequelize);
const teamFactory = new TeamFactory(Models.sequelize);

var server;

before(async () => {
    server = sinon.fakeServer.create();
    server.respondImmediately = true;

    await teamService.deleteAllTeams();
});

after(() => {
    server.restore();
});

describe('Teams Controller API', () => {
    describe('GET /api/v1/teams', () => {
        it('should return all teams', async () => {
            let teams = await teamFactory.createTeams(5);
            let req = {};
            let res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

            sinon.stub(teamService, 'findAll').returns(teams);

            await TeamsController.all(req, res);

            sinon.assert.calledWith(res.status, 200);

            sinon.assert.calledWith(res.json, {
                "statusCode": 200,
                "message": "OK",
                "data": {
                    "results": sinon.match.array
                },
                "errors": []
            });

            teamService.findAll.restore();
        });
    });

    describe('POST /api/v1/teams', () => {
        it('should create a team', async () => {
            let req = { 
                body: {
                    team: {
                        name: generateRandomString(),
                        location: 'Location 1',
                        manager: 'Manager 1',
                        stadium: 'Stadium 1',
                        capacity: 1000,
                        league: 'League 1'
                    }
                }
            };
            let res = { status: sinon.stub().returnsThis(), send: sinon.stub() };

            sinon.stub(teamService, 'createTeam').yields(null, req.body.team);

            await TeamsController.createTeam(req, res);

            sinon.assert.calledWith(res.status, 201);

            sinon.assert.calledWith(res.send, {
                "statusCode": 201,
                "message": "OK",
                "data": {
                    "result": sinon.match.object
                },
                "errors": []
            });

            await teamService.deleteRecentTeam();

            teamService.createTeam.restore();
        });

        it('should return validation errors', async () => {
            let req = { 
                body: {
                    team: {
                        name: '',
                        location: 'Location 1',
                        manager: 'Manager 1',
                        stadium: 'Stadium 1',
                        capacity: 1000,
                        league: 'League 1'
                    }
                }
            };
            let res = { status: sinon.stub().returnsThis(), send: sinon.stub() };

            await TeamsController.createTeam(req, res);

            sinon.assert.calledWith(res.status, 422);

            sinon.assert.calledWith(res.send, {
                "statusCode": 422,
                "message": "Validation Failed",
                "data": {},
                "errors": sinon.match.array
            });
        });
    });
});

const generateRandomString = () => {
    return Math.random().toString(36).substring(7);
}
