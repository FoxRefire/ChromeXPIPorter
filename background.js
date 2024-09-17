import {patchExt} from  "/patchExt.js"

chrome.action.onClicked.addListener(() => {
    chrome.tabs.create({url: "install_manually.html"})
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    request.type == "CWS" && getCWS(sender.tab.url).then(xpi => sendResponse(xpi))
    return true
})

async function getCWS(url){
    let id = url.replace(/.*?\/detail(\/.*?)?\/(.*?)(\/|#|\?|$).*/, "$2")
    let crx = await fetch(`https://clients2.google.com/service/update2/crx?response=redirect&prodversion=49.0&acceptformat=crx3&x=id%3D${id}%26installsource%3Dondemand%26uc`).then(r => r.arrayBuffer())
    return await patchExt(crx)
}