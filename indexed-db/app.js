const openRequest = indexedDB.open('store', 3);

openRequest.addEventListener('upgradeneeded', () => {
    console.log('upgrade needed');
});

openRequest.addEventListener('error', () => {
    console.error(openRequest.error);
});

openRequest.addEventListener('success', () => {
    const db = openRequest.result;
    console.log('connection successful');
    console.log(db);
});