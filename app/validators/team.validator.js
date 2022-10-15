'use strict';

const { ValidationError } = require("sequelize");

module.exports.onCreate = (team) => {
    let errors = [];

    if (!team.name) {
        errors.push('Team name is required');
    }

    if (!team.location) {
        errors.push('Team location is required');
    }

    if (!team.manager) {
        errors.push('Team manager is required');
    }

    if (!team.stadium) {
        errors.push('Team stadium is required');
    }

    if (!team.capacity) {
        errors.push('Team capacity is required');
    }

    if (!team.league) {
        errors.push('Team league is required');
    }

    if (errors.length > 0) {
        let err = new ValidationError('ValidationError');
        err.errors = errors;
        throw err;
    }
}