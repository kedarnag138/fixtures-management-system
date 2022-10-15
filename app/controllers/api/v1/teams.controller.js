'use strict';

const db = require('../../../models/index');
const Team = db.teams;
const TeamService = require('../../../services/team.service');
const Models = require('../../../models/index');
const teamValidator = require('../../../validators/team.validator');

const teamService = new TeamService(Models.sequelize);

module.exports.all = async (req, res) => {
    try {
        let teams = await teamService.findAll();
        res.status(200).json(
            {
                "statusCode": 200,
                "message": "OK",
                "data": {
                    "results": teams
                },
                "errors": []
            }
        );
    } catch (err) {
        res.status(500).json(
            {
                "statusCode": 500,
                "message": "Internal Server Error",
                "data": {},
                "errors": [err.message]
            }
        );
    }
}

module.exports.createTeam = async (req, res) => {
    let body = req.body;
    let team = body.team;

    try {
        teamValidator.onCreate(team);
        let createdTeam = await teamService.createTeam(team);
        res.status(201).send(
            {
                "statusCode": 201,
                "message": "OK",
                "data": {
                    "result": createdTeam
                },
                "errors": []
            }
        );
    }
    catch (err) {
        res.status(422).send(
            {
                "statusCode": 422,
                "message": "Validation Failed",
                "data": {},
                "errors": err.errors
            }
        );
    }
};

module.exports.createTeams = async (req, res) => {
    let body = req.body;
    let teams = body.teams;

    try {
        let createdTeams = await teamService.bulkCreate(teams);
        res.status(201).send(
            {
                "statusCode": 201,
                "message": "OK",
                "data": {
                    "results": createdTeams
                },
                "errors": []
            }
        );
    }
    catch (err) {
        res.status(400).send(
            {
                "statusCode": 400,
                "message": "Bad Request",
                "data": {},
                "errors": [err.message]
            }
        );
    }
}