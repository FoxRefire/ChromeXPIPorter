import {patchExt} from  "/patchExt.js"

document.getElementById("file").addEventListener("change", async () => {
    let patchedExt = await patchExt(file.files[0])

    installResult(patchedExt)
})

function installResult(ab){
    let blob = new Blob([ab], {type: "application/x-xpinstall"});
    location.href = URL.createObjectURL(blob);
}
