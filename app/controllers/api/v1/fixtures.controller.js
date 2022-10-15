'use strict';

const FixtureService = require('../../../services/fixture.service');
const Models = require('../../../models/index');
const fixtureValidator = require('../../../validators/fixture.validator');

const fixtureService = new FixtureService(Models.sequelize);

module.exports.all = async (req, res) => {
    let date = req.query.date || null; 
    try {
        let fixtures = await fixtureService.findAll(date);
        res.status(200).json(
            {
                "statusCode": 200,
                "message": "OK",
                "data": {
                    "results": fixtures
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

module.exports.createFixture = async (req, res) => {
    let body = req.body;
    let fixture = body.fixture;

    try {
        await fixtureValidator.onCreate(fixture);
        let createdFixture = await fixtureService.createFixture(fixture);
        res.status(201).send(
            {
                "statusCode": 201,
                "message": "OK",
                "data": {
                    "result": createdFixture
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
}