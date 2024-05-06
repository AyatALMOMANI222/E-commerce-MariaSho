import idb from 'idb';

const dbPromise = idb.openDB('images-db', 1, {
  upgrade(db) {
    db.createObjectStore('images');
  },
});

async function saveImage(file) {
  const db = await dbPromise;
  const tx = db.transaction('images', 'readwrite');
  const store = tx.objectStore('images');
  await store.put(file, file.name);
  await tx.done;
}

async function getImage(name) {
  const db = await dbPromise;
  const tx = db.transaction('images', 'readonly');
  const store = tx.objectStore('images');
  return store.get(name);
}

async function deleteImage(name) {
  const db = await dbPromise;
  const tx = db.transaction('images', 'readwrite');
  const store = tx.objectStore('images');
  await store.delete(name);
  await tx.done;
}
