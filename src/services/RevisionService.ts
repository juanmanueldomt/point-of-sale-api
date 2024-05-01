import {Revision} from "../entity/Revision";
import {AppDataSource} from "../data-source";
import {injectable} from "inversify";
import {LessThan} from "typeorm";
import * as _ from 'lodash';

@injectable()
export class RevisionService {

    public async getLastRevision(): Promise<Revision> {
        const lastRevision = await AppDataSource.manager.findOne(Revision, {
                order: {revisionTime: "DESC"}, where: {revisionTime: LessThan(new Date())}
            }
        )
        if (!lastRevision) {
            const revision = new Revision()
            revision.revisionTime = new Date()
            revision.singleCoins = 0
            revision.tenCoins = 0
            revision.twenties = 0
            revision.fifties = 0
            revision.hundreds = 0
            revision.twoHundreds = 0
            revision.fiveHundreds = 0
            revision.isSetMoney = true
            revision.total = 0
            return AppDataSource.manager.save(revision)
        }
        return lastRevision
    }

    public async getRevisions(): Promise<Revision[]> {
        return AppDataSource.manager.find(Revision, {order: {revisionTime: "DESC"}})
    }

    public async createRevisions(revisionIn: Revision): Promise<Revision> {
        const revision: Revision = new Revision();
        revision.singleCoins = revisionIn.singleCoins
        revision.tenCoins = revisionIn.tenCoins
        revision.twenties = revisionIn.twenties
        revision.fifties = revisionIn.fifties
        revision.hundreds = revisionIn.hundreds
        revision.twoHundreds = revisionIn.twoHundreds
        revision.fiveHundreds = revisionIn.fiveHundreds
        revision.total = revisionIn.total
        revision.totalSale = revisionIn.totalSale
        revision.totalSpent = revisionIn.totalSpent
        revision.result = revisionIn.result
        revision.isSetMoney = revisionIn.isSetMoney
        revision.revisionTime = new Date()
        return AppDataSource.manager.save(revision)
    }

    public async getNextRevision(id: string): Promise<Revision> {
        return AppDataSource.manager.findOne(Revision, {where: {id: _.toNumber(id) + 1}})
    }
}