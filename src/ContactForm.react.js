import React from 'react';

const FIELDS = ['name', 'gender', 'phone', 'street', 'city'];

export class ContactForm extends React.Component {
  state = {
    selectedOption: null,
  }

  gender = {
    selectedOption: null,
  }

  GENDER_OPTIONS = [
    { value: 'Male', name: 'Male' },
    { value: 'Female', name: 'Female' },
    { value: 'Other', name: 'Other' },
  ];

  render() {
    const contact = this.props.contact || {};
    return (
      <form
        className="ContactForm"
        data-id="contact-form"
        onSubmit={this.onSave}
        ref={this.setFormRef}
      >
        {this.renderInput('name', 'Name', contact.name)}
        {this.renderSelect('gender', 'Gender', contact.gender)}
        {this.renderInput('phone', 'Phone', contact.phone)}
        {this.renderInput('street', 'Street', contact.street)}
        {this.renderInput('city', 'City', contact.city)}
        {this.renderError()}
        <div className="ContactFormButtons">
          <button type="submit" data-id="save-button">Save</button>
          <button type="button" data-id="cancel-button" onClick={this.onCancel}>Cancel</button>
        </div>
      </form>
    );
  }

  setFormRef = form => {
    this.formElement = form;
  };

  renderInput = (name, label, value) => {
    return (
      <div className="ContactFormField">
        <label data-id={`${name}-label`}>{label}</label>
        <input data-id={name} name={name} type="text" defaultValue={value} />
      </div>
    );
  };

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  }

  renderSelect = (name, label, value) => {
    return (
        <div className="ContactFormField">
        <label data-id={`${name}-label`}>{label}</label>
        <select defaultValue={value} name={name} data-id={name} onChange={this.handleChange}>
          {this.GENDER_OPTIONS.map((e, key) => {
            return <option key={key} value={e.value}>{e.name}</option>;
          })}
        </select>
        </div>
  )};

  renderError = () => {
    const {error} = this.state;
    if (!error) return null;

    return <div data-id="error-message" className="FormError">{error.toString()}</div>;
  };

  getInputValue = name => {
    const input = this.formElement
      ? this.formElement.querySelector(`[name="${name}"]`)
      : null;
    return input ? input.value : null;
  };

  onSave = event => {
    event.preventDefault();
    this.setState({error: null}, () => {
      const {onSave} = this.props;
      if (!onSave) {
        return;
      }
      try {
        const existing = this.props.contact;
        const contact = existing ? {...existing} : {};
        for (const field of FIELDS) {
          contact[field] = this.getInputValue(field);
          assertTextValue(field, contact[field]);
        }
        onSave(contact);
      } catch (err) {
        this.setState({error: err});
      }
    });
  };

  onCancel = event => {
    const {onCancel} = this.props;
    if (onCancel) onCancel();
  };
}

function isEmpty(str) {
  return (!str || /^\s*$/.test(str));
}

function assertTextValue(name, value) {
  if (isEmpty(value)) {
    throw new Error(`The "${name}" field can't be empty.`);
  }
}
