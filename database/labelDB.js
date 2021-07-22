import Realm from 'realm';
import databaseOptions from './config';

const SCHEMA_NAME = 'Label';

export const insert = data => {
  return new Promise((resolve, reject) => {
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
};

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
        console.log('Remove Error', err);
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
      .catch(err => {
        console.log('Query error', err);
        reject(false);
      });
  });
