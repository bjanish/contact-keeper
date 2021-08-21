import React, { useReducer } from 'react';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import axios from 'axios';

import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CLEAR_CONTACTS,
  CONTACT_ERROR,
} from '../types';

// Create initial state
const ContactState = (props) => {
  const initialState = {
    contacts: null,
    current: null, // current contact
    filtered: null, // filtered contacts
    error: null, // error message
  };
  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Get contacts
  const getContacts = async () => {
    try {
      const response = await axios.get('/api/contacts');

      dispatch({ type: GET_CONTACTS, payload: response.data });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.message });
    }
  };

  // Add contact
  const addContact = async (contact) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axios.post(`/api/contacts`, contact, config);
      if (response.status === 201) {
        dispatch({
          type: ADD_CONTACT,
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.message });
    }
  };
  // Delete contact
  const deleteContact = (id) => {
    dispatch({
      type: DELETE_CONTACT,
      payload: id,
    });
  };
  // Clear Contacts
  const clearContacts = () => {
    dispatch({ type: CLEAR_CONTACTS });
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
  // Set current contact
  const updateContact = (contact) => {
    dispatch({
      type: UPDATE_CONTACT,
      payload: contact,
    });
  };
  // Filter contacts
  const filterContacts = (filter) => {
    dispatch({
      type: FILTER_CONTACTS,
      payload: filter,
    });
  };
  // Clear filter
  const clearFilter = () => {
    dispatch({
      type: CLEAR_FILTER,
    });
  };
  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
        clearContacts,
        getContacts,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
