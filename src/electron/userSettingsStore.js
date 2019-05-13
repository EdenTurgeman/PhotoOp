const {ipcMain} = require('electron');
const Store = require('electron-store');

const schema = {
    usedFields: {
        type: 'array',
        items: {
            type: 'object',
            properties: {
                alias: {
                    type: 'string'
                },
                exifName: {
                    type: 'array',
                },
                userField: {
                    type: 'boolean'
                },
                userInput: {
                    type: 'boolean'
                }
            },
            required: ["alias"]
        },
        default: []
    },
    srcPath: {
        type: 'string',
        default: ''
    },
    destPath: {
        type: 'string',
        default: ''
    },
};

const encryptionKey = 'PhotoOpEncryption';

const fileName = 'dataStore';

const store = new Store({schema, encryptionKey, fileName});

exports.saveFullConfig = (usedFields, srcPath, destPath) => {
    store.set('usedFields', usedFields);
    store.set('srcPath', srcPath);
    store.set('destPath', destPath);
};

ipcMain.on('getFullSettings', event => {
    event.returnValue = {
        usedFields: store.get('usedFields'),
        srcPath: store.get('srcPath'),
        destPath: store.get('destPath')
    }
});

ipcMain.on('setUsedFields', (event, usedFields) => {
    store.set('usedFields', usedFields);
});

ipcMain.on('setSrcPath', (event, srcPath) => {
    store.set('srcPath', srcPath);
});

ipcMain.on('setDestPath', (event, destPath) => {
    store.set('destPath', destPath);
});