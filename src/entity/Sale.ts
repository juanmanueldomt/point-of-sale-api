import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm"
import {Revision} from "./Revision";

@Entity()
export class Sale {

    @PrimaryGeneratedColumn()
    id: number
    @Column()
    public description?: string | null;
    @Column()
    public mount!: number;
    @Column()
    public ingress!: number;
    @Column()
    public change!: number;
    @Column()
    public saleTime!: Date;

    @ManyToOne(() => Revision, (revision:Revision) => revision.sales)
    revision: Revision

}
