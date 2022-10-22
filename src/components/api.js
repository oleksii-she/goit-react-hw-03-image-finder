import axios, { Axios } from 'axios';

export const pixabayApi = async (searchValue, page) => {
  const responce = await axios.get('https://pixabay.com/api/', {
    params: {
      key: '29401680-f540f076c98bade948db8a4a4',
      q: searchValue,
      per_page: 12,
      page: page,
    },
  });

  return responce.data.hits;
};

// export const fetchBreeds = async () => {
//   const response = await axios.get('/breeds');
//   return response.data;
// };

// export const fetchDogByBreed = async (breedId) => {
//   const response = await axios.get('/images/search', {
//     params: { breed_id: breedId },
//   });
//   return response.data[0];
// };
