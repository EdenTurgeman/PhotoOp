const {ipcMain} = require('electron');
const {exiftool} = require('exiftool-vendored');
const recursive = require("recursive-readdir");
const {extname, basename, join, relative} = require('path');
const {moveSync, ensureDirSync} = require('fs-extra');

// Node doesn't ship with the conversion method of month to text and i don't want to install another module due to package size.
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const createError = (text, error) => {
    return {
        text,
        error
    }
};

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
    const exifField = field.exifName.find(exifName => {
        return tags[exifName] !== undefined;
    });

    const exifData = tags[exifField];

    if (exifData !== undefined) {
        return exifData;
    }

    throw createError("We're sorry " + field.alias + " is not supported by your images.", "this no tag matching" + JSON.stringify(tags));
};

const buildPathForFile = (usedFields, filePath, rootDestPath) => {
    let fileDest = rootDestPath;

    return exiftool
        .read(filePath)
        .then((tags) => {
            usedFields.forEach(field => {
                const pathAddition = field.userField ? handleUserField(field, tags, filePath) : handleExifField(field, tags);

                fileDest = join(fileDest, pathAddition.toString())
            });

            return fileDest;
        })
};


ipcMain.on('moveFiles', (event, {srcPath, destPath, usedFields}) => {
    const filePromises = [];
    try {
        recursive(srcPath, (err, files) => {
            files.forEach((filePath, index) => {
                const relativeFilePath = relative(process.cwd(), filePath);

                const finalFilePath = buildPathForFile(usedFields, relativeFilePath, destPath)
                    .then(fileDestPath => {
                        ensureDirSync(fileDestPath);
                        moveSync(relativeFilePath, join(fileDestPath, basename(filePath)));

                    }).then(() => {
                            event.sender.send('progress-report', index);
                        }
                    ).catch(error => event.sender.send('error', error));

                filePromises.push(finalFilePath);
            });

            Promise.all(filePromises).then(() => event.sender.send('moveFiles-reply'));
        })
    } catch {
        return (error) => event.sender.send('error', error)
    }
});

ipcMain.on('filesInFolder', (event, srcPath) => {
    recursive(srcPath, (err, files) => {
        event.returnValue = files ? files.length : 0;
    });
});