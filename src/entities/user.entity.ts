import { Hash, randomUUID } from "crypto";
import { v4 as uuidv4 } from "uuid"
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from "typeorm";
import { Exclude } from "class-transformer";
import Schedules_user_properties from "./schedules_user_properties.entity";

@Entity('users') 
class User {

    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column({ length: 50 })
    name: string;

    @Column({ length: 50, unique: true, nullable: false})
    email: string

    @Column({ length: 120 })
    @Exclude()
    password: string;

    @Column()
    isAdm: boolean;

    @Column()
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Schedules_user_properties, schedules => schedules.user)
    schedules: Schedules_user_properties[]

}

export {User};