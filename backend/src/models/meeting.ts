import { AllowNull, BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import Groups from "./group";

@Table({
    underscored: true
})
export default class Meeting extends Model {
//meeting id :
    @PrimaryKey 
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)   
    meetingId: string

//group id : 
    @ForeignKey(() => Groups)
    @AllowNull(false)
    @Column(DataType.UUID)   
    groupId: string
    // @AllowNull(false)
    // @Column(DataType.STRING)   
    // name: string

 //begining date and time : 
    @AllowNull(false)
    @Column(DataType.DATE)
    startDate: Date

 //ending date and time :  

    @AllowNull(false)
    @Column(DataType.DATE)
    finishDate: Date

// description :     
    @AllowNull(false)
    @Column(DataType.TEXT)   
    description: string
    
// room details : 
    @AllowNull(false)
    @Column(DataType.STRING)   
    room: string


@BelongsTo(() => Groups)
group: Groups;

}