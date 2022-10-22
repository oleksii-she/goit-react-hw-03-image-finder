import React, { Component } from 'react';

import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './modal/modal';
import { pixabayApi } from './api';
import { Loader } from './Loader/Loader';
import { Button } from './loadMore/button';
import { ErrorUser } from './Error/ErrorUser';
import css from './app.module.css';
export class App extends Component {
  state = {
    array: [],
    searchValue: '',
    modalImgSrc: '',
    isLoading: false,
    showModal: false,

    page: 1,
    status: 'idle',
  };

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.page > 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
    if (
      prevState.searchValue !== this.state.searchValue ||
      prevState.page !== this.state.page
    ) {
      try {
        this.setState({ isLoading: true });
        const arrayObj = await pixabayApi(
          this.state.searchValue,
          this.state.page
        );

        if (arrayObj.length > 0) {
          this.setState(prevState => {
            return {
              array: [...prevState.array, ...arrayObj],
              status: 'resolved',
            };
          });
        }
      } catch (error) {
        this.setState({
          status: 'rejected',
        });
      } finally {
        this.setState({ isLoading: false });
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
    this.setState(({ searchValue, page }) => ({
      searchValue: newState.value,
      page: newState.page,
    }));
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      status: 'pending',
    }));
  };

  render() {
    const { searchValue, array, isLoading, showModal, modalImgSrc, status } =
      this.state;
    console.log(status);
    if (status === 'idle') {
      return <SearchBar onSubmit={this.hendlerFormSubmit} />;
    }
    if (status === 'pending') {
      <Loader visible={isLoading} />;
    }
    if (status === 'rejected') {
      return (
        <>
          <SearchBar onSubmit={this.hendlerFormSubmit} />
          <ErrorUser />
        </>
      );
    }
    if (status === 'resolved') {
      return (
        <div className={css.App}>
          <SearchBar onSubmit={this.hendlerFormSubmit} />
          {searchValue && (
            <ImageGallery data={array} clickModal={this.onOpenModal} />
          )}
          {searchValue && <Button loadMore={this.loadMore} />}
          {showModal && (
            <Modal onClose={this.onCloseModal}>
              <img src={modalImgSrc} alt="" />
            </Modal>
          )}
        </div>
      );
    }
  }
}

// resolved pending idle' rejected
