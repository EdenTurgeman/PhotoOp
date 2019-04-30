const {ipcMain} = require('electron');
const {exiftool} = require('exiftool-vendored');
const recursive = require("recursive-readdir");
const {extname, basename, join} = require('path');
const {existsSync, mkdirSync, rename} = require('fs');
const cameraFields = require('../assets/camera-fields-map')

const createDir = path => {
    if (!existsSync(path)) {
        return mkdirSync(path);
    }
};

const getExtensions = files => {
    return files.filter((file, pos) => {
        return files.indexOf(file) === pos;
    }).map(file => {
        return file.replace('.', '');
    })
};

const buildPathForFile = (usedFields, filePath, rootDestPath) => {
    let fileDest = rootDestPath;

    exiftool
        .read(filePath)
        .then((tags) => {
                usedFields.forEach(field => {
                    const exifData = tags[field.exifName].toString();
                    console.log(exifData);
                    if (exifData) {
                        fileDest = join(fileDest, exifData)
                    }
                });
            })
        .catch(err => console.error("Something terrible happened, Could not read file data: ", err));
};


ipcMain.on('moveFiles', (event) => {
    exiftool
        .read("../Photos//DSCF7063.MOV")
        .then((tags) => {
            event.sender.send('moveFiles-reply', tags);
        });
});

ipcMain.on('filesInFolder', (event, destPath) => {
    console.log(destPath);
    recursive(destPath,(err, files) => {
        event.returnValue = files.length;
    })
});