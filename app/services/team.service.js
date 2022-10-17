'use strict';

class TeamService {
    constructor(sequelize) {
        this.client = sequelize;
        this.models = sequelize.models;
    }

    async findAll() {
        return await this.models.Team.findAll();
    }

    async createTeam(team) {
        let newTeam = this.models.Team.build(team);
        return await newTeam.save();
    }

    async bulkCreate(teams) {
        return this.models.Team.bulkCreate(teams);
    }
}

module.exports = TeamService;