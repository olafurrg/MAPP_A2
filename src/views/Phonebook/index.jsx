import React from 'react';
import { View, Text } from 'react-native';
import Toolbar from '../../components/Toolbar';
import ContactList from '../../components/ContactList';
import AddModal from '../../components/AddModal';
import Spinner from '../../components/Spinner';
import { getAllImages, addImage, remove } from '../../services/fileService';
import { takePhoto, selectFromCameraRoll } from '../../services/imageService';
import { getContactsFromPhone } from '../../services/contactService';
import logo from '../../recources/logo.png';
import * as colors from '../../styles/colors';

class Phonebook extends React.Component {
  static navigationOptions = {
    title: 'Phonebook'
  }

  state = {
    // All contacts wihin application
    contacts: [],
    // All selected scontacts
    selectedContacts: [],
    // Boolean flag which indicates application is loading items and should
    // display the spinner
    // Should be true during initial reload!!
    loadingItems: false,

    isAddModalOpen: false,
  }

  async componentDidMount(){
    await this._fetchContacts();
  }

  async _fetchContacts() {
    this.setState({ loadingItems: false });
    const tempContacts = await getContactsFromPhone();
    //Fetching contacts from phone but not saved into state
    console.log(tempContacts.length);
    //this.setState({ contacts: [...contacts, tempContacts ]});
    this.setState({ loadingItems: false });
  }

  render() {
    const { contacts, selectedContacts, loadingItems, isAddModalOpen } = this.state;
    console.log("In Render");
    console.log(contacts.length);
    return (
      <View>
        <Toolbar />
        {
          loadingItems
          ?
          <Spinner />
          :
          <ContactList
            contacts={ contacts }
            onLongPress={() => {}}
            selectedContacts={ selectedContacts } />
        }
        <AddModal
          isOpen={ isAddModalOpen }
          closeModal={ () => this.setState({ isAddModalOpen: false }) }
          takePhoto={ () => this.takePhoto() }
          selectFromCameraRoll={ () => this.selectFromCameraRoll() } />
        </View>
    );
  }

}

export default Phonebook;
