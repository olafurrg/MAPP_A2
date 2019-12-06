import React from 'react';
import * as Contacts from 'expo-contacts';
import * as Permissions from 'expo-permissions';


const getPermission = async (permissionTypes) => {
  await Promise.all(permissionTypes.map(async (type) => Permissions.askAsync(type)));
};

export const getContactsFromPhone = async () => {
  await getPermission([Permissions.CONTACTS]);
  const { data } = await Contacts.getContactsAsync({
    fields: [
      Contacts.Fields.FirstName,
      Contacts.Fields.PhoneNumbers,
      Contacts.Fields.Image
    ],
  });

  if (data.length > 0) {
    const contact = data[0];
    console.log(data.length);
    return data;
  }
};
