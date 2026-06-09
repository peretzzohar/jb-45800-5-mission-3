import { Sequelize } from "sequelize-typescript";
import config from 'config'
import Groups from "../models/groups";
import Meetings from "../models/meetings";

const sequelize = new Sequelize({
    dialect: 'mysql',
    models: [Groups , Meetings], // <= add all sequelize models here
    logging: console.log,
    ...config.get('db')
})

console.log(`connected to database on `, config.get('db'))

export default sequelize