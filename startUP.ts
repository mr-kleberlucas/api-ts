import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as compression from 'compression';
import * as graphqlHTTP from 'express-graphql';

import Database from './infra/db';
import Auth from './infra/auth';
import uploads from './infra/uploads';
import newsRouter from './router/newsRouter';
import schemas from './graphql/schemas';
import resolvers from './graphql/resolvers';


class StartUp {
    public app: express.Application;
    private _db: Database;
    private bodyParser;

    constructor() {
        this.app = express();

        this._db = new Database();
        this._db.createConnection();

        this.middler();
        this.routes();
    }

    enableCors() {
        const options: cors.CorsOptions = {
            methods: "GET,OPTIONS,PUT,POST,DELETE",
            origin: "*"
        }

        this.app.use(cors(options));
    }

    middler() {
        this.enableCors();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(compression());
        this.app.use('/exports', express.static(process.cwd() + '/exports'));
    }

    routes() {
        this.app.route('/').get((req, res) => {
            res.send({ versao: '0.0.1' });
        });

        // this.app.use(Auth.validate);

        this.app.route("/uploads").post(uploads.single('file'), (req, res) => {
            try {
                res.send("Arquivo enviado com sucesso!");
            } catch (error) {
                console.log(error)
            }
        });

        this.app.use('/graphql', graphqlHTTP.graphqlHTTP({
            schema: schemas,
            rootValue: resolvers,
            graphiql: true,
        }));

        this.app.use("/", newsRouter);
    }
}

export default new StartUp();