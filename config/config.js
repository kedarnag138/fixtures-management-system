'use strict';

module.exports = {
	"development": {
		"database": "fixtures_management_development",
		"host": "127.0.0.1",
		"dialect": "mysql",
		"port": 3306,
		"username": "root",
		"password": "password",
		"socketPath": "/var/lib/mysql/mysql.sock"
	},
	"test": {
		"database": "fixtures_management_test",
		"host": "127.0.0.1",
		"dialect": "mysql",
		"port": 3306,
		"username": "root",
		"password": "password"
	},
	"dev": {
		"database": "heroku_51951fb98ebdf24",
		"host": "eu-cdbr-west-03.cleardb.net",
		"dialect": "mysql",
		"port": 3306,
		"username": "b47f9a1030846a",
		"password": "bbb0a210",

	}
}