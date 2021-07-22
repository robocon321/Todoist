import Realm from 'realm';
import databaseOptions from './config';

const SCHEMA_NAME = 'LabelTask';

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
          obj.taskId = data.taskId;
          obj.labelId = data.labelId;
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
