import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import Properties from "./properties.entity";
import { User } from "./user.entity";

@Entity('schedules_user_properties')
class Schedules_user_properties {   
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column( {type: 'date' ,nullable: true})
    date: string

    @Column({type: "time"})
    hour: string;

    @ManyToOne(() => Properties)
    property: Properties;
    
    @ManyToOne(() => User)
    user: User;
    
}

export default Schedules_user_properties;