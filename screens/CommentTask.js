/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Text,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
  AsyncStorage,
} from 'react-native';
import FilePickerManager from 'react-native-file-picker';
import {launchCamera} from 'react-native-image-picker';
import {TouchableRipple} from 'react-native-paper';
import CommentTopbar from '../components/CommentTopbar';
import * as ICON from '../constants/icons';
import * as COLOR from '../constants/colors';
import {ATTACH_TYPE} from '../constants/others';
import * as commentTaskAction from '../actions/commentTaskAction';

const ItemComment = props => {
  return (
    <View style={[styles.comment, styles.row]}>
      <View style={styles.row}>
        <View style={styles.wrap_img}>
          <Image style={styles.img} source={ICON.dot} />
        </View>
        <View style={{marginLeft: 10}}>
          <View style={styles.row}>
            <View style={styles.row}>
              <Text style={styles.name}>Nguyễn Thanh Nhật</Text>
              <Text style={styles.time}>5 Jul, 18:30</Text>
            </View>
          </View>
          <Text style={styles.title}>Hello world</Text>
          <View style={[styles.row, styles.wrap_reaction]}>
            <View style={[styles.row, styles.item_reaction]}>
              <Image style={styles.img_reaction} source={ICON.dot} />
              <Text style={styles.text_reaction}>1</Text>
            </View>
            <View style={[styles.row, styles.item_reaction]}>
              <Image style={styles.img_reaction} source={ICON.add} />
            </View>
          </View>
        </View>
      </View>
      <Image style={styles.icon} source={ICON.option} />
    </View>
  );
};

class CommentTask extends React.Component {
  constructor(props) {
    super(props);
    const {params} = this.props.route;
    this.state = {
      comment: {
        taskId: params.id,
        content: '',
        commentAccountId: '',
        fileType: ATTACH_TYPE.NONE,
        fileLink: '',
      },
      isShowModal: false,
    };
    this._retrieveData();
  }

  _retrieveData = async () => {
    const id = await AsyncStorage.getItem('id');
    this.setState({
      ...this.state,
      comment: {
        ...this.state.comment,
        commentAccountId: id,
      },
    });
  };

  onExit = () => {
    this.props.navigation.goBack();
  };

  onChangeContent = text => {
    this.setState({
      ...this.state,
      comment: {
        ...this.state.comment,
        content: text,
      },
    });
  };

  onChooseFile = async () => {
    FilePickerManager.showFilePicker(null, response => {
      if (response.didCancel) {
        console.log('User cancelled file picker');
      } else if (response.error) {
        console.log('FilePickerManager Error: ', response.error);
      } else {
        this.setState({
          ...this.state,
          comment: {
            ...this.state.comment,
            fileLink: 'file://' + response.path,
            fileType:
              response.type.indexOf('image') >= 0
                ? ATTACH_TYPE.IMAGE
                : ATTACH_TYPE.FILE,
          },
        });
      }
    });
    this.onCloseModal();
  };

  onChooseImage = async () => {
    const options = {};
    launchCamera(options, response => {
      this.setState({
        ...this.state,
        comment: {
          ...this.state.comment,
          fileType: ATTACH_TYPE.IMAGE,
          fileLink: response.assets[0].uri,
        },
      });
    });
    this.onCloseModal();
  };

  onShowModal = () => {
    this.setState({
      ...this.state,
      isShowModal: true,
    });
  };

  onCloseModal = () => {
    this.setState({
      ...this.state,
      isShowModal: false,
    });
  };

  onSaveCommentTask = async () => {
    const {onSaveCommentTask, onLoadCommentTask} = this.props;
    const commentTask = {
      id: `${new Date()}`,
      ...this.state.comment,
      time: new Date(),
    };
    await onSaveCommentTask(commentTask);
    await onLoadCommentTask();
  };

  render() {
    const {route, commentTasks} = this.props;
    const {comment, isShowModal} = this.state;
    const {content, fileLink, fileType} = comment;

    return (
      <View style={styles.container}>
        <CommentTopbar task={route.params} onExit={this.onExit} />
        <Modal animationType="slide" transparent={true} visible={isShowModal}>
          <TouchableWithoutFeedback onPress={() => this.onCloseModal()}>
            <View style={styles.centerView}>
              <View style={styles.modalView}>
                <TouchableRipple onPress={() => this.onChooseFile()}>
                  <View style={[styles.row, {padding: 20}]}>
                    <Image
                      style={[
                        styles.img,
                        {tintColor: COLOR.gray_dark, marginRight: 10},
                      ]}
                      source={ICON.file}
                    />
                    <Text style={styles.text}>File</Text>
                  </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => this.onChooseImage()}>
                  <View style={[styles.row, {padding: 20}]}>
                    <Image
                      style={[
                        styles.img,
                        {tintColor: COLOR.gray_dark, marginRight: 10},
                      ]}
                      source={ICON.camera}
                    />
                    <Text style={styles.text}>Take a photo</Text>
                  </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => {}}>
                  <View style={[styles.row, {padding: 20}]}>
                    <Image
                      style={[
                        styles.img,
                        {tintColor: COLOR.gray_dark, marginRight: 10},
                      ]}
                      source={ICON.record}
                    />
                    <Text style={styles.text}>Record audio</Text>
                  </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => {}}>
                  <View style={[styles.row, {padding: 20}]}>
                    <Image
                      style={[
                        styles.img,
                        {tintColor: COLOR.gray_dark, marginRight: 10},
                      ]}
                      source={ICON.drive}
                    />
                    <Text style={styles.text}>Google Drive</Text>
                  </View>
                </TouchableRipple>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        <ScrollView>
          {commentTasks.map((item, index) => (
            <ItemComment comment={item} key={index} />
          ))}
        </ScrollView>
        {fileLink ? (
          <TouchableWithoutFeedback
            onPress={() =>
              this.setState({
                ...this.state,
                comment: {
                  ...this.state.comment,
                  fileType: ATTACH_TYPE.NONE,
                  fileLink: '',
                },
              })
            }>
            <View style={styles.file}>
              <Image
                style={styles.imgFile}
                source={
                  fileType === ATTACH_TYPE.FILE
                    ? ICON.file
                    : {
                        uri: fileLink,
                      }
                }
              />
            </View>
          </TouchableWithoutFeedback>
        ) : (
          <View />
        )}

        <View style={[styles.row, styles.form]}>
          <TextInput style={styles.input} onChangeText={this.onChangeContent} />
          {content.length === 0 && fileLink.length === 0 ? (
            <TouchableRipple onPress={() => this.onShowModal()}>
              <Image source={ICON.attach} style={[styles.img, styles.attach]} />
            </TouchableRipple>
          ) : (
            <TouchableRipple onPress={() => this.onSaveCommentTask()}>
              <Image source={ICON.send} style={[styles.img, styles.send]} />
            </TouchableRipple>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  comment: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.gray_light,
    justifyContent: 'space-between',
  },
  centerView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000AA',
  },
  modalView: {
    margin: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    elevation: 5,
  },
  wrap_img: {
    borderRadius: 50,
  },
  img: {
    width: 40,
    height: 40,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  time: {
    color: COLOR.gray_dark,
    fontSize: 15,
    alignSelf: 'center',
  },
  title: {
    color: COLOR.black,
    fontSize: 20,
  },
  icon: {
    width: 20,
    height: 20,
  },
  text: {
    fontSize: 30,
    color: COLOR.gray_dark,
  },
  wrap_reaction: {
    marginTop: 10,
  },
  item_reaction: {
    padding: 5,
    marginRight: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLOR.black,
  },
  text_reaction: {
    fontSize: 15,
  },
  img_reaction: {
    width: 20,
    height: 20,
  },
  form: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: COLOR.gray_light,
  },
  input: {
    padding: 10,
    fontSize: 20,
    minWidth: '80%',
  },
  attach: {
    tintColor: COLOR.gray_dark,
  },
  send: {
    backgroundColor: COLOR.red_light,
    tintColor: COLOR.white,
    borderRadius: 50,
    padding: 5,
  },
  file: {
    position: 'absolute',
    bottom: 60,
    elevation: 4,
  },
  imgFile: {
    minWidth: 60,
    minHeight: 60,
  },
});

const mapStateToProps = state => {
  return {
    commentTasks: state.commentTasks,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSaveCommentTask: commentTask =>
      dispatch(commentTaskAction.insert(commentTask)),
    onLoadCommentTask: commentTaskAction.queryAll(dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentTask);
