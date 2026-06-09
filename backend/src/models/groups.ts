import { AllowNull, Column, DataType, Default, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import Meetings from "./meetings";

@Table({
    underscored: true
})
export default class Groups extends Model {

    @PrimaryKey 
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)   
    id: string

    @AllowNull(false)
    @Column(DataType.STRING)   
    name: string

    @HasMany(() => Meetings, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    meetings: Meetings[];
}