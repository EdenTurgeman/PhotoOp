const {extname} = require('path');

// Node doesn't ship with the conversion method of month to text and i don't want to install another module due to package size.
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const getExtension = file => {
    return extname(file).replace('.', '');
};

const getDateInfo = (field, tags) => {
    return new Date(tags[field.exifName])
};

exports.handleUserField = (field, tags, filePath) => {
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

exports.handleExifField = (field, tags) => {
    const exifField = field.exifName.find(exifName => {
        return tags[exifName];
    });

    const exifData = tags[exifField];

    if (exifData !== undefined) {
        return exifData;
    }

    throw createError("We're sorry " + field.alias + " is not supported by your images. Unsupported Files will not be transferred.", "this no tag matching" + JSON.stringify(tags));
};