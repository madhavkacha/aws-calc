var http = require('https');
var fs = require('fs');
var path = require('path');

var Common = function () {

    var that = this;

    this.send = function () {

        that.url = "";

        var deferred = protractor.promise.defer();

        var postData = JSON.stringify(JSON.parse(fs.readFileSync(path.resolve(__dirname, 'body.json'), 'utf8')));

        var str = '';

        var options = {
            hostname: 'dnd5zrqcec4or.cloudfront.net',
            path: '/Prod/v2/saveAs/',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        var req = http.request(options, (res) => {

            console.log('statusCode:', res.statusCode);
            //console.log('headers:', res.headers);

            res.on('data', (chunk) => {
                str += chunk;
            });

            res.on('end', function () {
                var payload = JSON.parse(JSON.parse(str).body);
                console.log(payload);
                that.url = "https://calculator.aws/#/estimate?id="+payload.savedKey;
                deferred.fulfill();
            });
        });

        req.write(postData);
        req.end();

        return deferred.promise;
    };

};

module.exports = Common;