import express from 'express'
import cors from 'cors'
import { MongoClient } from 'mongodb'
import path from 'path'
import devBundle from './devBundle'
import template from './../template'


const CURRENT_WORKING_DIR = process.cwd()
const PORT = process.env.PORT || 3000
const MONGOURL = process.env.MONGODB_URI || 'mongodb://localhost:27017/mernSimpleSetup'

////// MONGODB
MongoClient.connect(MONGOURL, (err,db) => {
    console.log("Connected sucessfully to mongodb server")
    db.close()
})

////// EXPRESS
const app = express()
devBundle.compile(app)
app.use(cors())

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))
app.get('/', (req, res) => {
    res.status(200).send(template())
})

app.listen(PORT, function onStart(err) {
    if(err) {
        console.log(err)
    }
    console.info('Server with CORS started on port %s.', PORT)
})


