//Path later: https://github.com/lorieum/OSIris/releases/tag/OSIris
const urlServer = "http://localhost:8080";


writeVersion()

function writeVersion(){
    getRepoName().then(version=>{
        document.querySelector(".get").innerHTML="Download OSIris Version "+version;
    })
    
}

async function getRepoName(){
    const res = await fetch(urlServer+"/repo/version", {
        method:"GET"
    });

    const version = await res.text();

    console.log(version);
    return version;
}