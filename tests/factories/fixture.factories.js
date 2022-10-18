'use strict';

const TeamFactory = require('./team.factories');
const Models = require('../../app/models/index');

let teamFactory = new TeamFactory(Models.sequelize);

class FixtureFactory {
    constructor(sequelize) {
        this.client = sequelize;
        this.models = sequelize.models;
    }

    async createFixture() {
        let homeTeam = await teamFactory.createTeam();
        let awayTeam = await teamFactory.createTeam();
        let fixture = {
            homeTeamId: homeTeam.id,
            awayTeamId: awayTeam.id,
            date: getRandomDateInString(new Date(2022, 0, 1), new Date()),
            time: getRandomTimeInString(),
            referee: getRandomFootballRefereeName(),
            venue: homeTeam.location,
            matchStatus: getRandomMatchStatus(),
            score: { homeTeam: 0, awayTeam: 0 }
        };
        return await this.models.Fixture.create(fixture);
    }

    async createFixtures(numberOfFixtures) {
        let fixtures = [];
        for (let i = 0; i < numberOfFixtures; i++) {
            let fixture = await this.createFixture();
            fixtures.push(fixture);
        }
        return fixtures;
    }
}

const getRandomDateInString = (start, end) => {
    let date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

const getRandomTimeInString = () => {
    let hours = Math.floor(Math.random() * 24);
    let minutes = Math.floor(Math.random() * 60);
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${minutes}`;
}

const getRandomFootballRefereeName = () => {
    let referees = [
        'Mike Dean',
        'Martin Atkinson',
        'Anthony Taylor',
        'Andre Marriner',
        'Lee Mason',
        'Craig Pawson',
        'Paul Tierney',
        'Jonathan Moss',
        'Chris Kavanagh',
    ];

    return referees[Math.floor(Math.random() * referees.length)];
}

const getRandomMatchStatus = () => {
    let matchStatuses = [
        'live',
        'upcoming',
        'finished'
    ];

    return matchStatuses[Math.floor(Math.random() * matchStatuses.length)];
}

module.exports = FixtureFactory;