// /**
//  * @providesModule Realm
//  */
//
// // const Realm = require('realm');
//
// var RealmSchema = {
//
//   User: {
//     name: 'User',
//     primaryKey: 'id',
//     properties: {
//       id: {type: 'int', default: 0},
//       fullname: 'string',
//       email: 'string',
//       facebook_id: null,
//       google_id: null,
//       instagram_id: null,
//       is_social_login: 'bool',
//       is_staff: 'bool',
//       staff_id: 'int',
//       is_owner: 'bool',
//       owner_id: null,
//       is_admin: 'bool',
//       admin_id: null,
//       avatar: null,
//       is_active: 'bool',
//       verified: 'int',
//       email_token: 'string',
//       created_at: 'string',
//       updated_at: 'string'
//     }
//   },
//
//   createSchema(res){
//     console.log('DATA PARAMS', res);
//     Realm.open({schema: [this.User]})
//     .then(realm => {
//       // Create Realm objects and write to local storage
//       realm.write(() => {
//         const myCar = realm.create('User', {
//           id: res.data.id,
//           fullname: res.data.fullname.toString(),
//           email: res.data.email.toString(),
//           facebook_id: res.data.facebook_id,
//           google_id: res.data.google_id,
//           instagram_id: res.data.instagram_id,
//           is_social_login: res.data.is_social_login,
//           is_staff: res.data.is_staff,
//           staff_id: res.data.staff_id,
//           is_owner: res.data.is_owner,
//           owner_id: res.data.owner_id,
//           is_admin: res.data.is_admin,
//           admin_id: res.data.admin_id,
//           avatar: res.data.avatar,
//           is_active: res.data.is_active,
//           verified: res.data.verified,
//           email_token: res.data.email_token.toString(),
//           created_at: res.data.created_at.toString(),
//           updated_at: res.data.updated_at.toString()
//         });
//       });
//     })
//     .catch(error => {
//       console.log('Error', error);
//     });
//   },
//
//   getUser(){
//     Realm.open({schema: [this.User]})
//     .then(realm => {
//       return realm.objects('User')
//     })
//     .catch(error => {
//       return error
//     });
//   }
//
// };
//
// module.exports = RealmSchema;
