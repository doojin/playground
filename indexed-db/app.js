const openRequest = indexedDB.open('store', 5);

openRequest.addEventListener('upgradeneeded', () => {
    const db = openRequest.result;
    console.log(`upgrade needed, db version: ${db.version}`);
});

openRequest.addEventListener('error', () => {
    console.error(openRequest.error);
});

openRequest.addEventListener('success', () => {
    const db = openRequest.result;
    console.log('connection successful');
    console.log(db);
});