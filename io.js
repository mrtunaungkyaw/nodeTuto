const fs = require("fs");

fs.writeFile("test.tsx", "test data", () => {
    console.log("Finished writing file...");
});

fs.writeFileSync("hello.txt", "Hello World");
