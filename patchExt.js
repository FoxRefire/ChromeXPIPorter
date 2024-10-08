import "/libs/jszip.min.js"
function loadExtension(file){
    let zip = new JSZip()
    return zip.loadAsync(file)
}

async function patchManifest(ext, extId, store){
    let manifest = await ext.file('manifest.json').async('text').then(txt => JSON.parse(txt))
    let randomId = (Math.random() + 1).toString(36).substring(2)
    let newExtId = `${extId || randomId}@${store || ""}_XPIPorter`

    if(!manifest.background){
        manifest.background = {
            scripts: []
        }
    }
    if(manifest.background?.service_worker){
        manifest.background.scripts = [manifest.background.service_worker]
        delete manifest.background.service_worker
    }
    manifest.background.scripts.push("uninstallHandler.js")

    manifest.browser_specific_settings = {
        "gecko": {
            "id": newExtId
        }
    }

    if(manifest.web_accessible_resources){
        manifest.web_accessible_resources.forEach(res => {
            if(res.extension_ids) res.extension_ids = [newExtId]
        })
    }

    ext.file("manifest.json", JSON.stringify(manifest, null, "\t"))
    return ext
}

async function injectScripts(ext){
    let uninstallHandler = await fetch("/injects/uninstallHandler.js").then(res => res.arrayBuffer())
    ext.file("uninstallHandler.js", uninstallHandler)
    return ext
}

export async function patchExt(file, extId, store){
    let ext = await loadExtension(file)
    ext = await injectScripts(ext)
    ext =  await patchManifest(ext, extId, store)
    return await ext.generateAsync({type: "arraybuffer"})
}
