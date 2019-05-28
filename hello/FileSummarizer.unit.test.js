'use strict';

jest.mock("fs");

describe("listFilesInDirectorySync", () => {
    const MOCK_FILE_INFO = {
        '/path/to/file1.js': 'console.log("file1 contents");',
        '/path/to/file2.txt': 'file2 contents',
    };

    beforeEach(() => {
        require('fs').__setMockFiles(MOCK_FILE_INFO);
    });

    test("includes all files in the directory in the summary", ()=> {
        const FileSummerizer = require("./FileSummarizer");
        const fileSummary = FileSummerizer.summarizedFilesInDirectorySync(
            "/path/to",
        );

        expect(fileSummary.length).toBe(2);
    });
});