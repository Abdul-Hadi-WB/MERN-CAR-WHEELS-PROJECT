import mongoose from 'mongoose'

import {MONGODB_LOCAL_URI,MONGODB_CLOUD_URI } from './config.js'

const dbConfig = () => {
 mongoose.connect(MONGODB_CLOUD_URI)
 .then(conn => console.log(`Our application is connected with ${conn.connection.host}`))
 .catch(err => console.log('DB connection failed'+ err))}

 export default dbConfig