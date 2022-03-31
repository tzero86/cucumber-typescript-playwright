import React from "react";
import { Helmet } from 'react-helmet'
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/styles.css';
import './assets/css/playground.css';
import {ContactList} from './ContactList.react';
import {ContactForm} from './ContactForm.react';
import {BasicRadioButton} from './components/BasicRadioButton.react';
import {BasicAutoComplete} from './components/BasicAutoComplete.react';
import {BasicCheckBox} from './components/BasicCheckBox.react';
import {BasicCard} from './components/BasicCard.react';
import {BasicSwitch} from './components/BasicSwitch.react';
import {BasicButtons} from './components/BasicButtons.react'
import {BasicAvatars} from './components/BasicAvatars.react'
import {BasicTab} from './components/BasicTab.react'
import {BasicMenu} from './components/BasicMenu.react'
import {BasicTextArea} from './components/BasicTextArea.react'
import {BasicTable} from './components/BasicTable.react'
import {BasicTooltip} from './components/BasicTooltip.react'
import {BasicAlert} from "./components/BasicAlert.react";
import {BasicOpenWindow} from './components/BasicOpenWindow.react'
import {BasicBrowserAlert} from './components/BasicBrowserAlert.react'
import {BasicShowHide} from "./components/BasicShowHide.react";
import {BasicSelect} from "./components/BasicSelect.react"
import {BasicIframe} from "./components/BasicIframe.react"
import {BasicValidation} from "./components/BasicValidation.react"
import {BasicStoredValues} from './components/BasicStoredValues.react'
import {BasicIndex} from './components/BasicIndex.react'
import {BasicValues} from './components/BasicValues.react'
import {BasicInputValues} from './components/BasicInputValues.react'
import {BasicLogin} from './components/BasicLogin.react'
import {BasicREST} from './components/BasicREST.react'

import {
 Navbar,
 Container
} from "react-bootstrap";

const contacts = require('./contacts.json');

class App extends React.Component {
  state = {
    formContact: {},
    contacts: JSON.parse(JSON.stringify(contacts)).map(contact => {
      contact.id = getNextId();
      return contact;
    }),
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const {error} = this.state;
    if (prevState.error !== error && error) {
      setTimeout(() => {
        this.setState({error: null});
      }, 5000);
    }
  }

  render() {
    return (
      <BrowserRouter>
      {this.renderNavBar()}
          <Switch>
            <Route exact path="/" component={this.renderList} />
            <Route exact path="/tasks" component={this.renderList} />
            <Route exact path="/tasks/create" component={this.renderCreateForm} />
            <Route exact path="/tasks/:id/edit" component={this.renderEditForm} />
            <Route exact path="/playground" component={this.renderPlaygroundForm} />
            <Route component={this.render404} />
          </Switch>
      </BrowserRouter>
    );
  }

  render404() {
    return this.renderError('Resource not found!');
  }

  renderList = ({history}) => {

    return (
      <>
        <Helmet>
            <title>Contacts</title>
        </Helmet>
        <div className="App">
            <h1 className="contacts" data-id="contacts">Contacts</h1>
            {this.renderErrorState()}
            <ContactList
              items={this.state.contacts}
              onAddClick={() => this.onAddClick(history)}
              onEditClick={contact => this.onEditClick(contact, history)}
              onDeleteClick={contact => this.onDeleteClick(contact, history)}
            />
        </div>
      </>
    );
  };

  renderNavBar = () => {
    return (
    <>
          <Navbar bg="black" variant="dark">
            <Container>
                <div className="playground-link">
                <a
                  className="testing-talks-logo"
                  href="/"
                >
                </a>
              </div>
              <div className="playground-link">
                  <a
                      className="ContactItemPlayground"
                      data-id="playground-button"
                      key="playground"
                      href="/playground"
                  >
                      PLAYGROUND
                  </a>
              </div>
            </Container>
          </Navbar>
    </>
    )
  };

  renderCreateForm = ({history}) => {

    return (
      <>
        <Helmet>
            <title>Create Contact</title>
        </Helmet>
        <div className="App">
        <h1 className="create-contact">Create Contact</h1>
        <ContactForm
          contact={null}
          onSave={contact => this.onCreate(contact, history)}
          onCancel={() => this.routeHome(history)}
        />
        </div>
      </>
    );
  };

  renderEditForm = ({history, match}) => {

    const id = match.params.id;
    const contact = this.state.contacts.find(contact => contact.id === id);
    if (!contact) {
      this.setState(createMissingContactErrorState(id));
      this.routeHome(history);
      return null;
    }
    return (
      <>
      <Helmet>
          <title>Edit Contact</title>
      </Helmet>
      <div className="App">
        <h1 className="edit-contact">Edit Contact</h1>
        <ContactForm
          contact={contact}
          onSave={contact => this.onEdit(contact, history)}
          onCancel={() => this.routeHome(history)}
        />
      </div>
      </>
    );
  };

  renderPlaygroundForm = () => {

    return (
      <>
        <Helmet>
            <title>Playground</title>
        </Helmet>
      <div className="Playground">
      <h1 className="playground-header">Playground</h1>

    <div className="container bootstrap snipets">
       <div className="row flow-offset-1">
         <div className="col-xs-6 col-md-4">
             <div className="caption">
               <h6><span className="caption-text">Radio Button</span></h6>
             </div>
           <div className="product tumbnail thumbnail-3">
                <BasicRadioButton />
           </div>
         </div>
         <div className="col-xs-6 col-md-4">
             <div className="caption">
               <h6><span className="caption-text">Autocomplete Combo Box</span></h6>
             </div>
           <div className="product tumbnail thumbnail-3">
                <BasicAutoComplete />
           </div>
         </div>
         <div className="col-xs-6 col-md-4">
             <div className="caption">
               <h6><span className="caption-text">Check Box</span></h6>
             </div>
             <div className="product tumbnail thumbnail-3">
                  <BasicCheckBox />
           </div>
         </div>
         <div className="col-xs-6 col-md-4">
             <div className="caption">
                 <h6><span className="caption-text">Card</span></h6>
             </div>
           <div className="product tumbnail thumbnail-3">
               <BasicCard />
           </div>
         </div>
         <div className="col-xs-6 col-md-4">
             <div className="caption">
                 <h6><span className="caption-text">Switch</span></h6>
             </div>
           <div className="product tumbnail thumbnail-3">
                <BasicSwitch />
           </div>
         </div>
         <div className="col-xs-6 col-md-4">
             <div className="caption">
                 <h6><span className="caption-text">Buttons</span></h6>
             </div>
           <div className="product tumbnail thumbnail-3">
                <BasicButtons />
           </div>
         </div>
           <div className="col-xs-6 col-md-4">
               <div className="caption">
                   <h6><span className="caption-text">Avatars</span></h6>
               </div>
               <div className="product tumbnail thumbnail-3">
                   <BasicAvatars />
               </div>
           </div>
           <div className="col-xs-6 col-md-4">
               <div className="caption">
                   <h6><span className="caption-text">Open Tab</span></h6>
               </div>
               <div className="product tumbnail thumbnail-3">
                   <BasicTab />
               </div>
           </div>
           <div className="col-xs-6 col-md-4">
               <div className="caption">
                   <h6><span className="caption-text">Drop Down Menu</span></h6>
               </div>
               <div className="product tumbnail thumbnail-3">
                   <BasicMenu />
               </div>
           </div>
           <div className="col-xs-6 col-md-4">
               <div className="caption">
                   <h6><span className="caption-text">Text Area</span></h6>
               </div>
               <div className="product tumbnail thumbnail-3">
                   <BasicTextArea />
               </div>
           </div>
           <div className="col-xs-6 col-md-4">
               <div className="caption">
                   <h6><span className="caption-text">Table</span></h6>
               </div>
               <div className="product tumbnail thumbnail-3">
                   <BasicTable />
               </div>
           </div>
           <div className="col-xs-6 col-md-4">
               <div className="caption">
                   <h6><span className="caption-text">Tooltip</span></h6>
               </div>
               <div className="product tumbnail thumbnail-3">
                   <BasicTooltip />
               </div>
           </div>
           <div className="col-xs-6 col-md-4">
               <div className="caption">
                   <h6><span className="caption-text">Alert</span></h6>
               </div>
               <div className="product tumbnail thumbnail-3">
                   <BasicAlert />
               </div>
           </div>
           <div className="col-xs-6 col-md-4">
               <div className="caption">
                   <h6><span className="caption-text">Open Window</span></h6>
               </div>
               <div className="product tumbnail thumbnail-3">
                   <BasicOpenWindow />
               </div>
           </div>
           <div className="col-xs-6 col-md-4">
               <div className="caption">
                   <h6><span className="caption-text">Browser Alert</span></h6>
               </div>
               <div className="product tumbnail thumbnail-3">
                   <BasicBrowserAlert />
               </div>
           </div>
           <div className="col-xs-6 col-md-4">
               <div className="caption">
                   <h6><span className="caption-text">Show / Hide</span></h6>
               </div>
               <div className="product tumbnail thumbnail-3">
                   <BasicShowHide />
               </div>
           </div>
           <div className="col-xs-6 col-md-4">
               <div className="caption">
                   <h6><span className="caption-text">Select</span></h6>
               </div>
               <div className="product tumbnail thumbnail-3">
                   <BasicSelect />
               </div>
           </div>
           <div className="col-xs-6 col-md-4">
               <div className="caption">
                   <h6><span className="caption-text">Badge</span></h6>
               </div>
               <div className="product tumbnail thumbnail-3">
                   <BasicValidation />
               </div>
           </div>
           <div className="col-xs-6 col-md-4">
               <div className="caption">
                   <h6><span className="caption-text">IFrame</span></h6>
               </div>
               <div className="product tumbnail thumbnail-3">
                   <BasicIframe />
               </div>
           </div>
           <div className="col-xs-6 col-md-4">
               <div className="caption">
                   <h6><span className="caption-text">Stored Values</span></h6>
               </div>
               <div className="product tumbnail thumbnail-3">
                   <BasicStoredValues />
               </div>
           </div>
           <div className="col-xs-6 col-md-4">
               <div className="caption">
                   <h6><span className="caption-text">Index</span></h6>
               </div>
               <div className="product tumbnail thumbnail-3">
                   <BasicIndex />
               </div>
           </div>
           <div className="col-xs-6 col-md-4">
               <div className="caption">
                   <h6><span className="caption-text">Basic Values</span></h6>
               </div>
               <div className="product tumbnail thumbnail-3">
                   <BasicValues />
               </div>
           </div>
           <div className="col-xs-6 col-md-4">
               <div className="caption">
                   <h6><span className="caption-text">Input Values</span></h6>
               </div>
               <div className="product tumbnail thumbnail-3">
                   <BasicInputValues />
               </div>
           </div>
           <div className="col-xs-6 col-md-4">
               <div className="caption">
                   <h6><span className="caption-text">Login</span></h6>
               </div>
               <div className="product tumbnail thumbnail-3">
                   <BasicLogin />
               </div>
           </div>
           <div className="col-xs-6 col-md-4">
               <div className="caption">
                   <h6><span className="caption-text">Basic REST</span></h6>
               </div>
               <div className="product tumbnail thumbnail-3 rest-name">
                   <BasicREST />
               </div>
           </div>
       </div>
     </div>

      </div>
      </>
    );
  };

  renderError = err => {
    return <p>{err.toString()}</p>;
  };

  renderErrorState = () => {
    const {error} = this.state;
    return error ? this.renderError(error.toString()) : null;
  };

  onCreate = (contact, history) => {
    const newContact = {
      ...contact,
      id: getNextId(),
    };
    this.setState(
      prevState => {
        return {
          ...prevState,
          contacts: [...prevState.contacts, newContact],
        };
      },
      () => {
        this.routeHome(history);
      },
    );
  };

  routeHome = history => {
    history.push('/');
  };

  onAddClick = history => {
    history.push('/tasks/create');
  };

  onEditClick = (contact, history) => {
    history.push(`/tasks/${contact.id}/edit`);
  };

  onDeleteClick = (contact, history) => {
    if (window.confirm('Are you sure you to remove this contact?')) {
      this.setState(prevState => {
        const index = prevState.contacts.findIndex(c => c.id === contact.id);
        if (index === -1) {
          return createMissingContactErrorState(contact.id);
        }
        const contacts = prevState.contacts.slice();
        contacts.splice(index, 1);
        return {contacts};
      });
    }
  };


  onEdit = (contact, history) => {
    this.setState(
      prevState => {
        const index = prevState.contacts.findIndex(c => c.id === contact.id);
        if (index === -1) {
          return createMissingContactErrorState(contact.id);
        }
        const contacts = prevState.contacts.slice();
        contacts[index] = {...contact};
        return {
          ...prevState,
          contacts,
        };
      },
      () => {
        this.routeHome(history);
      },
    );
  };
}


function createMissingContactErrorState(id) {
  return {
    error: new Error(`Couldn't find contact with ID "${id}"`),
  };
}

let nextId = 0;
function getNextId() {
  return (nextId++).toString();
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
