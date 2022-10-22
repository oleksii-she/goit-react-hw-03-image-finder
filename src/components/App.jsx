import React, { Component } from 'react';

import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './modal/modal';
import { pixabayApi } from './api';
import { ThreeDots } from 'react-loader-spinner';
import { Button } from './loadMore/button';
import css from './app.module.css';
export class App extends Component {
  state = {
    array: [],
    searchValue: '',
    modalImgSrc: '',
    isLoading: false,
    showModal: false,
    error: '',
    page: 1,
    status: '',
  };

  // async componentDidMount() {

  // }

  async componentDidUpdate(prevProps, prevState) {
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
            };
          });
        }
      } catch (error) {
        this.setState({
          error:
            'Sorry, we are currently undergoing technical work, try to reload the page or use our service later. Thank you for being with us!',
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
    }));
  };

  render() {
    const { searchValue, array, isLoading, showModal, modalImgSrc } =
      this.state;

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

        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#3f51b5"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={isLoading}
        />
      </div>
    );
  }
}

// pending idle' rejected resolved
