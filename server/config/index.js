
import dotenv from 'dotenv';
//require('dotenv').config(); // this loads the defined variables from .env
dotenv.config()
const config = {
  db: {
    url: process.env.MONGO_URL,
    name: process.env.MONGO_DB
  }

//const config = {
//    db: {
//      url: 'MONGO_URL'
//      name: 'leylixchat'
//    }
  }
  
  export default config