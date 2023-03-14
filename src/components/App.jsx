import React, { useState, useEffect } from 'react';
import { Wrap } from './App.styled';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Section } from './Section/Section';

export function App() {
  const savedContacts = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annia Copeland', number: '227-91-26' },
  ];

  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? savedContacts;
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addNewContact = newContact => {
    const chekContact = contacts.find(
      contact => contact.name === newContact.name
    );
    if (chekContact) {
      return alert(chekContact.name + ' is already in contact');
    }
    setContacts(prevContact => [...prevContact, newContact]);
  };

  const deleteContact = contactId => {
    setContacts(prevContact =>
      prevContact.filter(contact => contact.id !== contactId)
    );
  };

  const changeFilter = e => setFilter(e.currentTarget.value);
  const toLowerCase = filter.toLowerCase();
  const filterContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(toLowerCase)
  );
  return (
    <Wrap>
      <Section title={'Phonebook'}>
        <ContactForm onSubmit={addNewContact} />
        <Filter filter={filter} onChange={changeFilter} />
        <ContactList contacts={filterContacts} onDelete={deleteContact} />
      </Section>
    </Wrap>
  );
}
