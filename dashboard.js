import {patchExt} from  "/patchExt.js"

document.getElementById("file").addEventListener("change", async () => {
    let patchedExt = await patchExt(file.files[0], null, "Manual")

    installResult(patchedExt)
})

let installedAddons = await chrome.management.getAll().then(ext => ext.filter(ext => ext.id.endsWith("_XPIPorter")))
for(let ext of installedAddons) {
    let source = ext.id.match(/(?<=@).*?(?=_)/)[0]
    document.getElementById("installed").insertAdjacentHTML("beforeend", `
        <tr>
            <td>${ext.name}</td>
            <td>${ext.version}</td>
            <td>${await queryLatest(source, ext.id)}</td>
            <td>${source}</td>
        </tr>
    `)
}

function installResult(ab){
    let blob = new Blob([ab], {type: "application/x-xpinstall"});
    location.href = URL.createObjectURL(blob);
}

async function queryLatest(source, extId){
    if(source == "CWS"){
        let id = extId.match(/.*?(?=@)/)
        let apiRes = await fetch(`https://clients2.google.com/service/update2/crx?prodversion=49.0&acceptformat=crx3&x=id%3D${id}%26installsource%3Dondemand%26uc`).then(res => res.text())
        return new DOMParser().parseFromString(apiRes,"text/xml").querySelector("updatecheck").getAttribute("version")
    }
    return undefined
}