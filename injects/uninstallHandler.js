chrome.runtime.onMessageExternal.addListener(request => {
    if(request.type == "XPIPorterUninstall"){
        chrome.management.uninstallSelf({showConfirmDialog: true})
    }
})
