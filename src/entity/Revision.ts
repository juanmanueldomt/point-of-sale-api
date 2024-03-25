import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Sale} from "./Sale";

@Entity()
export class Revision {
    @PrimaryGeneratedColumn()
    public id!: number;
    @Column()
    public revisionTime!: Date;

    @Column()
    public singleCoins!: number;
    @Column()
    public tenCoins!: number;
    @Column()
    public twenties!: number;
    @Column()
    public fifties!: number;
    @Column()
    public hundreds!: number;
    @Column()
    public twoHundreds!: number;
    @Column()
    public fiveHundreds!: number;
    @Column()
    public isSetMoney!: boolean;
    @Column()
    public total!: number;
    @Column()
    public totalSale!: number;
    @Column()
    public totalSpent!: number;
    @Column()
    public result!: number;
    @OneToMany(() => Sale, (sale: Sale) => sale.revision)
    sales: Sale[]
}