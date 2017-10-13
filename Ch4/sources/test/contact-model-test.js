var mongoose = require('mongoose');
var should = require('should');
var prepare = require('./prepare');

var contactSchema = new mongoose.Schema({
  primarycontactnumber: {
    type: String,
    index: {
      unique: true
    }
  },
  firstname: String,
  lastname: String,
  title: String,
  company: String,
  jobtitle: String,
  othercontactnumbers: [String],
  primaryemailaddress: String,
  emailaddresses: [String],
  groups: [String]
});

var Contact = mongoose.model('Contact', contactSchema);

var uri = 'mongodb://admin:admin@cluster0-shard-00-00-5mlyc.mongodb.net:27017,cluster0-shard-00-01-5mlyc.mongodb.net:27017,cluster0-shard-00-02-5mlyc.mongodb.net:27017/contacts-test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';
mongoose.connect(uri, {
  useMongoClient: true,
  keepAlive: 1,
  connectTimeoutMS: 30000
});

describe('Contact: models', function () {


  describe('#create()', function () {
    it('Should create a new Contact', function (done) {
      this.timeout(15000);
      var contactModel = {
        "firstname": "John",
        "lastname": "Douglas",
        "title": "Mr.",
        "company": "Dev Inc.",
        "jobtitle": "Developer",
        "primarycontactnumber": "+359777223345",
        "primaryemailaddress": "john.douglas@xyz.com",
        "groups": ["Dev"],
        "emailaddresses": ["j.douglas@xyz.com"],
        "othercontactnumbers": ['+359777223346', '+359777223347']
      };
      console.log('1');

      Contact.create(contactModel, function (err, createdModel) {
        console.log('2');
        // Check that no error occured
        should.not.exist(err);
        // Assert that the returned contact has  is what we expect

        createdModel.firstname.should.equal('John');
        createdModel.lastname.should.equal('Douglas');
        createdModel.title.should.equal('Mr.');
        createdModel.jobtitle.should.equal('Developer');
        createdModel.primarycontactnumber.should.equal('+359777223345');
        createdModel.primaryemailaddress.should.equal('john.douglas@xyz.com');
        createdModel.groups[0].should.equal('Dev');
        createdModel.emailaddresses[0].should.equal('j.douglas@xyz.com');
        createdModel.othercontactnumbers[0].should.equal('+359777223346');
        createdModel.othercontactnumbers[1].should.equal('+359777223347');
        //Notify mocha that the test has completed
        done();
      });
    });
  });


});