const fs = require("fs");
const http = require("http");
const Port = 3000;

const users = [
    { name: "Tun", email: "tun@gmail.com", password: "tun" },
    { name: "Aung", email: "aung@gmail.com", password: "aung" },
];

const server = http.createServer((req, res) => {
    const method = req.method;
    const isRootUrl = req.url === "/";
    if (isRootUrl) {
        fs.readFile("index.html", (err, data) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(data);
            res.end();
        });
    } else if (req.url === "/script.js") {
        fs.readFile("script.js", (err, data) => {
            res.writeHead(200, { "Content-Type": "text/javascript" });
            res.write(data);
            res.end();
        });
    } else if (req.url === "/style.css") {
        fs.readFile("style.css", (err, data) => {
            res.writeHead(200, { "Content-Type": "text/css" });
            res.write(data);
            res.end();
        });
    } else if (req.url === "/fileUpload") {
        if (method === "POST") {
            const type = req.headers["content-type"].split("/")[1];
            const writeStream = fs.createWriteStream(`name.${type}`);
            req.pipe(writeStream);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.write(JSON.stringify({ message: "Upload success" }));
            res.end();
        }
    } else if (req.url === "/users") {
        if (method === "GET") {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.write(JSON.stringify(users));
            res.end();
        } else if (method === "POST") {
            let data = "";
            req.on("data", (chunk) => {
                data += chunk;
            });
            req.on("end", () => {
                const newUser = JSON.parse(data);
            });
        }
    } else {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.write("error");
        res.end();
    }
});

server.listen(Port, () => {
    console.log(`server is listening Port${Port}`);
});
