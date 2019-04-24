const recursive = require("recursive-readdir");
const {ipcMain} = require('electron');
const {exiftool} = require('exiftool-vendored');

ipcMain.on('readFile', (event, arg) => {
    exiftool
        .read('../../../Projects/Photos/JPG/_DSF6570.JPG')
        .then(tags => {
            console.log('listener' + tags);
            event.sender.send('readFile-reply', tags)
        })
        .catch(err => console.error("Something terrible happened: ", err));
});

ipcMain.on('readFolder', (event, {path}) => {
    recursive(path, function (err, files) {
        // `files` is an array of file paths
        console.log(files);
    });
    exiftool
        .read('../../../Projects/Photos/JPG/_DSF6570.JPG')
        .then(tags => {
            console.log('listener' + tags);
            event.sender.send('readFile-reply', tags)
        })
        .catch(err => console.error("Something terrible happened: ", err));
});