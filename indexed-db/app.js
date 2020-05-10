const openRequest = indexedDB.open('store', 1);

openRequest.addEventListener('upgradeneeded', () => {
    const db = openRequest.result;
    logEvent(`Upgrade needed, db version: ${db.version}`);
});

openRequest.addEventListener('error', () => {
    logEvent(`Error: ${openRequest.error}`);
});

openRequest.addEventListener('success', () => {
    const db = openRequest.result;
    logEvent('Connection successful');

    // May happen when two tabs opened.
    // In second tab new version of db.
    // In first tab an outdated one.
    db.addEventListener('versionchange', () => {
        db.close();
        logEvent('Version change; page reload is needed');
    });
});

function logEvent(event) {
    const li = document.createElement('li');
    li.textContent = event;
    document.querySelector('#events').appendChild(li);
}