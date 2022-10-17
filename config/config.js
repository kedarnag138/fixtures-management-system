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
		"use_env_variable": "DATABASE_URL"
	}
}