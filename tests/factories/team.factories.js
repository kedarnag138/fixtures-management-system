'use strict';

class TeamFactory {
    constructor(sequelize) {
        this.client = sequelize;
        this.models = sequelize.models;
    }

    async createTeam() {
        let [newTeam, created] = await this.models.Team.findOrCreate({
            where: {
                name: getRandomFootballTeamName(),
            },
            defaults: {
                location: getRandomFootballStadiumName(),
                manager: getRandomFootballManagerName(),
                capacity: getRandomFootballStadiumCapacity(),
                league: 'Premier League',
                stadium: getRandomFootballStadiumName()
            }
        });
        return newTeam;
    }

    async createTeams(count) {
        let teams = [];
        for (let i = 0; i < count; i++) {
            teams.push(await this.createTeam());
        }
        return teams;
    }
}


const getRandomFootballTeamName = () => {
    const footballTeamNames = [
        'Arsenal', 'Aston Villa', 'Bournemouth', 'Brighton', 'Burnley', 'Chelsea', 'Crystal Palace', 'Everton', 'Leicester', 'Liverpool', 'Manchester City', 'Manchester United', 'Newcastle', 'Norwich', 'Sheffield United', 'Southampton', 'Tottenham', 'Watford', 'West Ham', 'Wolves'
    ];
    return footballTeamNames[Math.floor(Math.random() * footballTeamNames.length)];
};

const getRandomFootballManagerName = () => {
    const footballManagerNames = [
        'Arsene Wenger', 'Steve Bruce', 'Eddie Howe', 'Graham Potter', 'Sean Dyche', 'Frank Lampard', 'Roy Hodgson', 'Marco Silva', 'Brendan Rodgers', 'Jurgen Klopp', 'Pep Guardiola', 'Ole Gunnar Solskjaer', 'Steve Bruce', 'Daniel Farke', 'Chris Wilder', 'Ralph Hasenhuttl', 'Jose Mourinho', 'Javi Gracia', 'David Moyes', 'Nuno Espirito Santo'
    ];
    return footballManagerNames[Math.floor(Math.random() * footballManagerNames.length)];
}

const getRandomFootballStadiumName = () => {
    const footballStadiumNames = [
        'Emirates Stadium', 'Villa Park', 'Vitality Stadium', 'Amex Stadium', 'Turf Moor', 'Stamford Bridge', 'Selhurst Park', 'Goodison Park', 'King Power Stadium', 'Anfield', 'Etihad Stadium', 'Old Trafford', 'St James Park', 'Carrow Road', 'Bramall Lane', 'St Marys Stadium', 'Tottenham Hotspur Stadium', 'Vicarage Road', 'London Stadium', 'Molineux Stadium'
    ];
    return footballStadiumNames[Math.floor(Math.random() * footballStadiumNames.length)];
}

const getRandomFootballStadiumCapacity = () => {
    const footballStadiumCapacities = [
        60000, 40000, 12000, 30000, 20000, 40000, 25000, 40000, 32000, 54000, 55000, 75000, 52000, 27000, 32000, 32000, 62000, 21000, 60000, 32000
    ];
    return footballStadiumCapacities[Math.floor(Math.random() * footballStadiumCapacities.length)];
}

module.exports = TeamFactory;