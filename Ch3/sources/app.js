/**
 * Module dependencies.
 */

var express = require('express');
var path = require('path');

var logger = require('morgan');
var contacts = require('./modules/contacts');
var http = require('http');

var app = express();

app.get('/contacts',
	function (request, response) {

		if (Object.keys(request.query).length === 0) {
			response.setHeader('content-type', 'application/json');
			response.end(JSON.stringify(contacts.list()));
		} else {
			var keys = Object.keys(request.query);
			var queryKey = keys[0];
			var queryValue = request.query[queryKey];
			console.log(queryKey + ' ' + queryValue);
			response.setHeader('content-type', 'application/json');
			response.end(JSON.stringify(contacts.query_by_arg(queryKey, queryValue)));
		}
	}
);


app.get('/contacts/:number', function (request, response) {
	response.setHeader('content-type', 'application/json');
	response.end(JSON.stringify(contacts.query(request.params.number)));
});

app.get('/groups', function (request, response) {
	console.log('groups');
	response.setHeader('content-type', 'application/json');
	response.end(JSON.stringify(contacts.list_groups()));
});

app.get('/groups/:name', function (request, response) {
	console.log('groups');
	response.setHeader('content-type', 'application/json');
	response.end(JSON.stringify(contacts.get_members(request.params.name)));
});




http.createServer(app).listen(3000, function () {
	console.log('Express server listening on port 3000');
});