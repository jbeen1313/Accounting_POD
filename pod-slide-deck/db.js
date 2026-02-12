const DB_NAME = "podDeckDB";
const DB_VERSION = 1;

const storeNames = {
  progress: "progress",
  challenges: "challenges",
  actions: "actions",
  priorities: "priorities",
  notes: "notes",
};

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      Object.values(storeNames).forEach((storeName) => {
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });
        }
      });
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function addItem(storeName, payload) {
  return openDatabase().then(
    (db) =>
      new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, "readwrite");
        const store = transaction.objectStore(storeName);
        store.add({ ...payload, createdAt: new Date().toISOString() });
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
      })
  );
}

function getAllItems(storeName) {
  return openDatabase().then((db) => {
    const transaction = db.transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  });
}

function putNote(category, content) {
  return openDatabase().then(
    (db) =>
      new Promise((resolve, reject) => {
        const transaction = db.transaction(storeNames.notes, "readwrite");
        const store = transaction.objectStore(storeNames.notes);
        store.put({ id: category, content, updatedAt: new Date().toISOString() });
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
      })
  );
}

function getNote(category) {
  return openDatabase().then((db) => {
    const transaction = db.transaction(storeNames.notes, "readonly");
    const store = transaction.objectStore(storeNames.notes);
    return new Promise((resolve, reject) => {
      const request = store.get(category);
      request.onsuccess = () => resolve(request.result ? request.result.content : "");
      request.onerror = () => reject(request.error);
    });
  });
}

function seedDatabase() {
  const seedData = {
    progress: [
      {
        owner: "Audit Team",
        detail: "Closed month-end reconciliations for three subsidiaries.",
        status: "On Track",
      },
      {
        owner: "Tax Team",
        detail: "Drafted state tax filings and reviewed variances.",
        status: "On Track",
      },
    ],
    challenges: [
      {
        owner: "Advisory",
        detail: "Awaiting client responses for revenue recognition review.",
        status: "Needs Help",
      },
    ],
    actions: [
      {
        owner: "All Pods",
        detail: "Confirm Q3 deliverables and timeline assumptions.",
        status: "On Track",
      },
      {
        owner: "Compliance",
        detail: "Prepare evidence list for upcoming internal audit.",
        status: "At Risk",
      },
    ],
    priorities: [
      {
        owner: "Leadership",
        detail: "Finalize staffing model for peak month-end support.",
        status: "On Track",
      },
    ],
  };

  return Promise.all(
    Object.entries(seedData).map(([storeName, items]) =>
      getAllItems(storeName).then((existing) => {
        if (existing.length) {
          return null;
        }
        return Promise.all(items.map((item) => addItem(storeName, item)));
      })
    )
  );
}

window.podDB = {
  storeNames,
  addItem,
  getAllItems,
  putNote,
  getNote,
  seedDatabase,
};
