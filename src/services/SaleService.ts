import {inject, injectable} from "inversify";
import {AppDataSource} from "../data-source";
import {Sale} from "../entity/Sale";
import {FindManyOptions, Like, MoreThan} from "typeorm";
import {RevisionService} from "./RevisionService";
import * as _ from 'lodash'
import {FindOptionsWhere} from "typeorm/find-options/FindOptionsWhere";


const MINUTES_IN_RECENT_SALES = 5
const MINUTES_TO_MILLI_CONVERSION = 1000 * 60

@injectable()
export class SaleService {
    constructor(@inject("RevisionService") private revisionService: RevisionService) {
    }

    public async getSales(): Promise<Sale[]> {
        return AppDataSource.manager.find(Sale);
    }

    public async createSale(saleIn: Sale): Promise<Sale> {
        const sale = new Sale()
        sale.description = saleIn.description;
        sale.mount = saleIn.mount;
        sale.ingress = saleIn.ingress;
        sale.change = saleIn.change;
        sale.saleTime = new Date();

        sale.revision = await this.revisionService.getLastRevision();
        return AppDataSource.manager.save(sale);

    }

    public async getSale(id: number): Promise<Sale> {
        return AppDataSource.manager.findOneBy(Sale, {id: id});
    }

    public async getRecentSales(): Promise<Sale[]> {
        const date = new Date()
        date.setTime(date.getTime() - MINUTES_IN_RECENT_SALES * MINUTES_TO_MILLI_CONVERSION)
        return AppDataSource.manager.findBy(Sale, {saleTime: MoreThan(date)})
    }

    public async getSaleByRevision(revisionId: string): Promise<Sale[]> {
        return AppDataSource.manager.find(Sale, {
            relations: ["revision"],
            where: {revision: {id: _.toNumber(revisionId)}}
        })
    }

    public async findSales(data: string): Promise<Sale[]> {
        const whereConditions: FindOptionsWhere<Sale>[] = [
            {description: Like('%' + data + '%')},
        ]

        if (!isNaN(_.toNumber(data))) {
            whereConditions.push({mount: _.toNumber(data)})
            whereConditions.push({ingress: _.toNumber(data)})
            whereConditions.push({change: _.toNumber(data)})
        }

        return AppDataSource.manager.find(Sale, {
            where: whereConditions
        })
    }
}