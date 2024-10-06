
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000


console.log(process.env.DB_USERS)
console.log(process.env.DB_PASS)


app.use(cors())
app.use(express.json());



app.get('/', (req, res) => {
  res.send('TheTastyTimes server!')
})

////////////////mongoDB///////////////


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USERS}:${process.env.DB_PASS}@cluster0.ruz4b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection

    const TastyCollection = client.db('tastyMenuDB').collection('tastyMenuData')

    //crud///

    ////menuDataZ/////

    app.get('/menuData',  async(req, res) => {

      const cursor = TastyCollection.find() 
      const result = await cursor.toArray() 
      res.send(result)

    })
    ////menuDataZ/////

    const shopCollection = client.db('tastyDB').collection('tastyData')

    app.get('/shopData',  async(req, res) => {

      const cursor = shopCollection.find() 
      const result = await cursor.toArray() 
      res.send(result)

    })

    ///shopData//

      

    /////add///

    app.post('/shopData',  async(req, res) => {
      
         


    })


    /////add///
    

      

    ///shopData//

 



    //crud///


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

////////////////mongoDB///////////////

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})