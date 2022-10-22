import React, { Component } from 'react';
// import { Formik, Form } from 'formik';

export class SearchBar extends Component {
  state = {
    value: '',
    page: 1,
  };

  handlerInputName = e => {
    this.setState({ value: e.target.value.toLowerCase() });
  };

  handlerSubmitForm = e => {
    e.preventDefault();
    if (this.state.value === '') {
      console.log('none value');
    }
    this.props.onSubmit(this.state);
    this.reset();
  };

  reset = () => {
    this.setState({ value: '' });
  };
  render() {
    const { value } = this.state;

    return (
      <header className="searchbar">
        <form class="form" onSubmit={this.handlerSubmitForm}>
          <button type="submit" class="button">
            <span class="button-label">Search</span>
          </button>

          <input
            class="input"
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
            value={value}
            onChange={this.handlerInputName}
          />
        </form>
      </header>
    );
  }
}
