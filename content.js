function showSpinner(container){
    container.innerHTML = `<div jscontroller="qUYJve" data-progressvalue="0" class="XDoBEd-JGcpL-MkD1Ye kqmIdb"><div role="progressbar" jsname="LbNpof" class="XDoBEd-JGcpL-P1ekSe XDoBEd-JGcpL-P1ekSe-OWXEXe-A9y3zc" style="width: 48px; height: 48px;"><div class="XDoBEd-JGcpL-uI4vCe-haAclf"><svg class="XDoBEd-JGcpL-uI4vCe-LkdAo-Bd00G" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><circle class="XDoBEd-JGcpL-uI4vCe-u014N" cx="24" cy="24" r="18" stroke-width="4"></circle><circle class="XDoBEd-JGcpL-uI4vCe-LkdAo" jsname="MU5Wmf" cx="24" cy="24" r="18" stroke-dasharray="113.0973336" stroke-dashoffset="113.0973336" stroke-width="4"></circle></svg></div><div class="XDoBEd-JGcpL-IdXvz-haAclf"><div class="XDoBEd-JGcpL-QYI5B-pbTTYe"><div class="XDoBEd-JGcpL-lLvYUc-e9ayKc XDoBEd-JGcpL-lLvYUc-LK5yu"><svg class="XDoBEd-JGcpL-IdXvz-LkdAo-Bd00G" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><circle class="XDoBEd-JGcpL-IdXvz-LkdAo" cx="24" cy="24" r="18" stroke-dasharray="113.0973336" stroke-dashoffset="56.5486668" stroke-width="4"></circle></svg></div><div class="XDoBEd-JGcpL-OcUoKf-TpMipd"><svg class="XDoBEd-JGcpL-IdXvz-LkdAo-Bd00G" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><circle class="XDoBEd-JGcpL-IdXvz-LkdAo" cx="24" cy="24" r="18" stroke-dasharray="113.0973336" stroke-dashoffset="56.5486668" stroke-width="3.2"></circle></svg></div><div class="XDoBEd-JGcpL-lLvYUc-e9ayKc XDoBEd-JGcpL-lLvYUc-qwU8Me"><svg class="XDoBEd-JGcpL-IdXvz-LkdAo-Bd00G" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><circle class="XDoBEd-JGcpL-IdXvz-LkdAo" cx="24" cy="24" r="18" stroke-dasharray="113.0973336" stroke-dashoffset="56.5486668" stroke-width="4"></circle></svg></div></div></div></div></div>`
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