import { Sequelize } from "sequelize-typescript";
import config from 'config'
import Groups from "../models/group";
import Meetings from "../models/meeting";

const sequelize = new Sequelize({
    dialect: 'mysql',
    models: [Groups , Meetings],
    logging: console.log,
    ...config.get('db')
})

console.log(`connected to database on `, config.get('db'))

export default sequelize