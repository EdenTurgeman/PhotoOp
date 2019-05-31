const {ipcMain} = require('electron');
const {exiftool} = require('exiftool-vendored');
const recursive = require("recursive-readdir");
const {createError} = require("./errors");
const {basename, join, relative} = require('path');
const {moveSync, ensureDirSync} = require('fs-extra');
const {saveFullConfig} = require("../userSettingsStore");
const {handleExifField, handleUserField} = require('./field-handlers');

const buildPathForFile = (usedFields, filePath, rootDestPath) => {
    let fileDest = rootDestPath;

    return exiftool
        .read(filePath)
        .then((tags) => {
            usedFields.forEach(field => {
                const pathAddition = field.userField ? handleUserField(field, tags, filePath) : handleExifField(field, tags);

                fileDest = join(fileDest, pathAddition.toString().replace(/[/\\:?<>|\"]+/g, "`"));
            });

            return fileDest;
        })
};


ipcMain.on('moveFiles', (event, {srcPath, destPath, usedFields}) => {
    try {
        saveFullConfig(usedFields, srcPath, destPath);
        const filePromises = [];

        recursive(srcPath, (error, files) => {
            if (error) {
                event.sender.send('error', createError('An error has occurred while reading your source folder, please check that it is not being used and permissions are not restricted', error));
                return
            }
            files.forEach((filePath, index) => {
                const relativeFilePath = relative(process.cwd(), filePath);

                const finalFilePath = buildPathForFile(usedFields, relativeFilePath, destPath)
                    .then(fileDestPath => {
                        ensureDirSync(fileDestPath);
                        moveSync(relativeFilePath, join(fileDestPath, basename(filePath)));
                        event.sender.send('progress-report', index);
                    }).catch(error => {
                            console.log(error);
                            event.sender.send('error',
                                createError(error.text ? error.text : 'An error has occurred while reading one of your files, the file will not be copied and the operation will proceed',
                                    error.innerError ? error.innerError : error));
                        }
                    );

                filePromises.push(finalFilePath);
            });

            Promise.all(filePromises).then(() => event.sender.send('moveFiles-reply'));
        })
    } catch (error) {
        event.sender.send('error', createError('an error has occurred', error));
    }
});

ipcMain.on('filesInFolder', (event, srcPath) => {
    recursive(srcPath, (err, files) => {
        event.returnValue = files ? files.length : 0;
    });
});