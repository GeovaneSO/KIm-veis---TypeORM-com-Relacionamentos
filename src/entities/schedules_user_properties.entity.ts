import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import Properties from "./properties.entity";
import { User } from "./user.entity";

@Entity('schedules_user_properties')
class Schedules_user_properties {   
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column('date', {name: 'date', nullable: true})
    date: Date

    @Column('time', {name: 'hour'})
    hour: Date;

    @ManyToOne(() => Properties, property => property.schedules)
    property: Properties;
    
    @ManyToOne(() => User, user => user.schedules)
    user: User


    
}

export default Schedules_user_properties;