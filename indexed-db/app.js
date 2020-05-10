const openRequest = indexedDB.open('store', 2);

openRequest.addEventListener('upgradeneeded', (event) => {
    const db = openRequest.result;

    logEvent('Invoking database upgrade');
    
    if (event.oldVersion < 1) {
        logEvent('Creating books object store');
        db.createObjectStore('books', { 
            keyPath: 'id', 
            autoIncrement: true 
        });
    }

    if (event.oldVersion < 2) {
        logEvent('Creating title index');
        const books = event.target.transaction.objectStore('books');
        books.createIndex('title', 'title');
    }
});

openRequest.addEventListener('error', () => {
    logEvent(`Error: ${openRequest.error}`);
});

openRequest.addEventListener('success', () => {
    const db = openRequest.result;
    db.addEventListener('error', (e) => logEvent(`Database error: ${e.srcElement.error.message}`));

    logEvent('Connection successful');

    // May happen when two tabs opened.
    // In second tab new version of db.
    // In first tab an outdated one.
    db.addEventListener('versionchange', () => {
        db.close();
        logEvent('Version change; page reload is needed');
    });

    const transaction = db.transaction('books', 'readwrite');
    transaction.addEventListener('complete', (e) => logEvent('Transaction finished'));
    transaction.addEventListener('error', (e) => logEvent(`Transaction error: ${e.srcElement.error.message}`));
    transaction.addEventListener('abort', (e) => logEvent(`Transaction aborted: ${e.srcElement.error.message}`));

    const books = transaction.objectStore('books');

    const clearRequest = books.clear();
    clearRequest.addEventListener('success', () => logEvent('Books store cleaned'));
    clearRequest.addEventListener('error', e => logEvent(`Error: ${e.srcElement.error.message}`));

    const bookAddRequest = books.add({
        title: 'JavaScript: The Definitive Guide',
        price: 15
    });
    bookAddRequest.addEventListener('success', (e) => logEvent(`Book added, key: ${bookAddRequest.result}`));
    bookAddRequest.addEventListener('error', (e) => logEvent(`Error: ${e.srcElement.error.message}`));

    books.add({ 
        id: 1,
        title: 'You Don\'t Know JS: Scope & Closures',
        price: 26
    }).addEventListener('success', (e) => logEvent(`Book added, key: ${e.target.result}`));

    books.add({ 
        id: 1,
        title: 'JavaScript: The Good Parts',
        price: 19
    }).addEventListener('error', (e) => {
        e.preventDefault();
        e.stopPropagation();
    });
});

openRequest.addEventListener('blocked', () => {
    logEvent('An unclosed outdated connection detected');
});

function logEvent(event) {
    const li = document.createElement('li');
    li.textContent = event;
    document.querySelector('#events').appendChild(li);
}

document.querySelector('#id-search-button').addEventListener('click', () => {
    const id = document.querySelector('#id-search').value;

    const db = openRequest.result;
    const transaction = db.transaction('books', 'readonly');
    const books = transaction.objectStore('books');

    const bookRequest = books.get(parseInt(id));
    bookRequest.addEventListener('success', (e) => {
        const book = e.target.result;
        const result = book ? book.title : 'Book not found';
        document.querySelector('#id-search-result').textContent = result;
    });
});