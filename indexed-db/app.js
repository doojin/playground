const openRequest = indexedDB.open('store', 1);

openRequest.addEventListener('upgradeneeded', () => {
    const db = openRequest.result;
    console.log(`upgrade needed, db version: ${db.version}`);
});

openRequest.addEventListener('error', () => {
    console.error(openRequest.error);
});

openRequest.addEventListener('success', () => {
    const db = openRequest.result;

    // May happen when two tabs opened.
    // In second tab new version of db.
    // In first tab an outdated one.
    db.addEventListener('versionchange', () => {
        db.close();
        console.log('page reload is needed');
    });
});