import { useSelector, useDispatch } from 'react-redux';
import { addContact, deleteContact } from './redux/contacts/contacts-slise';

import { setFilter } from './redux/filter/filter-slice';

import {
  getAllContacts,
  getFilteredContacts,
} from './redux/contacts/contacts-selectors';
import { getFilter } from './redux/filter/filter-selectors';

import ContactList from './ContactList/ContactList';
import PhoneBookFilter from './PhoneBookFilter/PhoneBookFilter';
import PhoneBookForm from './PhoneBookForm/PhoneBookForm';

import styles from './App.module.css';

export const App = () => {
  const filteredContacts = useSelector(getFilteredContacts);
  const contacts = useSelector(getAllContacts);
  const filter = useSelector(getFilter);

  const dispatch = useDispatch();

  const isDuplicate = name => {
    const normalizeName = name.toLowerCase();
    const contact = contacts.find(({ name }) => {
      return name.toLowerCase() === normalizeName;
    });
    return Boolean(contact);
  };

  const handleAddContact = ({ name, number }) => {
    if (isDuplicate(name)) {
      alert(`${name} is already in contacts`);
      return false;
    }

    dispatch(addContact({ name, number }));
  };

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const handleFilter = ({ target }) => {
    dispatch(setFilter(target.value));
  };
  const isContacts = Boolean(filteredContacts.length);

  return (
    <div className={styles.wrapper}>
      <div className={styles.block}>
        <h1 className={styles.title}>Phonebook</h1>
        <PhoneBookForm onSubmit={handleAddContact} isDuplicate={isDuplicate} />
      </div>

      <div className={styles.block}>
        <h2 className={styles.title}>Contacts</h2>
        <PhoneBookFilter value={filter} handleChange={handleFilter} />
        <ContactList
          removeContact={handleDeleteContact}
          contacts={filteredContacts}
        />
        {!isContacts && <p>Contacts list is empty!</p>}
      </div>
    </div>
  );
};
