import update from 'immutability-helper';

const initialState = {
  contacts: [],
};

const action = {
  INIT: 'INIT',
  CREATE: 'CREATE',
  DELETE: 'DELETE',
  UPDATE: 'UPDATE'
};

const reducer = (state, { type, payload }) => {
  if (type === 'INIT') {
    const { contacts } = payload;
    return update(state, {
      contacts: { $set: contacts },
    });
  }

  if (type === 'CREATE') {

  }

  if (type === 'DELETE') {

  }

  if (type === 'UPDATE') {

  }

  return state;
};

export { reducer, initialState, action };
