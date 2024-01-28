import * as HttpStatus from "http-status";
import * as redis from "redis";

import NewsService from "../services/newsService";
import Helper from "../infra/helper";
import ExportFiles from "../infra/exportFiles";

class NewsController {
    async get(req, res) {
        try {
            // let client = redis.createClient({ url: 'redis://redis:6379', name: 'redis' }); //Rodando com Docker Compose
            let client = redis.createClient(); // Rodando Local
            await client.connect();

            const data = await client.get("news")
            if (data != null) {
                console.log('redis');
                Helper.sendResponse(res, HttpStatus.OK, JSON.parse(data));
            } else {
                let response = await NewsService.get();
                console.log('db');
                client.set('news', JSON.stringify(response));
                client.expire('news', 1);
                Helper.sendResponse(res, HttpStatus.OK, response);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async getById(req, res) {
        try {
            const _id = req.params.id;
            let response = await NewsService.getById(_id);
            Helper.sendResponse(res, HttpStatus.OK, response);
        } catch (error) {
            console.error(error);
        }
    }

    async search(req, res) {
        try {
            const term = req.params.term;
            const page = (req.param('page')) ? parseInt(req.param('page')) : 1;
            const perPage = (req.param('limit')) ? parseInt(req.param('page')) : 10;

            let response = await NewsService.search(term, page, perPage);
            Helper.sendResponse(res, HttpStatus.OK, response);
        } catch (error) {
            console.error(error);
        }
    }

    async exportToCsv(req, res) {
        try {
            let response = await NewsService.get();
            let filename = ExportFiles.tocsv(response);
            Helper.sendResponse(res, HttpStatus.OK, req.get('host') + "/exports/" + filename);
        } catch (error) {
            console.error(error);
        }
    }

    async create(req, res) {
        try {
            let vm = req.body;
            await NewsService.create(vm);
            Helper.sendResponse(res, HttpStatus.OK, "Notícia cadastrada com sucesso!");
        } catch (error) {
            console.error(error);
        }
    }

    async update(req, res) {
        try {
            const _id = req.params.id;
            let news = req.body;
            await NewsService.update(_id, news);
            Helper.sendResponse(res, HttpStatus.OK, 'Notícia atualizada com sucesso!');
        } catch (error) {
            console.error(error);
        }
    }

    async delete(req, res) {
        try {
            const _id = req.params.id;
            await NewsService.delete(_id);
            Helper.sendResponse(res, HttpStatus.OK, "Notícia deletada com sucesso!");
        } catch (error) {
            console.error(error);
        }
    }
}

export default new NewsController();