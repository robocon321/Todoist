const SchemaProject = {
  name: 'Project',
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

const SchemaLabelTask = {
  name: 'LabelTask',
  primaryKey: 'id',
  properties: {
    id: {type: 'string'},
    taskId: {type: 'string'},
    labelId: {type: 'string'},
  },
};

const SchemaTask = {
  name: 'Task',
  primaryKey: 'id',
  properties: {
    id: {type: 'string'},
    title: {type: 'string'},
    parentId: {type: 'string?'},
    priorityType: {type: 'int'},
    alarmId: {type: 'string?'},
    projectId: {type: 'string'},
    time: {type: 'date'},
    status: {type: 'int'},
  },
};

const SchemaLabel = {
  name: 'Label',
  primaryKey: 'id',
  properties: {
    id: {type: 'string'},
    title: {type: 'string'},
    colorType: {type: 'int'},
    favorite: {type: 'bool', default: false},
  },
};

const SchemaCommentProject = {
  name: 'CommentTask',
  primaryKey: 'id',
  properties: {
    id: {type: 'string'},
    taskId: {type: 'string'},
    type: {type: 'int'},
    content: {type: 'string?'},
    commentAccountId: {type: 'string'},
    fileType: {type: 'int'},
    fileLink: {type: 'string'},
    time: {type: 'date'},
  },
};

const databaseOptions = {
  path: 'database.realm',
  schema: [
    SchemaLabel,
    SchemaProject,
    SchemaTask,
    SchemaLabelTask,
    SchemaCommentProject,
  ],
  schemeVersion: 0,
};

export default databaseOptions;
