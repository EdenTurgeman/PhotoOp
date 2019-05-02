const {ipcMain} = require('electron');
const {exiftool} = require('exiftool-vendored');
const recursive = require("recursive-readdir");
const {extname, basename, join, relative} = require('path');
const {moveSync, ensureDirSync} = require('fs-extra');

// Node doesn't ship with the conversion method of month to text and i don't want to install another module due to package size.
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const getExtension = file => {
    return extname(file).replace('.', '');
};

const getDateInfo = (field, tags) => {
    return new Date(tags[field.exifName])
};

const handleUserField = (field, tags, filePath) => {
    switch (field.id) {
        case "Day": {
            return getDateInfo(field, tags).getDate().toString();
        }
        case "Month" : {
            return months[getDateInfo(field, tags).getMonth()];
        }
        case "Year": {
            return getDateInfo(field, tags).getFullYear().toString();
        }
        case "FileType": {
            return (getExtension(filePath));
        }
    }
};

const handleExifField = (field, tags) => {
    const exifData = tags[field.exifName].toString().replace(/\//g, "`");

    if (exifData) {
        return exifData;
    }

    throw 'Exif field not found';
};

const buildPathForFile = (usedFields, filePath, rootDestPath) => {
    let fileDest = rootDestPath;

    return exiftool
        .read(filePath)
        .then((tags) => {
            usedFields.forEach(field => {
                const pathAddition = field.userField ? handleUserField(field, tags, filePath) : handleExifField(field, tags);

                fileDest = join(fileDest, pathAddition)
            });

            return fileDest;
        })
        .catch(err => console.log(err));
};


ipcMain.on('moveFiles', (event, {srcPath, destPath, usedFields}) => {
    const filePromises = [];

    recursive(srcPath, (err, files) => {
        try {
            files.forEach(file => {
                const relativeFilePath = relative(process.cwd(), file);

                filePromises.push(buildPathForFile(usedFields, relativeFilePath, destPath)
                    .then(fileDestPath => {
                        ensureDirSync(fileDestPath);
                        moveSync(relativeFilePath, join(fileDestPath, basename(file)));
                    }));
            });
        } catch (error) {
            event.sender.send('error', error)
        }

        Promise.all(filePromises).then(() => event.sender.send('moveFiles-reply'));
    })
});

ipcMain.on('filesInFolder', (event, srcPath) => {
    recursive(srcPath, (err, files) => {
        event.returnValue = files.length;
    })
});