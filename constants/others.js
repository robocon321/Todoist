export const HEIGHT_MENU = 60;
export const SECRET = 'robocon321';
export const API_URL =
  'https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/todoist-oqqxa/service/todoistAPI/incoming_webhook';
export const ACCOUNT = 'account';

export const priorities = [
  {
    id: 1,
    color: '#eb1000',
  },
  {
    id: 2,
    color: '#e3b200',
  },
  {
    id: 3,
    color: '#79e300',
  },
  {
    id: 4,
    color: '#595959',
  },
];

export const STATUS_TASK = {
  DELETE: 0,
  NOT_COMPLETE: 1,
  COMPLETE: 2,
};

export const REACTION = [
  {
    id: 0,
    name: 'Like',
    path: require('../assets/images/like.png'),
  },
  {
    id: 1,
    name: 'Haha',
    path: require('../assets/images/haha.png'),
  },
  {
    id: 2,
    name: 'Angry',
    path: require('../assets/images/angry.png'),
  },
  {
    id: 3,
    name: 'Sleep',
    path: require('../assets/images/sleep.png'),
  },
  {
    id: 4,
    name: 'Cry',
    path: require('../assets/images/cry.png'),
  },
  {
    id: 5,
    name: 'Wow',
    path: require('../assets/images/wow.png'),
  },
  {
    id: 6,
    name: 'Joke',
    path: require('../assets/images/joke.png'),
  },
  {
    id: 7,
    name: 'Heart',
    path: require('../assets/images/heart.png'),
  },
];

export const ATTACH_TYPE = {
  NONE: 0,
  FILE: 1,
  CAMERA: 2,
  RECORD: 3,
  GOOGLE_DRIVE: 4,
  IMAGE: 5,
};
