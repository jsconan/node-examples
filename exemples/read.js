var fs = require('fs');

var locations = process.argv.slice(2);
if (!locations.length) {
    locations = ['.'];
}

locations.forEach(function (path) {
    console.log('### Content of ' + path + ' ###');
    fs.readdir(path, function (er, files) {
        if (er) {
            console.log(er);
        } else {
            files.forEach(function (file) {
                console.log(file);
            });
        }
    });
});