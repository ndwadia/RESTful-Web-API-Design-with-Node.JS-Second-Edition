var mongoose = require('mongoose');

beforeEach(function (done) {

	console.log('3');

	function clearDatabase() {
		for (var i in mongoose.connection.collections) {
			mongoose.connection.collections[i].remove(function () {});
		}
		return done();
	}


	if (mongoose.connection.readyState === 0) {
		console.log('4');
		var uri = 'mongodb://admin:admin@cluster0-shard-00-00-5mlyc.mongodb.net:27017,cluster0-shard-00-01-5mlyc.mongodb.net:27017,cluster0-shard-00-02-5mlyc.mongodb.net:27017/contacts-test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';
		mongoose.connect(uri, {
			useMongoClient: true
		}, function (err) {
			if (err) {
				throw err;
			}
			return clearDatabase();
		});
	} else {
		console.log('5');

		return clearDatabase();
	}
});


afterEach(function (done) {
	mongoose.disconnect();
	return done();
});