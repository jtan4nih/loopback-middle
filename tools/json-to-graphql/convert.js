import generateSchema from 'json-to-graphql';
import data from './audits.json';

var fs = require('node-fs');
 
const schema = generateSchema(data);
fs.writeFile('schema.js', schema, callback);

function callback() {
	console.log('done!');
}