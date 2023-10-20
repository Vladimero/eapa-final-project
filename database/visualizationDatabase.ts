// Only for code visualization purposes

// table 1:

type Users = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
};

const users: Users[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@gmail.com',
    password: '123Password',
    isAdmin: true,
    createdAt: '15.10.2023',
    updatedAt: '20.10.2023',
  },
  {
    id: 2,
    firstName: 'Emily',
    lastName: 'Richards',
    email: 'emily.richards@gmail.com',
    password: '456Password',
    isAdmin: false,
    createdAt: '15.10.2023',
    updatedAt: '20.10.2023',
  },
];
console.log(users);

// table 2:

type Pollution = {
  id: number;
  kind: string;
};

const pollution: Pollution[] = [
  {
    id: 1,
    kind: 'air',
  },
  {
    id: 2,
    kind: 'water',
  },
  {
    id: 3,
    kind: 'noise',
  },
  {
    id: 4,
    kind: 'plastic',
  },
  {
    id: 5,
    kind: 'soil',
  },
  {
    id: 6,
    kind: 'radioactive',
  },
  {
    id: 7,
    kind: 'pluvial',
  },
  {
    id: 8,
    kind: 'thermal',
  },
  {
    id: 9,
    kind: 'biological',
  },
];
console.log(pollution);

// table 3:

type Region = {
  id: number;
  state: string;
};

const region: Region[] = [
  {
    id: 1,
    state: 'Vienna',
  },
  {
    id: 2,
    state: 'Niederösterreich',
  },
  {
    id: 3,
    state: 'Oberösterreich',
  },
  {
    id: 4,
    state: 'Salzburg',
  },
  {
    id: 5,
    state: 'Steiermark',
  },
  {
    id: 6,
    state: 'Burgenland',
  },
  {
    id: 7,
    state: 'Kärnten',
  },
  {
    id: 8,
    state: 'Tirol',
  },
  {
    id: 9,
    state: 'Vorarlberg',
  },
];
console.log(region);

// table 4:

type Requests = {
  id: number;
  kind: string;
};

const requests: Requests[] = [
  {
    id: 1,
    kind: 'appointment',
  },
  {
    id: 2,
    kind: 'investigation',
  },
  {
    id: 3,
    kind: 'improvement',
  },
  {
    id: 4,
    kind: 'cleaning',
  },
  {
    id: 5,
    kind: 'mending',
  },
  {
    id: 6,
    kind: 'repair',
  },
];
console.log(requests);

// table 5:

type Events = {
  id: number;
  image: string;
  report: string;
  damageEstimation: number;
  date: string;
};

const events: Events[] = [
  {
    id: 1,
    image: 'url',
    report: 'this is a report of a damage',
    damageEstimation: 7,
    date: '15.10.2023',
  },
];
console.log(events);
