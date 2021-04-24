import { initModels } from '../models/init-models';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('shop', 'root', 'password', {
	host: 'localhost',
	dialect: 'mysql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
	pool: {
		max: 10,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
});

let models = initModels(sequelize);

//sequelize.sync();

async function getUsers() {
	let users = await models.user.findAll();
	return users;
}

export { sequelize, models, getUsers };
