import {connect} from "mongoose";

async function db_connect(){
    try {
        const db_url: string = process.env.DB_URL || "";
        connect(db_url).then(() => {
            console.log("connect success"); 
        });

    } catch (error: any) {
        throw new Error(error.message)
    }
}

export default db_connect;