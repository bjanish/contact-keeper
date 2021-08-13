import React, { useReducer } from 'react';
import uuid from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from '../types';

// Create initial state
const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@gmail.com',
        phone: '+1-555-555-5555',
        type: 'personal',
      },
      {
        id: 2,
        name: 'Jane Doe',
        email: 'jane@gmail.com',
        phone: '+1-555-555-5555',
        type: 'personal',
      },
      {
        id: 3,
        name: 'John Smith',
        email: 'johns@gmail.com',
        phone: '+1-555-555-5555',
        type: 'professional',
      },
      {
        id: 4,
        name: 'Jane Smith',
        email: 'janes@gmail.com',
        phone: '+1-555-555-5555',
        type: 'professional',
      },
    ],
  };
  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Add contact

  // Delete contact

  // Set current contact

  // Clear current contact

  // Update contact

  // Filter contacts

  // Clear filter

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
