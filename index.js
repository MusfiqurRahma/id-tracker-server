const { MongoClient } = require('mongodb');
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express()


app.use(cors());
app.use(express.json());
const port =  process.env.PORT || 5000;


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.k4g9x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
try {
      await client.connect();
      const database = client.db("tracker_db");
      const idCollection = database.collection("id_database");
      
      app.post('/id', async (req, res) => {
        const id = req.body;
        const result = await idCollection.insertOne(id);
        res.send(result);
      });
}
finally {
    //   await client.close();
}
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('<h2>Hello World!!!! This is Id tracker server</h2>')
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
