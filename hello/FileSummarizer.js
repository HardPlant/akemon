'use strict'

const fs = require("fs");

function summarizedFilesInDirectorySync(directory) {
    return fs.readdirSync(directory).map(fileName => ({
        directory,
        fileName
    }));
}

exports.summarizedFilesInDirectorySync = summarizedFilesInDirectorySync;