import update from 'immutability-helper';
import fastFilter from 'fast-filter';

const initialState = {
  contacts: [],
  filteredIndex: [],
  isAscending: true,
};

const action = {
  INIT: 'INIT',
  SEARCH: 'SEARCH',
  CREATE: 'CREATE',
  DELETE: 'DELETE',
  UPDATE: 'UPDATE'
};

const reducer = (state, { type, payload }) => {
  if (type === 'INIT') {
    const { contacts } = payload;
    const filteredIndex = new Array(contacts.length);
    for (let i = 0; i < contacts.length; i += 1) {
      contacts[i].index = i;
      filteredIndex[i] = i;
    }
    return update(state, {
      contacts: { $set: contacts },
      filteredIndex: { $set: filteredIndex },
    });
  }

  if (type === 'SEARCH') {
    const { search } = payload;
    const { contacts, isAscending } = state;
    const searchFunction = (row) => {
      if (row === null) {
        return false;
      }
      if (!(row.name.toLowerCase().indexOf(search.toLowerCase()) >= 0)) {
          return false;
      }
      return true;
    }
    let filtered = fastFilter(contacts, contact => searchFunction(contact));
    filtered = isAscending ? filtered.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase(), undefined, {sensitivity: 'base'}))
      : filtered.sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase(), undefined, {sensitivity: 'base'}));

    const filteredIndex = new Array(filtered.length);

    for (let i = 0; i < filtered.length; i += 1) {
      filteredIndex[i] = filtered[i].index;
    }

    return update(state, {
      contacts: { $set: contacts },
      filteredIndex: { $set: filteredIndex },
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
