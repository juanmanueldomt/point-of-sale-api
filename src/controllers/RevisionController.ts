import {controller, httpGet, httpPost, interfaces, request, response} from "inversify-express-utils";
import * as express from "express";
import {inject} from "inversify";
import {RevisionService} from "../services/RevisionService";
import {Revision} from "../entity/Revision";

@controller("/revision")
export class RevisionController implements interfaces.Controller {

    constructor(
        @inject("RevisionService") private revisionService: RevisionService
    ) {
    }

    @httpGet("/")
    private index(@request() req: express.Request, @response() res: express.Response): Promise<Revision[]> {
        return this.revisionService.getRevisions();
    }

    @httpPost("/")
    private create(@request() req: express.Request, @response() res: express.Response): Promise<Revision> {
        return this.revisionService.createRevisions(req.body as Revision);
    }

    @httpGet("/last")
    private getLastRevision(@request() req: express.Request, @response() res: express.Response): Promise<Revision> {
        return this.revisionService.getLastRevision();
    }

    @httpGet("/next")
    private getNextRevision(@request() req: express.Request, @response() res: express.Response): Promise<Revision> {
        return this.revisionService.getNextRevision(req.query.revisionId as string)
    }

}