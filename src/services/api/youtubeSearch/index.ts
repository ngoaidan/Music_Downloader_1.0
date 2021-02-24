import axios from 'axios'

var ROOT_URL = 'https://www.googleapis.com/youtube/v3/search';

const YTSearch = (options, callback) => {
  if (!options.key) {
    throw new Error('Youtube Search expected key, received undefined');
  }

  var params = {
    part: 'snippet',
    key: options.key,
    q: options.term,
    type: 'video'
  };

  axios.get(ROOT_URL, { params: params })
    .then(function(response) {
      if (callback) { callback(response.data.items); }
    })
    .catch(function(error) {
      callback("error");
    });
};

export default YTSearch
