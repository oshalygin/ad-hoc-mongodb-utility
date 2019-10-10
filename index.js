const mongo = require('mongodb');
const Promise = require('bluebird');
// const template = require('./file.json');

const MongoClient = mongo.MongoClient;
const ObjectId = mongo.ObjectId;
const ObjectID = mongo.ObjectID;

const LOCAL_URL = 'mongodb://localhost:27017/totem';
const DEV_URL =
  'mongodb+srv://totemadmin:olegoleg@totem-mrp6w.gcp.mongodb.net?retryWrites=true&w=majority';
const PROD_URL =
  'mongodb+srv://totemadmin:olegoleg@prod-totem-mrp6w.gcp.mongodb.net/test?retryWrites=true&w=majority';
const DB_NAME = 'totem';

const ORGANIZATIONS = 'organizations';
const QUESTIONNAIRE_TEMPLATES = 'questionnaireTemplates';
const QUESTIONNAIRE_INSTANCES = 'questionnaireInstances';
const SITES = 'sites';
const CUSTOMERS = 'customers';
const NETWORKS = 'networks';
const USERS = 'users';
const DEVICES = 'devices';
const NMAP = 'nmap';
const ANALYSIS = 'analysis';
const MEDIA = 'media';

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

    const analysisCollection = db.collection(ANALYSIS);
    // const analysis = await getAllDocs(analysisCollection);

    const customersCollection = db.collection(CUSTOMERS);
    const customers = await getAllDocs(customersCollection);

    const devicesCollection = db.collection(DEVICES);
    // const devices = await getAllDocs(devicesCollection);

    const mediaCollection = db.collection(MEDIA);
    // const media = await getAllDocs(mediaCollection);

    const networksCollection = db.collection(NETWORKS);
    // const networks = await getAllDocs(networksCollection);

    const nmapCollection = db.collection(NMAP);
    // const nmap = await getAllDocs(nmapCollection);

    const organizationsCollection = db.collection(ORGANIZATIONS);
    // const organizations = await getAllDocs(organizationsCollection);

    const instancesCollection = db.collection(QUESTIONNAIRE_INSTANCES);
    // const instances = await getAllDocs(instancesCollection);

    const templatesCollection = db.collection(QUESTIONNAIRE_TEMPLATES);
    // const templates = await getAllDocs(templatesCollection);

    const sitesCollection = db.collection(SITES);
    // const sites = await getAllDocs(sitesCollection);

    const usersCollection = db.collection(USERS);
    // const users = await getAllDocs(usersCollection);

    let oldCustomerOrgId;
    const newOrganizationId = ObjectId('5b2f1be53911bd000175043a');
    console.log(newOrganizationId.toHexString());
    customers.forEach(customer => {
      if (customer.name === 'Kaiser Permanente') {
        console.log(JSON.stringify(customer, null, 2));
        oldCustomerOrgId = ObjectId(customer.organizationId);
      }
    });

    // update analysis collection organizationId with ObjectId

    const analysisResult = await analysisCollection.updateMany(
      { organizationId: oldCustomerOrgId },
      {
        $set: {
          organizationId: newOrganizationId,
        },
      },
    );

    console.log(analysisResult);

    // update customer collection organizationId with objectId

    const customerResult = await customersCollection.updateMany(
      { organizationId: oldCustomerOrgId },
      {
        $set: {
          organizationId: newOrganizationId,
        },
      },
    );

    console.log(customerResult);

    // update devices collection organizationId with objectId

    const devicesResult = await devicesCollection.updateMany(
      { organizationId: oldCustomerOrgId },
      {
        $set: {
          organizationId: newOrganizationId,
        },
      },
    );

    console.log(devicesResult);

    // update media collection organizationId with objectId

    const mediaResult = await mediaCollection.updateMany(
      { organizationId: oldCustomerOrgId },
      {
        $set: {
          organizationId: newOrganizationId,
        },
      },
    );

    console.log(mediaResult);

    // update networks collection organizationId with objectId

    const networksResult = await networksCollection.updateMany(
      { organizationId: oldCustomerOrgId },
      {
        $set: {
          organizationId: newOrganizationId,
        },
      },
    );

    console.log(networksResult);

    // update nmap collection organizationId with objectId

    const nmapResult = await nmapCollection.updateMany(
      { organizationId: oldCustomerOrgId },
      {
        $set: {
          organizationId: newOrganizationId,
        },
      },
    );

    console.log(nmapResult);

    // update questinnaireInstances collection organizationId with objectId

    const instancesResult = await instancesCollection.updateMany(
      { organizationId: oldCustomerOrgId },
      {
        $set: {
          organizationId: newOrganizationId,
        },
      },
    );

    console.log(instancesResult);

    // update templates collection organizationId with objectId

    const templatesResult = await templatesCollection.updateMany(
      { organizationId: oldCustomerOrgId },
      {
        $set: {
          organizationId: newOrganizationId,
        },
      },
    );

    console.log(templatesResult);

    // update sites collection organizationId with objectId

    const sitesResult = await sitesCollection.updateMany(
      { organizationId: oldCustomerOrgId },
      {
        $set: {
          organizationId: newOrganizationId,
        },
      },
    );

    console.log(sitesResult);

    // const sitesResult = await sitesCollection.updateMany(
    //   { organizationId: oldCustomerOrgId },
    //   {
    //     $set: {
    //       organizationId: newOrganizationId,
    //     },
    //   },
    // );

    // console.log(sitesResult);

    // templatesCollection.insertOne({
    //   ...template,
    //   organizationId: ObjectId('5d4591100f9272000114fe03'),
    //   updatedBy: '5d3a819d877869cf0c2d0d94',
    //   createdBy: '5d3a819d877869cf0c2d0d94',
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // });
    client.close();
  } catch (e) {
    console.error(e);
    client.close();
  }
});
