import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, OneToMany } from "typeorm";
import Properties from "./properties.entity";

@Entity('categories')
class Categories{
    @PrimaryGeneratedColumn('uuid')
    readonly id: string

    @Column({length: 100, unique: true, nullable: true})
    name: string

    @OneToMany(() => Properties, property => property.category)
    properties: Properties[]
}
export default Categories;