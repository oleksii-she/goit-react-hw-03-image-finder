import React, { Component } from 'react';

import { SearchBar } from './form/formSearch';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './modal/modal';
import { pixabayApi } from './api';
import { Watch } from 'react-loader-spinner';
console.log(pixabayApi);
export class App extends Component {
  state = {
    array: [],
    searchValue: '',
    modalImgSrc: '',
    isLoading: false,
    showModal: false,
    error: '',
  };

  async componentDidMount() {
    try {
      this.setState({ isLoading: true });
      const arrayObj = await pixabayApi(this.state.searchValue);
      this.setState({ array: arrayObj });
    } catch (error) {
      this.setState({
        error:
          'Sorry, we are currently undergoing technical work, try to reload the page or use our service later. Thank you for being with us!',
      });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchValue !== this.state.searchValue) {
      this.componentDidMount();
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
  hendlerFormSubmit = searchValue => {
    this.setState({ searchValue: searchValue });
  };

  render() {
    const { searchValue, array, isLoading, showModal, modalImgSrc } =
      this.state;
    console.log(modalImgSrc);
    return (
      <div>
        <SearchBar onSubmit={this.hendlerFormSubmit} />
        {searchValue && (
          <ImageGallery data={array} clickModal={this.onOpenModal} />
        )}
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
