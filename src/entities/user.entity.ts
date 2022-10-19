import { Hash, randomUUID } from "crypto";
import { v4 as uuidv4 } from "uuid"
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import { Exclude } from "class-transformer";

@Entity('users') 
class User {

    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column({ length: 50 })
    name: string;

    @Column({ length: 50, unique: true })
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

    @DeleteDateColumn()
    deleteAt?: Date;

}

export {User};