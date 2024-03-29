import * as mongoose from 'mongoose';

class Database { 
    // private DB_URL = 'mongodb://link-db/db_portal'; // Rodando com Docker Compose
    private DB_URL = 'mongodb://localhost:27017/db_portal'; // Rodando local

    createConnection(){
        mongoose.connect(this.DB_URL);
    }
}

export default Database;