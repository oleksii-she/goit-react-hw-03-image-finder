import React, { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { pixabayApi } from './api';

import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './modal/modal';
import { Loader } from './Loader/Loader';
import { Button } from './loadMore/button';
import { ErrorUser } from './Error/ErrorUser';

import css from './app.module.css';

/// notification
// const notifyE = () =>
//   toast('Hello World', {
//     duration: 4000,
//     position: 'top-center',

//     // Styling
//     style: {},
//     className: '',

//     // Custom Icon
//     icon: '👏',

//     // Change colors of success/error/loading icon
//     iconTheme: {
//       primary: '#000',
//       secondary: '#fff',
//     },

//     // Aria
//     ariaProps: {
//       role: 'status',
//       'aria-live': 'polite',
//     },
//   });

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
        } else {
          this.setState({ status: 'idle' });
          toast.error('Sorry, we didn`t find anything for this query', {
            position: 'top-right',
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
    if (this.state.searchValue !== newState.value) {
      this.setState(({ searchValue, page }) => ({
        searchValue: newState.value,
        array: [],
        page: newState.page,
        status: 'pending',
        isLoading: true,
      }));
    }
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      status: 'pending',
      isLoading: true,
    }));
  };

  render() {
    const { searchValue, array, isLoading, showModal, modalImgSrc, status } =
      this.state;
    console.log(status);
    console.log(isLoading);
    if (status === 'idle') {
      return (
        <div className={css.App}>
          <SearchBar onSubmit={this.hendlerFormSubmit} />
          <Toaster />
        </div>
      );
    }
    if (status === 'pending') {
      <div className={css.App}>
        <SearchBar onSubmit={this.hendlerFormSubmit} />
        {/* <Loader visible={isLoading} />; */}
        {array.length > 0 && (
          <ImageGallery data={array} clickModal={this.onOpenModal} />
        )}
      </div>;
    }
    if (status === 'rejected') {
      return (
        <div className={css.App}>
          <SearchBar onSubmit={this.hendlerFormSubmit} />

          <ErrorUser />
        </div>
      );
    }
    if (status === 'resolved') {
      return (
        <div className={css.App}>
          <SearchBar onSubmit={this.hendlerFormSubmit} />
          {searchValue && (
            <ImageGallery data={array} clickModal={this.onOpenModal} />
          )}
          <Loader visible={isLoading} />;
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
