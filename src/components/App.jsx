import React, { Component } from 'react';
import toast from 'react-hot-toast';

import { pixabayApi } from './api';

import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './modal/modal';
import { Loader } from './Loader/Loader';
import { Button } from './loadMore/button';
import { ErrorUser } from './Error/ErrorUser';

import css from './app.module.css';

export class App extends Component {
  state = {
    array: [],
    searchValue: '',
    modalImgSrc: '',
    showModal: false,
    page: 1,
    status: 'idle',
    hidden: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchValue !== this.state.searchValue ||
      prevState.page !== this.state.page
    ) {
      try {
        this.setState({ status: 'pending' });
        const arrayObj = await pixabayApi(
          this.state.searchValue,
          this.state.page
        );

        console.log(arrayObj);
        if (arrayObj.hits.length > 0) {
          this.setState(prevState => {
            return {
              array: [...prevState.array, ...arrayObj.hits],
              status: 'resolved',
            };
          });
        } else {
          toast.error(
            `Sorry, but nothing was found for your query ${this.state.searchValue}`,
            { position: 'top-right' }
          );
          this.setState({ status: 'idle' });
          return;
        }

        if (Math.round(arrayObj.totalHits / 12) < this.state.page) {
          toast.error(
            `We are sorry, but you have reached the end of search results`,
            { position: 'top-right' }
          );

          this.setState({
            hidden: false,
          });
        }

        if (arrayObj.hits.length > 11) {
          this.setState({
            hidden: true,
          });
        }
      } catch (error) {
        this.setState({
          status: 'rejected',
        });
      }
    }
  }

  onOpenModal = e => {
    const imgForModal = e.target.dataset.src;
    this.setState(({ showModal, modalImgSrc }) => ({
      modalImgSrc: imgForModal,
      showModal: true,
    }));
  };

  onCloseModal = () => {
    this.setState(({ showModal, modalImgSrc }) => ({
      modalImgSrc: '',
      showModal: false,
    }));
  };

  hendlerFormSubmit = newState => {
    if (this.state.searchValue !== newState.value) {
      this.setState(({ searchValue, page }) => ({
        searchValue: newState.value,
        array: [],
        page: 1,
      }));
    }
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));

    if (this.state.page > 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  render() {
    const { searchValue, array, showModal, modalImgSrc, status, hidden } =
      this.state;

    if (status === 'rejected') {
      return (
        <div className={css.App}>
          <SearchBar onSubmit={this.hendlerFormSubmit} />
          <ErrorUser />
        </div>
      );
    }

    return (
      <div className={css.App}>
        <SearchBar onSubmit={this.hendlerFormSubmit} />
        {searchValue && (
          <ImageGallery data={array} clickModal={this.onOpenModal} />
        )}
        {hidden === true && <Button loadMore={this.loadMore} />}
        {showModal && (
          <Modal onClose={this.onCloseModal}>
            <img src={modalImgSrc} alt="" />
          </Modal>
        )}
        {status === 'pending' && <Loader />}
      </div>
    );
  }
}
