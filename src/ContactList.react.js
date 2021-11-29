import _ from 'underscore';
import React from 'react';

import {ContactItem} from './ContactItem.react';

export class ContactList extends React.Component {
  state = {
    query: null,
  };

  render() {
    const {query} = this.state;
    let lowerCaseQuery;
    if (query != null) {
      lowerCaseQuery = query.toLowerCase();
    }
    const items = this.props.items.filter(item => {
      return (
        !lowerCaseQuery ||
        (item.name.toLowerCase().includes(lowerCaseQuery) ||
          item.gender.toLowerCase().includes(lowerCaseQuery) ||
          item.phone.toLowerCase().includes(lowerCaseQuery) ||
          item.street.toLowerCase().includes(lowerCaseQuery) ||
          item.city.toLowerCase().includes(lowerCaseQuery))
      );
    });

    const sortedItems = _.sortBy(items, item => {
      return item.name;
    });

    const renderedItems = sortedItems.map((item, i) => (
      <ContactItem
        key={item.id}
        item={item}
        onEditClick={this.props.onEditClick}
        onDeleteClick={this.props.onDeleteClick}
      />
    ));

    const body =
      renderedItems.length > 0 ? (
        renderedItems
      ) : (
        <p data-id="no-items-message">There are no items to display</p>
      );

    return (
      <div className="ContactList">
        <div className="ContactListSearch" key="search">
          <input onChange={this.onSearchChange} data-id="search" placeholder="Search Contacts" />
          <button className="ContactListAdd" data-id="add-button" onClick={this.props.onAddClick}>
            Create
          </button>
        </div>
        <div className="ContactListItems" key="items">
          {body}
        </div>
      </div>
    );
  }

  onSearchChange = event => {
    this.setState({
      query: event.currentTarget.value.trim(),
    });
  };
}
