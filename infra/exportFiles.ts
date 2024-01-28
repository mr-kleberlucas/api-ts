import * as json2csv from 'json2csv';
import * as uuid from 'uuid';
import * as fs from 'fs';

const fields = ['_id', 'hat', 'title', 'text', 'author', 'img', 'tag', 'publishDate', 'link', 'active'];
const opts = { fields };

class ExportFiles {
    tocsv = (news) => {
        try {
            const csv = json2csv.parse(news, opts);
            const filename = uuid.v4() + ".csv";

            fs.writeFile('./exports/' + filename, csv, (err) => {
                if (err) throw err;
                console.log('Arquivo salvo com sucesso!');
            });

            return filename;
        } catch (error) {
            console.error(error);
        }
    };
};

export default new ExportFiles();