'use strict';

const { ValidationError } = require("sequelize");
const Models = require('../models/index');

module.exports.onCreate = async (fixture) => {
    this.models = Models.sequelize.models;
    let errors = [];

    if (!fixture.homeTeamId) {
        errors.push('Home team is required');
    }

    if (!fixture.awayTeamId) {
        errors.push('Away team is required');
    }

    if (!fixture.date) {
        errors.push('Date is required');
    }

    if (!fixture.time) {
        errors.push('Time is required');
    }

    if (!fixture.referee) {
        errors.push('referee is required');
    }

    if (!fixture.venue) {
        errors.push('Venue is required');
    }

    let existingFeature = await this.models.Fixture.findOne({ where: { homeTeamId: fixture.homeTeamId, awayTeamId: fixture.awayTeamId, date: fixture.date } });

    if (existingFeature) {
        errors.push('Fixture already exists');
    }

    if (fixture.homeTeamId === fixture.awayTeamId) {
        errors.push('Home team and away team cannot be the same');
    }

    let homeTeamHasFixtureForSelectedDate = await this.models.Fixture.findOne({ where: { homeTeamId: fixture.homeTeamId, date: fixture.date } });

    if (homeTeamHasFixtureForSelectedDate) {
        errors.push('Home team already has a fixture for the selected date');
    }

    let awayTeamHasFixtureForSelectedDate = await this.models.Fixture.findOne({ where: { awayTeamId: fixture.awayTeamId, date: fixture.date } });

    if (awayTeamHasFixtureForSelectedDate) {
        errors.push('Away team already has a fixture for the selected date');
    }

    if (errors.length > 0) {
        let err = new ValidationError('ValidationError');
        err.errors = errors;
        throw err;
    }
}