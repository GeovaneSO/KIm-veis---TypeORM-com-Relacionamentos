import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('addresses')
class Addresses{

    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column({length: 100, name: 'district', nullable: true})
    district: string;

    @Column({length: 100, name:'zipCode', nullable: true})
    zipCode: string;

    @Column({length: 100, name: 'name', nullable: true})
    number: string;

    @Column({length: 100, name: 'city', nullable: true})
    city: string;

    @Column({length: 100, name: 'state', nullable: true})
    state: string;
}
export default Addresses;