import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne, JoinColumn, OneToMany, ManyToOne } from "typeorm";
import Decimal from 'decimal.js'
import Addresses from "./addresses.entity";
import Schedules_user_properties from "./schedules_user_properties.entity";
import Categories from "./categories.entity";
@Entity('properties')
class Properties{
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column({name: 'sold', default: false})
    sold: boolean;

    @Column({name: 'value', type: 'decimal', precision: 12, scale: 2})
    value: number;

    @Column({type: 'integer', nullable: true})

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne((type) => Addresses, {
        eager: true
    })

    @JoinColumn()
    addresses: Addresses;

    @OneToMany(() => Schedules_user_properties, schedules => schedules.property, {
        eager: true
    })
    schedules: Schedules_user_properties[]
    
    @ManyToOne(() => Categories, (category) => category.properties)
    @JoinColumn()
    category: Categories;
    
}
export default Properties;