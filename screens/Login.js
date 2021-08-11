/* eslint-disable no-shadow */
import React from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Platform,
  PermissionsAndroid,
  AsyncStorage,
} from 'react-native';
import {Button} from 'react-native-elements';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import RNFetchBlob from 'rn-fetch-blob';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import {EJSON} from 'bson';
import * as accountApi from '../api/accountApi';
import * as COLOR from '../constants/colors';
import * as ICON from '../constants/icons';
import * as IMAGE from '../constants/images';
import * as accountAction from '../actions/accountAction';

GoogleSignin.configure({
  webClientId:
    '1059667390919-rn5mjeq30qq68dhbs1gmv8re7qmoqs95.apps.googleusercontent.com',
  offlineAccess: true,
});
class Login extends React.Component {
  constructor(props) {
    super(props);
  }
  signInByGg = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  checkPermission = async url => {
    if (Platform.OS === 'ios') {
      this.downloadImage(url);
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'App needs access to your storage to download Photos',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Storage Permission Granted.');
          this.downloadImage(url);
        }
      } catch (error) {
        console.warn(error);
      }
    }
  };

  downloadImage = url => {
    let date = new Date();
    let ext = this.getExtention(url);
    ext = '.' + ext[0];
    const {config, fs} = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
    };

    config(options)
      .fetch('GET', url)
      .then(res => {
        console.log('Download success');
      });
  };

  getExtention = url => {
    return /[.]/.exec(url) ? /[^.]+$/.exec(url) : undefined;
  };

  loadData = id => {
    // Todo
  };

  saveInfo = info => {
    AsyncStorage.multiSet([
      ['id', info.id],
      ['name', info.name],
      ['type', info.type],
      ['avatar', info.avatar],
    ]);
    this.props.navigation.navigate('Home');
  };

  signInByFb = () => {
    LoginManager.logInWithPermissions(['public_profile']).then(
      result => {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            const {accessToken} = data;
            fetch(
              'https://graph.facebook.com/v2.5/me?fields=id,name,picture&access_token=' +
                accessToken,
            )
              .then(response => response.json())
              .then(async json => {
                let info = {
                  id: `${json.id}`,
                  type: '2',
                  name: json.name,
                  avatar: json.picture.data.url,
                };

                await this.props.saveAccount({
                  ...info,
                  type: 2,
                });

                const getCallBack = result => {
                  const account = EJSON.parse(EJSON.stringify(result));
                  if (account == null) return;
                  if (account.length == 0) {
                    const insertCallBack = data => {
                      if (data) {
                        this.saveInfo(info);
                      }
                    };
                    accountApi.insert(insertCallBack, info);
                  } else {
                    this.saveInfo(info);
                  }
                };
                accountApi.get(getCallBack, {id: info.id});
              })
              .catch(() => {
                console.log('Fetch data error');
              });
          });
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  _retrieveData = async () => {
    const result = await AsyncStorage.getItem('id');
    return result;
  };

  render() {
    this._retrieveData()
      .then(result => {
        if (result) this.props.navigation.navigate('Home');
      })
      .catch(err => {
        console.log(err);
      });
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={IMAGE.todoist} />
        <Text style={styles.welcome}>Welcome to Todoist</Text>
        <Image style={styles.image} source={IMAGE.login} />
        <Button
          icon={
            <Image
              source={ICON.envelope}
              style={[styles.iconButton, {tintColor: COLOR.white}]}
            />
          }
          onPress={this.signInByGg}
          titleStyle={styles.titleStyleBtnEmail}
          buttonStyle={styles.buttonStyleBtnEmail}
          title="CONTINUE WITH EMAIL"
        />
        <Button
          onPress={this.signInByGg}
          icon={<Image source={ICON.gmail} style={styles.iconButton} />}
          titleStyle={styles.titleStyleBtnGmail}
          buttonStyle={styles.buttonStyleBtnGmail}
          title="CONTINUE WITH GOOGLE"
        />
        <View style={styles.wrapFbIp}>
          <Button
            onPress={() =>
              this.checkPermission(
                'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2714198885538731&height=50&width=50&ext=1628842923&hash=AeSsqerLlZ_ZiymxJeY',
              )
            }
            icon={<Image source={ICON.apple} style={styles.iconButton} />}
            titleStyle={styles.titleStyleBtnFbIp}
            buttonStyle={[styles.buttonStyleBtnFbIp, styles.buttonStyleIp]}
          />
          <Button
            onPress={this.signInByFb}
            icon={<Image source={ICON.facebook} style={styles.iconButton} />}
            titleStyle={styles.titleStyleBtnFbIp}
            buttonStyle={[styles.buttonStyleBtnFbIp, styles.buttonStyleFb]}
          />
        </View>
        <Text style={styles.policyText}>
          By continuing you agree to Todoist's{' '}
          <Text style={{textDecorationLine: 'underline'}}>
            Terms of service
          </Text>{' '}
          and{' '}
          <Text style={{textDecorationLine: 'underline'}}>Privacy Policy.</Text>
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    backgroundColor: COLOR.white,
  },
  logo: {
    width: 50,
    height: 50,
    alignSelf: 'center',
    resizeMode: 'cover',
  },
  welcome: {
    textAlign: 'center',
    fontSize: 25,
    color: COLOR.black,
  },
  image: {
    width: 300,
    height: 300,
    alignSelf: 'center',
    resizeMode: 'cover',
  },
  titleStyleBtnEmail: {
    fontSize: 18,
  },
  buttonStyleBtnEmail: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: COLOR.red_light,
  },
  titleStyleBtnGmail: {
    fontSize: 18,
    color: COLOR.black,
  },
  buttonStyleBtnGmail: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: COLOR.white,
    borderColor: COLOR.gray_light,
    borderWidth: 1,
  },
  wrapFbIp: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
  },
  titleStyleBtnFbIp: {
    fontSize: 15,
    color: COLOR.black,
  },
  buttonStyleBtnFbIp: {
    padding: 15,
    width: '95%',
    backgroundColor: COLOR.white,
    borderRadius: 5,
    borderColor: COLOR.gray_light,
    borderWidth: 1,
  },
  buttonStyleFb: {
    alignSelf: 'flex-end',
  },
  buttonStyleIp: {
    alignSelf: 'flex-start',
  },
  policyText: {
    fontSize: 13,
    color: COLOR.gray_dark,
    textAlign: 'center',
  },
  iconButton: {
    width: 20,
    height: 20,
    marginRight: 10,
    resizeMode: 'cover',
  },
});

const mapStateToProps = state => {
  return {
    // Todo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveAccount: account => dispatch(accountAction.insert(account)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
