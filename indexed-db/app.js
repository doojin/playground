const openRequest = indexedDB.open('store', 1);

openRequest.addEventListener('upgradeneeded', () => {
    console.log('upgrade needed');
});

openRequest.addEventListener('error', () => {
    console.error(onRequest.error);
});

openRequest.addEventListener('success', () => {
    const db = openRequest.result;
    console.log('connection successful');
    console.log(db);
});