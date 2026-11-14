const http = require('http');
const { JSDOM } = require("jsdom")
const server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")

    if (req.url == "/repo/version" && req.method == "GET") {
        const version = getOSIrisVersionFast();
        version.then(versionStr=>{
            res.end(versionStr);
        })
        
    }
})

server.listen(8080, () => {
    console.log("Server is active on Port 8080")
})





async function getOSIrisVersion() {
    const url = "https://github.com/sanjipreet/OSIris-ISO/releases";

    const res = await fetch(url);

    const html = await res.text();

    const dom = new JSDOM(html);

    const document = dom.window.document;


    const contentDiv = document.querySelector(".markdown-body.tmp-my-3");

    const text = contentDiv.querySelector("p").innerHTML;
    const version = text.split("Version")[1].substring(1);

    return version;
}




let lastVersion = getOSIrisVersion();
let lastUpdate = Date.now();

const msOneDay = 24*60*60*1000;

async function getOSIrisVersionFast() {
    if (Date.now() - lastUpdate > msOneDay) {
        lastVersion = getOSIrisVersion();

        lastUpdate = Date.now();
    }
    return lastVersion;

}