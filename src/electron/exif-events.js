const {ipcMain} = require('electron');
const {exiftool} = require('exiftool-vendored');
const recursive = require("recursive-readdir");
const {basename, join, relative} = require('path');
const {moveSync, ensureDirSync} = require('fs-extra');
const cameraFields = require('../assets/camera-fields-map');

const getExtensions = files => {
    return files.filter((file, pos) => {
        return files.indexOf(file) === pos;
    }).map(file => {
        return file.replace('.', '');
    })
};

const buildPathForFile = (usedFields, filePath, rootDestPath) => {
    let fileDest = rootDestPath;

    return exiftool
        .read(filePath)
        .then((tags) => {
            usedFields.forEach(field => {
                const exifData = tags[field.exifName].toString().replace(/\//g, "`");
                if (exifData) {
                    fileDest = join(fileDest, exifData)
                }
            });

            return fileDest;
        })
        .catch(err => console.error("Something terrible happened, Could not read file data: ", err));
};


ipcMain.on('moveFiles', (event, {srcPath, destPath, usedFields}) => {
    const filePromises = [];

    recursive(srcPath, (err, files) => {
        files.forEach(file => {
            const relativeFilePath = relative(process.cwd(), file);

            filePromises.push(buildPathForFile(usedFields, relativeFilePath, destPath)
                .then(fileDestPath => {
                    ensureDirSync(fileDestPath);
                    moveSync(relativeFilePath, join(fileDestPath, basename(file)));
                }));
        });

        Promise.all(filePromises).then(() => event.sender.send('moveFiles-reply'));
    })
});

ipcMain.on('filesInFolder', (event, srcPath) => {
    recursive(srcPath, (err, files) => {
        event.returnValue = files.length;
    })
});