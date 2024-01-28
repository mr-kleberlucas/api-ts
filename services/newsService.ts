import NewsRepository from "../repository/newsRepository";

class NewsService {
    async search(term, page, perPage) {
        return await NewsRepository.find({ 'title': new RegExp('.*' + term + '*.', 'i'), 'active': true })
            .skip((page - 1) * perPage)
            .limit(perPage);
    }

    async get() {
        let startDate = new Date("2019-01-01T00:00:00.0000Z");
        let endDate = new Date("2024-03-01T00:00:00.0000Z");

        // return await NewsRepository.find({ 'publishDate': { $gt: startDate, $lt: endDate }, 'active': true, 'tag': 'not' }, 'title hat img publishDate').sort({ publishDate: -1 }).limit(2);
        return await NewsRepository.find({});
    }

    async getById(_id) {
        return await NewsRepository.findById(_id);
    }

    async create(news) {
        return await NewsRepository.create(news);
    }

    async update(_id, news) {
        return await NewsRepository.findByIdAndUpdate(_id, news);
    }

    async delete(_id) {
        return await NewsRepository.findByIdAndDelete(_id);
    }
}

export default new NewsService();