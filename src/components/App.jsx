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

export class App extends Component {
  state = {
    array: [],
    searchValue: '',
    modalImgSrc: '',
    // isLoading: false,
    showModal: false,

    page: 1,
    status: 'idle',
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

        if (arrayObj.length > 0) {
          this.setState(prevState => {
            return {
              array: [...prevState.array, ...arrayObj],
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
    } else {
      return;
    }
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      status: 'pending',
    }));

    if (this.state.page > 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  render() {
    const { searchValue, array, showModal, modalImgSrc, status } = this.state;
    // if (status === 'idle') {
    //   return (
    //     <div className={css.App}>
    //       <SearchBar onSubmit={this.hendlerFormSubmit} />
    //     </div>
    //   );
    // }
    // if (status === 'pending') {
    //   <div className={css.App}>
    //     <SearchBar onSubmit={this.hendlerFormSubmit} />
    //     <Loader />
    //   </div>;
    // }
    if (status === 'rejected') {
      return (
        <div className={css.App}>
          <SearchBar onSubmit={this.hendlerFormSubmit} />
          <ErrorUser />
        </div>
      );
    }
    // if (status === 'resolved') {
    //   return (
    //     <div className={css.App}>
    //       <SearchBar onSubmit={this.hendlerFormSubmit} />
    //       <ImageGallery data={array} clickModal={this.onOpenModal} />
    //       <Button loadMore={this.loadMore} />
    //       {showModal && (
    //         <Modal onClose={this.onCloseModal}>
    //           <img src={modalImgSrc} alt="" />
    //         </Modal>
    //       )}
    //     </div>
    //   );
    // }

    return (
      <div className={css.App}>
        <SearchBar onSubmit={this.hendlerFormSubmit} />
        {searchValue && (
          <ImageGallery data={array} clickModal={this.onOpenModal} />
        )}
        {array.length > 1 && <Button loadMore={this.loadMore} />}
        {showModal && (
          <Modal onClose={this.onCloseModal}>
            <img src={modalImgSrc} />
          </Modal>
        )}
        {status === 'pending' && <Loader />}
      </div>
    );
  }
}
