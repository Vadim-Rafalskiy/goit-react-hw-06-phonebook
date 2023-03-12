import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

import ContactItem from 'components/ContactItem/ContactItem';

const ContactList = ({ contacts, removeContact }) => {
  const elements = contacts.map(({ ...props }) => (
    <ContactItem key={nanoid()} removeContact={removeContact} {...props} />
  ));
  return <ul>{elements}</ul>;
};

export default ContactList;

ContactList.defaultProps = {
  contacts: [],
};

ContactList.propTypes = {
  removeContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
