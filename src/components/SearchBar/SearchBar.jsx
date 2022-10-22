import React, { Component } from 'react';
import { FaSearchMinus } from 'react-icons/fa';
import css from './SearchBar.module.css';

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
      <header className={css.Searchbar}>
        <form className={css.search_form} onSubmit={this.handlerSubmitForm}>
          <button type="submit" className={css.searchForm_button}>
            <FaSearchMinus />
          </button>

          <input
            className={css.SearchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={value}
            onChange={this.handlerInputName}
          />
        </form>
      </header>
    );
  }
}
