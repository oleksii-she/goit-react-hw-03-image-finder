import React, { Component } from 'react';

import { SearchBar } from './form/formSearch';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './modal/modal';
import { pixabayApi } from './api';
import { Watch } from 'react-loader-spinner';

export class App extends Component {
  state = {
    array: [],
    searchValue: '',
    modalImgSrc: '',
    isLoading: false,
    showModal: false,
    error: '',
    page: 1,
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
    const { searchValue, array, isLoading, showModal, modalImgSrc, page } =
      this.state;
    console.log(array);
    return (
      <div>
        <SearchBar onSubmit={this.hendlerFormSubmit} />
        {searchValue && (
          <ImageGallery data={array} clickModal={this.onOpenModal} />
        )}
        {<button onClick={this.loadMore}>Load more</button>}

        {showModal && (
          <Modal onClose={this.onCloseModal}>
            <img src={modalImgSrc} alt="" />
          </Modal>
        )}

        <Watch
          height="80"
          width="80"
          radius="48"
          color="#4fa94d"
          ariaLabel="watch-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={isLoading}
        />
      </div>
    );
  }
}
