const {ipcMain} = require('electron');
const {exiftool} = require('exiftool-vendored');
const recursive = require("recursive-readdir");
const {extname, basename, join, relative} = require('path');
const {moveSync, ensureDirSync} = require('fs-extra');
const {saveFullConfig} = require("./userSettingsStore");


// Node doesn't ship with the conversion method of month to text and i don't want to install another module due to package size.
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const createError = (text, error) => {
    return {
        text,
        innerError: error
    }
};

const getExtension = file => {
    return extname(file).replace('.', '');
};

const getDateInfo = (field, tags) => {
    return new Date(tags[field.exifName])
};

const handleUserField = (field, tags, filePath) => {
    if (field.userInput && field.fieldValue) {
        return field.fieldValue;
    }

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
        return tags[exifName];
    });

    const exifData = tags[exifField];

    if (exifData !== undefined) {
        return exifData;
    }

    throw createError("We're sorry " + field.alias + " is not supported by your images. Unsupported Files will not be transferred.", "this no tag matching" + JSON.stringify(tags));
};

const buildPathForFile = (usedFields, filePath, rootDestPath) => {
    let fileDest = rootDestPath;
    
    return exiftool
        .read(filePath)
        .then((tags) => {
            usedFields.forEach(field => {
                const pathAddition = field.userField ? handleUserField(field, tags, filePath) : handleExifField(field, tags);

                // Remove forward slashes so sub-folders won't be created accidentally
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
                    }).then(() => {
                            if ((index % 3 === 0) || index === files.length - 1) {
                                event.sender.send('progress-report', index);
                            }
                        }
                    ).catch(error => {
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