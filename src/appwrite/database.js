import { databases } from "./config";
import { ID } from "appwrite";

const db = {};

const collections = [
  {
    dbId: import.meta.env.VITE_DATABASE_ID,
    id: import.meta.env.VITE_COLLECTION_ID_TASKS,
    name: "Tasks",
  },
  {
    dbId: import.meta.env.VITE_DATABASE_ID,
    id: import.meta.env.VITE_COLLECTION_ID_R1C1,
    name: "R1C1",
  },
  {
    dbId: import.meta.env.VITE_DATABASE_ID,
    id: import.meta.env.VITE_COLLECTION_ID_R1C2,
    name: "R1C2",
  },
  {
    dbId: import.meta.env.VITE_DATABASE_ID,
    id: import.meta.env.VITE_COLLECTION_ID_R2C1,
    name: "R2C1",
  },
  {
    dbId: import.meta.env.VITE_DATABASE_ID,
    id: import.meta.env.VITE_COLLECTION_ID_R2C2,
    name: "R2C2",
  },
];

collections.forEach((col) => {
  db[col.name] = {
    create: (payload, permissions, id = ID.unique()) =>
      databases.createDocument(col.dbId, col.id, id, payload, permissions),
    update: (id, payload, permissions) =>
      databases.updateDocument(col.dbId, col.id, id, payload, permissions),
    delete: (id) => databases.deleteDocument(col.dbId, col.id, id),

    list: (queries = []) => databases.listDocuments(col.dbId, col.id, queries),

    get: (id) => databases.getDocument(col.dbId, col.id, id),
  };
});

export default db;
