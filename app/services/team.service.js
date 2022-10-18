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
        let newTeam = await this.models.Team.build(team);
        return await newTeam.save();
    }

    async bulkCreate(teams) {
        return await this.models.Team.bulkCreate(teams);
    }

    async deleteRecentTeam() {
        let team = await this.models.Team.findOne({
            order: [['createdAt', 'DESC']]
        });
        return await team.destroy();
    }

    async deleteTeam(id) {
        let team = await this.models.Team.findOne({
            where: {
                id: id
            }
        });
        return await team.destroy();
    }

    async deleteAllTeams() {
        return await this.models.Team.destroy({
            where: {},
            truncate: true
        });
    }
}

module.exports = TeamService;