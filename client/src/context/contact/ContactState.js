import React, { useReducer } from 'react';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import { v4 as uuid } from 'uuid';

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
    current: null, //{
    //   id: 1,
    //   name: 'James Doe',
    //   email: 'jd@gmail.com',
    //   phone: '+1-555-555-5555',
    //   type: 'personal',
    // },
  };
  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Add contact
  const addContact = (contact) => {
    contact.id = uuid();
    dispatch({
      type: ADD_CONTACT,
      payload: contact,
    });
  };
  // Delete contact
  const deleteContact = (id) => {
    dispatch({
      type: DELETE_CONTACT,
      payload: id,
    });
  };
  // Set current contact
  const setCurrent = (contact) => {
    dispatch({
      type: SET_CURRENT,
      payload: contact,
    });
  };
  // Clear current contact
  const clearCurrent = () => {
    dispatch({
      type: CLEAR_CURRENT,
    });
  };
  // Update contact

  // Filter contacts

  // Clear filter

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
