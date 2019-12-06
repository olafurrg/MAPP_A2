import React, { useReducer, useMemo } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { reducer, initialState, action } from './reducer';
import { StateContext, DispatchContext } from './context';

import Phonebook from '../views/Phonebook';
import Contact from '../views/Contact';

const StackNavigator = createStackNavigator({
  Phonebook: {
    screen: Phonebook,
    navigationOptions: ({navigation}) => ({
        title: 'Phonebook',
    }),
  },
  Contact: {
    screen: Contact,
    navigationOptions: ({ navigation }) => ({
      title: navigation.getParam('contactName'),
    }),
  },
});

const AppContainer = createAppContainer(StackNavigator);

export default () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <AppContainer />
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
}
