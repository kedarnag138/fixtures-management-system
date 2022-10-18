'use strict';

const FixtureService = require('../../../services/fixture.service');
const PaginationService = require('../../../services/pagination.service');
const Models = require('../../../models/index');
const fixtureValidator = require('../../../validators/fixture.validator');

const fixtureService = new FixtureService(Models.sequelize);
const paginationService = new PaginationService();

module.exports.all = async (req, res) => {
    let date = (req.query && req.query.date) ? req.query.date : null;
    let currentPage = (req.query && req.query.page) ? parseInt(req.query.page) : 1;
    let itemsPerPage = (req.query && req.query.size) ? req.query.size : 10;
    try {
        let fixtures = await fixtureService.findAll(date, currentPage, itemsPerPage);
        let paginatedFixtures = await paginationService.paginate(fixtures, currentPage, itemsPerPage, fixtures.length);
        res.status(200).json(
            {
                "statusCode": 200,
                "message": "OK",
                "data": {
                    "results": paginatedFixtures['items'],
                    "currentPage": paginatedFixtures['currentPage'],
                    "totalPages": paginatedFixtures['totalPages'],
                    "totalItems": paginatedFixtures['totalItems'],
                    'nextPage': paginatedFixtures['nextPage'],
                    'previousPage': paginatedFixtures['previousPage']
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