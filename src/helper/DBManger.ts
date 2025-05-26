import { UserType } from '@/store/reducers/users/types.ts';

const DB_NAME = 'SampleProject';
const DB_VERSION = 1;
const STORE_NAME = 'users';



function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
  });
}


export async function addUser(payload: UserType): Promise<void> {
  const  user= await getUserById(payload?.userId)
  if (!user) {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.put(payload);

    await tx.oncomplete;
    db.close();
  }
}

export async function updateUser(payload: UserType): Promise<UserType> {
  const current = await getUserById(payload?.userId);
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  const data:UserType ={...payload};



  delete data['id'];
  delete data['password'];
  delete data['userName'];

  const request = store.put({...payload,password:current?.password}); // `put()` updates if key exists

  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      resolve(payload);
    };
    request.onerror = () => reject(request.error);
  });
}

export async function register(payload: UserType): Promise<UserType> {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);

  const request = store.put(payload); // `put()` updates if key exists

  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      resolve(payload);
    };
    request.onerror = () => reject(request.error);
  });
}


// Get all users
export async function getUsers(): Promise<UserType[]> {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, 'readonly');
  const store = tx.objectStore(STORE_NAME);
  const request = store.getAll();

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result as UserType[]);
    request.onerror = () => reject(request.error);
  });
}

export async function getUserById(id: string): Promise<UserType | undefined> {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, 'readonly');
  const store = tx.objectStore(STORE_NAME);
  const request = store.get(id);

  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      resolve(request.result as UserType | undefined);
    };
    request.onerror = () => reject(request.error);
  });
}

