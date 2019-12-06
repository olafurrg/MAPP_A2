import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from '../views/Main';
import Phonebook from '../views/Phonebook';

const StackNavigator = createStackNavigator({
  Main,
  Phonebook,
});

export default createAppContainer(StackNavigator);
