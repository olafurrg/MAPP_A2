import React, { useReducer, useMemo } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { reducer, initialState, action } from './reducer';
import { ContactContext, DispatchContext } from './context';

import Phonebook from '../views/Phonebook';

const StackNavigator = createStackNavigator({
  Phonebook: {
    screen: Phonebook,
    navigationOptions: ({navigation}) => ({
        title: 'Phonebook',
    }),
  },
  Contact: {
    screen: Phonebook,
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
      <ContactContext.Provider value={state}>
        <AppContainer />
      </ContactContext.Provider>
    </DispatchContext.Provider>
  );
}
