import * as bodyParser from 'body-parser';
import "reflect-metadata";

import {AppDataSource} from "./data-source"
import {InversifyExpressServer} from "inversify-express-utils";
import {Container} from "inversify";

import "./controllers/SaleController";
import "./controllers/RevisionController"
import "./controllers/UserController"
import {SaleService} from "./services/SaleService";
import winston, {createLogger, transports} from "winston";
import {RequestHelper} from "./common/RequestHelper";
import {RevisionService} from "./services/RevisionService";
import {UserService} from "./services/UserService";

const logger = createLogger({
    level: 'info',
    format: winston.format.cli(),
    defaultMeta: {service: 'user-service'},
    transports: [
        new transports.Console({level: 'info'}),
    ],
});
AppDataSource.initialize().then(async () => {


    logger.info("DB Connection established")

    // set up container
    let container: Container = new Container();
    container.bind<SaleService>("SaleService").to(SaleService).inSingletonScope()
    container.bind<RevisionService>("RevisionService").to(RevisionService).inSingletonScope()
    container.bind<UserService>("UserService").to(UserService).inSingletonScope()

    const logRequest = async (req, res, next) => {
        const msg = RequestHelper.formatInfoRequest(req)
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        await next();
        logger.info(msg + " | " + RequestHelper.formatInfoResponse(res))
    };

    let server = new InversifyExpressServer(container)
    server.setConfig((app) => {
        app.use(logRequest)
        // add body parser
        app.use(bodyParser.urlencoded({
            extended: true
        }));
        app.use(bodyParser.json());
    });

    let app = server.build();

    app.listen(3000, () => {
        logger.info("Server Running...");
    });

}).catch(error => logger.error(error))
