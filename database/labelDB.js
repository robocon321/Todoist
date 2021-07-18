import Realm from 'realm';

const SCHEMA_NAME = 'Label';

export const Schema = {
  name: SCHEMA_NAME,
  primaryKey: 'id',
  properties: {
    id: 'string',
    title: 'string',
    colorType: 'int',
    favorite: 'boolean',
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
        console.log('Error', err);
        reject(false);
      });
  });

export const update = data =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let obj = realm.objectForPrimaryKey(SCHEMA_NAME, data.id);
          obj.title = data.title;
          obj.colorType = data.colorType;
          obj.favorite = data.favorite;
          resolve(true);
        });
      })
      .catch(err => {
        console.log('Error', err);
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
        console.log('Error', err);
        reject(false);
      });
  });

export const queryAll = () =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        let objs = realm.objects();
        resolve(objs);
      })
      .catch(err => reject(err));
  });
