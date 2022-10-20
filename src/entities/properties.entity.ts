import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

@Entity('properties')
class Properties{
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column({name: 'sold', default: false})
    sold: boolean;

    @Column({name: 'value', type: 'decimal', })
}