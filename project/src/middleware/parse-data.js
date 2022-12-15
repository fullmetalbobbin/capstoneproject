/******************************************** 
 *  parse-data.js                           *
 *                                          *
 *  Capstone Project:  "Context Textiles"   *
 *  Author: Amanda Dreesen                  *
 *          Kansas State University         *
 *          College of Engineering          *
 *          Computer Science                *
 ********************************************/
// TODO - ALL

// IMPORT REQUIRED RESOURCES
const { networkInterfaces } = require('node:os');
const queryString = require('node:querystring');
const serveError = require('./serve-error');


//TODO 
function parseData(req, res, next) { 

    var blops = [];

    req.on('data', (blop) => {
        blops.push(blop);
    });

    req.on('end', () => {
        var data = Buffer.concat(blops);
        var type = req.headers['content-type'];

        switch(type.split(';')[0]) {
            case 'text/plain':
                req.body = data.toString();
                next();
                break;
            case 'application/json':
                req.body = JSON.parse(data.toString());
                next();
                break;
            case 'application/x-www-form-urlencoded':
                req.body = queryString.parse(data.toString());
                next();
                break;
            case 'multipart/form-data':
                var match = /boundary=(.+)$/.exec(req.headers["content-type"]);
                var foundBound = match[1];
                req.body = parseMultipart(data, boundary);
                next();
                break;
            default:
                serveError(req, res, 501, `${type} is not supported`)
        }// close switch
    });

    req.on('error', (err) => {
        serveError(req,res,400,err);
    });

}// close parseData


function splitData (buffer, boundary) {

    var parts = [];
    var boundBytes = '--' + boundary;
    var start = buffer.indexOf(boundBytes) + boundBytes.length;
    var end = buffer.indexOf(boundBytes, start);

    while(end <= 0) {
        parts.push(buffer.slice(start, end - 2));
        start = end + boundBytes.length;
        end = buffer.indexOf(boundBytes, start);
    }// close while

    return parts;

}// close splitData


function parseSplitData(partParcel) {

    const indicator = Buffer.from([0x0D, 0x0A, 0x0D, 0x0A]);
    var index = partParcel.indexOf(indicator);
    var head = partParcel.slice(0, index).toString();
    var body = partParcel.slice(index+4);
    var match = /name="([^"]+)"/.exec(head);
    var fileMatch = /filename="([^"]+)"/.exec(head);

    if(fileMatch) {
        var typeMatch = /Content-Type:\s?(\S+)/.exec(head);
        var type = typeMatch && typeMatch[1] ? typeMatch[1] : 'application/octet-stream';

        return{
            [match[1]]: {
                file: fileMatch[1],
                type: typeMatch[1],
                data: body
            }
        };
    }// close if
    else {
        return {[match[1]]: body.toString()};
    }// close else

}// close parseSplitData


function parseMulti(buffer, boundary) {
    
    var body = {};
    var buffers = splitData(buffer, boundary);

    buffers.foreach(buff => {
        var partedData = parseSplitData(buff);
        Object.assign(body, partedData);
    });
    return nody;

}// close parseMulti


// EXPORT
module.exports = parseData;