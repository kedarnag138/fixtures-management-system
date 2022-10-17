'use strict';

class FixtureService {
    constructor(sequelize) {
        this.client = sequelize;
        this.models = sequelize.models;
    }

    async findAll(date, currentPage, itemsPerPage) {
        let fixtures = [];
        let allFixtures;


        if (date) {
            allFixtures = await this.models.Fixture.findAll({
                where: {
                    date: date
                }
            })
        } else {
            allFixtures = await this.models.Fixture.findAll();
        }

        let liveFixtures = await this.getLiveFixtures(allFixtures.filter(fixture => fixture.matchStatus === 'live'));
        let upcomingFixtures = await this.getUpcomingFixtures(allFixtures.filter(fixture => fixture.matchStatus === 'upcoming'));
        let finishedFixtures = await this.getFinishedFixtures(allFixtures.filter(fixture => fixture.matchStatus === 'finished'));

        fixtures.push(liveFixtures, upcomingFixtures, finishedFixtures);

        fixtures = [].concat.apply([], fixtures);

        return fixtures;
    }

    async createFixture(fixture) {
        fixture.matchStatus = fixture.matchStatus || 'upcoming';
        fixture.score = fixture.score || { homeTeam: 0, awayTeam: 0 };
        let newFixture = this.models.Fixture.build(fixture);
        return await newFixture.save();
    }

    async bulkCreate(fixtures) {
        return this.models.Fixture.bulkCreate(fixtures);
    }

    async getLiveFixtures(fixtures) {
        let liveFixtures = await Promise.all(fixtures.map(async (fixture) => {
            let liveFixture = await this.models.Fixture.findOne({
                where: {
                    id: fixture.id
                },
                order: [
                    ['date', 'DESC'],
                    ['time', 'DESC']
                ],
            });
            liveFixture.dataValues.homeTeam = await this.models.Team.findOne({ where: { id: liveFixture.homeTeamId } }).then((team) => {return team.name});
            liveFixture.dataValues.awayTeam = await this.models.Team.findOne({ where: { id: liveFixture.awayTeamId } }).then((team) => {return team.name});
            liveFixture.dataValues.score = JSON.parse(liveFixture.score);
            return liveFixture;
        }));
        return this.sortFixtures(liveFixtures);
    }

    async getUpcomingFixtures(fixtures) {
        let upcomingFixtures = await Promise.all(fixtures.map(async (fixture) => {
            let upcomingFixture = await this.models.Fixture.findOne({
                where: {
                    id: fixture.id
                },
            });
            upcomingFixture.dataValues.homeTeam = await this.models.Team.findOne({ where: { id: upcomingFixture.homeTeamId } }).then((team) => {return team.name});
            upcomingFixture.dataValues.awayTeam = await this.models.Team.findOne({ where: { id: upcomingFixture.awayTeamId } }).then((team) => {return team.name});
            upcomingFixture.dataValues.score = JSON.parse(upcomingFixture.score);
            return upcomingFixture;
        }));
        return this.sortFixtures(upcomingFixtures);
    }

    async getFinishedFixtures(fixtures) {
        let finishedFixtures = await Promise.all(fixtures.map(async (fixture) => {
            let finishedFixture = await this.models.Fixture.findOne({
                where: {
                    id: fixture.id
                },
                order: [
                    ['date', 'DESC'],
                    ['time', 'DESC']
                ],
            });
            finishedFixture.dataValues.homeTeam = await this.models.Team.findOne({ where: { id: finishedFixture.homeTeamId } }).then((team) => {return team.name});
            finishedFixture.dataValues.awayTeam = await this.models.Team.findOne({ where: { id: finishedFixture.awayTeamId } }).then((team) => {return team.name});
            finishedFixture.dataValues.score = JSON.parse(finishedFixture.score);
            return finishedFixture;
        }));
        return this.sortFixtures(finishedFixtures);
    }

    async sortFixtures(fixtures) {
        fixtures.sort((a, b) => {
            if (a.date < b.date) {
                return -1;
            }
            if (a.date > b.date) {
                return 1;
            }
            if (a.time < b.time) {
                return -1;
            }
            if (a.time > b.time) {
                return 1;
            }
            return 0;
        });
        return fixtures;
    }
}

module.exports = FixtureService;