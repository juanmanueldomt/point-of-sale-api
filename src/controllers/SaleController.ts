import {controller, httpGet, httpPost, interfaces, request, response} from "inversify-express-utils";
import * as express from "express";
import {inject} from "inversify";
import {SaleService} from "../services/SaleService";
import {Sale} from "../entity/Sale";

@controller("/sale")
export class SaleController implements interfaces.Controller {

    constructor(@inject("SaleService") private saleService: SaleService) {}

    @httpGet("/")
    private index(@request() req: express.Request, @response() res: express.Response) {
        return this.saleService.getSales();
    }

    @httpGet("/recent-sale")
    private recentSale(@request() req: express.Request, @response() res: express.Response) {
        return this.saleService.getRecentSales();
    }
    @httpGet("/by-revision")
    private getSaleByRevision(@request() req: express.Request, @response() res: express.Response) {
        return this.saleService.getSaleByRevision(req.query.revisionId as string);
    }

    @httpGet("/search")
    private findSales(@request() req: express.Request, @response() res: express.Response) {
        return this.saleService.findSales(req.query.data as string);
    }
    @httpPost("/create")
    private createSale(@request() req: express.Request, @response() res: express.Response) {
        return this.saleService.createSale(req.body as Sale);
    }
}