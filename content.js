function showSpinner(container){
    container.innerHTML = `<div jscontroller="XidOKb" data-progressvalue="0" class="yCtlHf-JGcpL-MkD1Ye kqmIdb"><div role="progressbar" jsname="LbNpof" class="yCtlHf-JGcpL-P1ekSe yCtlHf-JGcpL-P1ekSe-OWXEXe-A9y3zc" style="width: 48px; height: 48px;"><div class="yCtlHf-JGcpL-uI4vCe-haAclf"><svg class="yCtlHf-JGcpL-uI4vCe-LkdAo-Bd00G" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><circle class="yCtlHf-JGcpL-uI4vCe-u014N" cx="24" cy="24" r="18" stroke-width="4"></circle><circle class="yCtlHf-JGcpL-uI4vCe-LkdAo" jsname="MU5Wmf" cx="24" cy="24" r="18" stroke-dasharray="113.0973336" stroke-dashoffset="113.0973336" stroke-width="4"></circle></svg></div><div class="yCtlHf-JGcpL-IdXvz-haAclf"><div class="yCtlHf-JGcpL-QYI5B-pbTTYe"><div class="yCtlHf-JGcpL-lLvYUc-e9ayKc yCtlHf-JGcpL-lLvYUc-LK5yu"><svg class="yCtlHf-JGcpL-IdXvz-LkdAo-Bd00G" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><circle class="yCtlHf-JGcpL-IdXvz-LkdAo" cx="24" cy="24" r="18" stroke-dasharray="113.0973336" stroke-dashoffset="56.5486668" stroke-width="4"></circle></svg></div><div class="yCtlHf-JGcpL-OcUoKf-TpMipd"><svg class="yCtlHf-JGcpL-IdXvz-LkdAo-Bd00G" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><circle class="yCtlHf-JGcpL-IdXvz-LkdAo" cx="24" cy="24" r="18" stroke-dasharray="113.0973336" stroke-dashoffset="56.5486668" stroke-width="3.2"></circle></svg></div><div class="yCtlHf-JGcpL-lLvYUc-e9ayKc yCtlHf-JGcpL-lLvYUc-qwU8Me"><svg class="yCtlHf-JGcpL-IdXvz-LkdAo-Bd00G" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><circle class="yCtlHf-JGcpL-IdXvz-LkdAo" cx="24" cy="24" r="18" stroke-dasharray="113.0973336" stroke-dashoffset="56.5486668" stroke-width="4"></circle></svg></div></div></div></div></div>`
}

function hideSpinner(container){
    container.innerHTML = `<div class="VfPpkd-dgl2Hf-ppHlrf-sM5MNb" data-is-touch-wrapper="true"><button class="UywwFc-LgbsSe UywwFc-LgbsSe-OWXEXe-dgl2Hf UywwFc-GqqPG-wdeprb-FoKg4d-dgl2Hf-ppHlrf"><span jsname="V67aGc" class="UywwFc-vQzf8d">Add to Firefox</span></button></div>`
    container.querySelector("Button").addEventListener("click", () => installFromCWS(container))
}

async function installFromCWS(container){
    showSpinner(container)
    let xpi = await chrome.runtime.sendMessage({type:"getCWS"})
    location.href = URL.createObjectURL(new Blob([xpi], {type: "application/x-xpinstall"}));
    hideSpinner(container)
}

async function main(container, target){
    container.XPIPorter = true
    let isInstalled  = await chrome.runtime.sendMessage({type:"isInstalledCWS"})
    target.disabled = false
    if(!isInstalled){
        target.querySelector("span.UywwFc-vQzf8d").innerHTML = "Add to Firefox"
        target.addEventListener("click", () => installFromCWS(container))
    } else {
        target.querySelector("span.UywwFc-vQzf8d").innerHTML = "Remove from Firefox"
        target.addEventListener("click", () => chrome.runtime.sendMessage({type:"uninstall"}))
    }
}

setInterval(() => {
    let containers = Array.from(document.querySelectorAll(".OdjmDb")).filter(container => container.XPIPorter != true)
    containers.forEach(container =>{
        let target = container.querySelector(".UywwFc-LgbsSe")
        target && main(container, target)
    })
}, 100)
