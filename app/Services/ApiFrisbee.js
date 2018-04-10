/**
 * @providesModule ApiFrisbee
 */


import Frisbee from 'frisbee';
import axios from 'axios';
import AppConfig from 'AppConfig';


export const axi = (token) => {
  const api = axios.create({
    baseURL: AppConfig.API_URL,
    timeout: 5000,
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/vnd.github.v3+json',
      'X-request-token': token,
    },
  });
  return api;
}

const api = (token) => {

  const frisbeeObj = {
    baseURI: AppConfig.API_URL,
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/vnd.github.v3+json',
      'X-request-token': token,
    },
  };

  const api = new Frisbee(frisbeeObj);

  api.interceptor.register({
    request: function (path, options) {
      const opt = {
        body: options,
      };
      return [path, opt];
    },
    response: function (response) {
      const resp = {
        data: response.body,
      };
      return resp;
    },
  });
  return api;
};

export default api;