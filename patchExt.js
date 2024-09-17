import "/libs/jszip.min.js"
function loadExtension(file){
    let zip = new JSZip()
    return zip.loadAsync(file)
}

async function patchManifest(ext){
    let manifest = await ext.file('manifest.json').async('text').then(txt => JSON.parse(txt))
    let randomId = (Math.random() + 1).toString(36).substring(2)

    if(manifest.background?.service_worker){
        manifest.background = {
            "scripts": [manifest.background.service_worker]
        }
    }
    manifest.browser_specific_settings = {
        "gecko": {
            "id": `${randomId}@XPIPorter`
        }
    }

    ext.file("manifest.json", JSON.stringify(manifest, null, "\t"))
    return await ext.generateAsync({type: "arraybuffer"})
}

export async function patchExt(file){
    let ext = await loadExtension(file)
    return await patchManifest(ext)
}