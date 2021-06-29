exports.myinsert=(dbName,mycollection,insertData)=>{
  const MongoClient = require('mongodb').MongoClient;
  const assert = require('assert');
  // Connection URL
  const url = 'mongodb://localhost:27017';
  // Database Name
  //const dbName = 'mydb';
  // Create a new MongoClient
  const client = new MongoClient(url,{ useUnifiedTopology: true });
  // Use connect method to connect to the Server
  client.connect(function(err) {
    //assert.equal(null, err);
    if(err) console.log('Connect fail!')
    else console.log("Connected successfully to server");
    const db = client.db(dbName);
    const collection = db.collection(mycollection);
    // Insert some documents
    collection.insertMany(insertData, function(err, result) {
      if(err) console.log("Inserte fail!")
      else console.log("Inserted 3 documents into the collection");
      console.log(result);
      client.close();
    });
    //client.close();
  });
 }

 exports.myfind=(dbName,mycollection,findData,callbcak)=>{
  const MongoClient = require('mongodb').MongoClient;
  const assert = require('assert');
  // Connection URL
  const url = 'mongodb://localhost:27017';
  // Database Name
  //const dbName = 'mydb';
  // Create a new MongoClient
  const client = new MongoClient(url,{ useUnifiedTopology: true });
  // Use connect method to connect to the Server
  client.connect(function(err) {
    //assert.equal(null, err);
    if(err) console.log('Connect fail!')
    else console.log("Connected XXXXXX");
    const db = client.db(dbName);
    const collection = db.collection(mycollection);
    // Insert some documents
    collection.find(findData).toArray(function(err, docs) {
      if(err) console.log("Found the following FUCK")
      else console.log("Found the following records");
      callbcak(docs);
      // client.close();
    });
    //client.close();
  });
 }