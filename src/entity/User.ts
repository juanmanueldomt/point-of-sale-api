import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    public user!: string;
    @Column()
    public pass!: string;
}