import {connect} from "mongoose";

function db_connect(){
    try {
        const db_url: string = process.env.DB_URL || "";
        connect(db_url);
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export default db_connect;