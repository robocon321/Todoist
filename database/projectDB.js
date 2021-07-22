import Realm from 'realm';

const SCHEMA_NAME = 'Project';

const Schema = {
  name: SCHEMA_NAME,
  primaryKey: 'id',
  properties: {
    id: 'string',
    title: 'string',
    parentId: 'string?',
    viewType: 'int',
    colorType: 'int',
    favorite: 'bool',
  },
};

const databaseOptions = {
  path: 'database.realm',
  schema: [Schema],
  schemeVersion: 0,
};

export const insert = data =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          realm.create(SCHEMA_NAME, data);
          resolve(true);
        });
      })
      .catch(err => {
        console.log('Insert error', err);
        reject(false);
      });
  });

export const update = project =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let obj = realm.objectForPrimaryKey(SCHEMA_NAME, project.id);
          obj.title = project.title;
          obj.parentId = project.parentId;
          obj.viewType = project.viewType;
          obj.colorType = project.colorType;
          obj.favorite = project.favorite;
          resolve(true);
        });
      })
      .catch(err => {
        console.log('Update error', err);
        reject(false);
      });
  });

export const remove = id =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let obj = realm.objectForPrimaryKey(SCHEMA_NAME, id);
          obj.delete();
          resolve(true);
        });
      })
      .catch(err => {
        console.log('Remove error', err);
        reject(false);
      });
  });

export const queryAll = () =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        let objs = realm.objects(SCHEMA_NAME);
        resolve(objs);
      })
      .catch(err => reject(err));
  });
