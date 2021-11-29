import React from 'react';

export class ContactItem extends React.Component {
  render() {
    const {item} = this.props;
    return (
      <div className="ContactItem" data-id="contact">
        <p data-id="full-name-label">
            Name:<strong className="item-value" data-id="name">{item.name}</strong>
        </p>
        <p data-id="gender-label">
            Gender:<strong className="item-value" data-id="gender">{item.gender}</strong>
        </p>
        <p data-id="address-label">
            Address:<strong className="item-value" data-id="address">{item.street}, {item.city}</strong>
        </p>
        <button
          className="ContactItemEdit"
          data-id="edit-button"
          key="edit"
          onClick={this.onEditClick}
        >
          Edit
        </button>
        <button
          className="ContactItemDelete"
          data-id="delete-button"
          key="delete"
          onClick={this.onDeleteClick}
        >
          Delete
        </button>
      </div>
    );
  }

  onEditClick = () => {
    const {onEditClick} = this.props;
    if (onEditClick) onEditClick(this.props.item);
  };

  onDeleteClick = () => {
    const {onDeleteClick} = this.props;
    if (onDeleteClick) onDeleteClick(this.props.item);
  };

}
