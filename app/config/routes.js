'use strict';

const teamsController = require('../controllers/api/v1/teams.controller');
const router = require('express').Router();

module.exports = app => {

    router.get('/teams', teamsController.all);

    router.post('/teams', teamsController.createTeam);

    router.post('/bulk/teams', teamsController.createTeams);

    app.use('/api/v1', router);
};
