const mongo = require('mongodb');
const Promise = require('bluebird');
const template = require('./file.json');

const MongoClient = mongo.MongoClient;
const ObjectId = mongo.ObjectId;

const LOCAL_URL = 'mongodb://localhost:27017/totem';
const DEV_URL =
  'mongodb+srv://totemadmin:olegoleg@totem-mrp6w.gcp.mongodb.net?retryWrites=true&w=majority';
const PROD_URL =
  'mongodb+srv://totemadmin:olegoleg@prod-totem-mrp6w.gcp.mongodb.net/test?retryWrites=true&w=majority';
const DB_NAME = 'totem';
const QUESTIONNAIRE_TEMPLATES = 'questionnaireTemplates';
const QUESTIONNAIRE_INSTANCES = 'questionnaireInstances';

function getAllDocs(collection) {
  return new Promise((resolve, reject) => {
    collection.find({}).toArray((err, docs) => {
      if (err) {
        return reject(err);
      }

      return resolve(docs);
    });
  });
}

MongoClient.connect(PROD_URL, async (err, client) => {
  if (err) {
    client.close();
    console.error(err);
  }

  try {
    const db = client.db(DB_NAME);
    const templatesCollection = db.collection(QUESTIONNAIRE_TEMPLATES);

    const templates = await getAllDocs(templatesCollection);

    // templates.forEach(template => {
    //   if (template.name === 'BCET Enterprise') {
    //     console.log(JSON.stringify(template));
    //   }
    // });

    // Google APAC
    // org: ObjectId("5d29d6863c7ba7000149eea5")
    // user: ObjectId("5d29df557140f40001eb185e")

    // Google EMEA
    // org: ObjectId("5d29debd3c7ba7000149eea6")
    // user: ObjectId("5d2a023f7140f40001eb185f")

    // Google Americas
    // org: ObjectId("5d29ded17140f40001eb185d")
    // user: ObjectId("5d2a04207140f40001eb1860")

     // Totem Buildings
    // org: ObjectId("5cb770e6a275c500012ab2e9")
    // user: ObjectId("5d2667343c7ba7000149eea0")




    templatesCollection.insertOne({
      ...template,
      organizationId: ObjectId("5d289c42461ab90001ba356c"),
      updatedBy: '5d3a819d877869cf0c2d0d94',
      createdBy: '5d3a819d877869cf0c2d0d94',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    client.close();
  } catch (e) {
    console.error(e);
    console.error(e);
    client.close();
  }
});
