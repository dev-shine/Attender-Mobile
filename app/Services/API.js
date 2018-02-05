/**
 * @providesModule API
 */

import AppConfig from 'AppConfig';
import ZHelper from 'ZHelper';
import Sha1 from '../Helper/Sha1';
var moment = require('moment');
var { NativeModules } = require('react-native');
import { Platform } from "react-native";

var API = {

  REQUEST_TOKEN: '',

  get(url, param){
    return fetch(AppConfig.API_URL + url + (param ? '?' + ZHelper.createParam(param) : ''), {
      method: 'GET',
      headers: {
        'Content-Type':'application/x-www-form-urlencoded',
        'X-request-token': this.REQUEST_TOKEN || ''
      }
    })
    .then((response) => {
      return response.json()
    })
    // .then((responseJson) => {
    //   console.log('RESPONSE GET', responseJson);
    //   return responseJson;
    // })
    .catch((error) => {
      console.log(error);
    });
  },

  post(url, param){
    console.log(AppConfig.API_URL + url, ZHelper.createParam(param));
    return fetch(AppConfig.API_URL + url, {
      method: 'POST',
      headers: {
        'Content-Type':'application/x-www-form-urlencoded',
        'X-request-token': this.REQUEST_TOKEN || ''
      },
      body: ZHelper.createParam(param)
    })
    .then((response) => {
      return response.json()
    })
    // .then((responseJson) => {
    //   console.log('RESPONSE POST', responseJson);
    //   return responseJson;
    // })
    .catch((error) => {
      console.log(error);
    });
  },

  uploadImage(fileData, folder, successCb, errorCb) {
    var timestamp = moment(moment(new Date()).unix()*1000).format('X');
    var keys = 'folder=' + folder + '&public_id=' + timestamp.toString() +'&timestamp=' + timestamp.toString() + AppConfig.CLOUDINARY_SECRET;
    var signature = Sha1.hash(keys);

    obj = {
        uri: fileData.uri,
        uploadUrl: AppConfig.CLOUDINARY_UPLOAD_URL + "image/upload",
        data: {
          public_id: timestamp.toString(),
          folder: folder,
          timestamp: timestamp,
          api_key: AppConfig.CLOUDINARY_KEY,
          signature: signature
        }
    };

    if (Platform.OS == 'ios') {
      NativeModules.FileTransfer.upload(obj, (err, res) => {
        if(res.status){
          successCb(JSON.parse(res.data));
        }
        if(err){
          errorCb(err);
        }
      });
    } else {
      //android
      const formdata = new FormData();
      formdata.append('file', {uri: fileData.uri, type: fileData.type, name: fileData.fileName});
      formdata.append('public_id', timestamp.toString());
      formdata.append('folder', folder);
      formdata.append('timestamp', timestamp);
      formdata.append('api_key', AppConfig.CLOUDINARY_KEY);
      formdata.append('signature', signature);

      fetch(AppConfig.CLOUDINARY_UPLOAD_URL + "image/upload", {
        method: 'POST',
        body: formdata
      })
      .then((response) => {
        return response.json()
      })
      .then((responseJson) => {
        successCb(responseJson);
      })
      .catch((error) => {
        errorCb(error);
      });
    }

  }

};

module.exports = API;
