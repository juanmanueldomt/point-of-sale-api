import "reflect-metadata"
import { DataSource } from "typeorm"
import {Sale} from "./entity/Sale";
import {Revision} from "./entity/Revision";
import {User} from "./entity/User";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "p4ssw0rd",
    database: "PointOfSale",
    synchronize: true,
    logging: true,
    entities: [Sale, Revision, User],
    migrations: [],
    subscribers: [],
})
