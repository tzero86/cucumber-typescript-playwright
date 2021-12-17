import React from 'react'

import 'muicss/dist/css/mui.css'
import Form from 'muicss/lib/react/form'
import Input from 'muicss/lib/react/input'
import Button from 'muicss/lib/react/button'


export class BasicLogin extends React.Component {
      state = {
        disabled: true,
        errors: {}
      }

  onSubmit = e => {
    e.preventDefault()
     if  (
            e.target.email.value === "admin@testingtalkshub.com.au" &&
            e.target.password.value === "Password1234"
            ) {
            alert("Successfully logged in");
        } else {
            alert("Wrong email or password combination");
        }

  }

  onInput = e => {
    const errors = { ...this.state.errors }
    if (e.target.validationMessage && e.target.validationMessage !== '') {
      errors[e.target.name] = "Please include an '@' in the email address."
    } else {
      delete errors[e.target.name]
    }
    this.setState({ errors, disabled: !e.target.form.checkValidity() })
  }

    render() {
        const { errors } = this.state
        return (
        <>
<div className="Login" style={{ padding: 10 }}>
        <Form onSubmit={this.onSubmit}>
          <div>
            <Input
              name="email"
              type="email"
              data-id="email"
              label="Email"
              floatingLabel
              required
              onChange={this.onInput}
              invalid={!!errors.email}
            />
            {errors.email && (
              <div
                style={{ marginTop: '-1.5em' }}
                className="mui--text-caption mui--text-danger"
                data-id="email-error"
              >
                {errors.email}
              </div>
            )}
          </div>
          <div>
            <Input
              name="password"
              type="password"
              label="Password"
              data-id="password"
              floatingLabel
              required
              minLength={3}
              onChange={this.onInput}
              invalid={!!errors.password}
            />
            {errors.password && (
              <div
                style={{ marginTop: '-1.5em' }}
                className="mui--text-caption mui--text-danger"
                data-id="password-error"
              >
                {errors.password}
              </div>
            )}
          </div>
          <Button
            data-id="login-button"
            color="primary"
            variant="raised"
            type="submit"
          >
            LOGIN
          </Button>
        </Form>
      </div>
         </>
        );
    }

};

