import React from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import * as COLOR from '../constants/colors';
import * as ICON from '../constants/icons';

// const Label = () => {
//   return <Text style={styles.tag}>@Label</Text>;
// };

// const Project = () => {
//   return <Text style={styles.tag}>#Project</Text>;
// };

// const Date = () => {
//   return <Text style={styles.tag}>Text</Text>;
// };

const MenuLabel = props => {
  const {isAdd, onAddLabel, str} = this.props;
  return (
    <TouchableWithoutFeedback>
      <Text>{str}</Text>
    </TouchableWithoutFeedback>
  );
};

const MenuProject = props => {
  const {isAdd, onAddProject, str} = this.props;
  return (
    <TouchableWithoutFeedback>
      <Text>{str}</Text>
    </TouchableWithoutFeedback>
  );
};

class TaskBottomPopUp_Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bottom: 0,
      currentPopUpY: 0,
      visible: false,
      task: {
        title: '',
        parentId: null,
        priorityType: 4,
        alarmId: null,
        projectId: '',
        time: new Date(),
      },
      label: [],
      statusInput: 0,
      selection: {
        start: 0,
        end: 0,
      },
      menuPopup: [],
    };
  }

  onShowPopup = () => {
    this.setState({
      ...this.state,
      bottom: -50,
      visible: true,
    });
  };

  onClosePopup = () => {
    this.setState({
      ...this.state,
      visible: false,
    });
  };

  onChangeText = text => {
    let str = '';
    const {selection} = this.state;
    const {labels, projects} = this.props;
    let menuPopup = [];

    for (var i = selection.start; i >= 0; i--) {
      if (i > 0) {
        if (text[i] === '#' && text[i - 1] === ' ') {
          str = text.substring(i + 1, selection.start + 1);
          if (str.length === 0) {
            menuPopup.push(...projects);
          } else {
            menuPopup.push(
              ...projects.filter(item => item.title.indexOf(str) === 0),
            );
            if (menuPopup.length === 0) {
              menuPopup.push({title: text, isProject: true});
            }
          }
          break;
        }
        if (text[i] === '@' && text[i - 1] === ' ') {
          str = text.substring(i + 1, selection.start + 1);
          if (str.length === 0) {
            menuPopup.push(...labels);
          } else {
            menuPopup.push(
              ...labels.filter(item => item.title.indexOf(str) === 0),
            );
            if (menuPopup.length === 0) {
              menuPopup.push({title: text, isProject: false});
            }
          }
          break;
        }
      } else {
        if (text[i] === '#') {
          str = text.substring(i + 1, selection.start + 1);
          if (str.length === 0) {
            menuPopup.push(...projects);
          } else {
            menuPopup.push(
              ...projects.filter(item => item.title.indexOf(str) === 0),
            );
            if (menuPopup.length === 0) {
              menuPopup.push({title: text, isProject: true});
            }
          }
          break;
        }
        if (text[i] === '@') {
          str = text.substring(i + 1, selection.start + 1);
          if (str.length === 0) {
            menuPopup.push(...labels);
          } else {
            menuPopup.push(
              ...labels.filter(item => item.title.indexOf(str) === 0),
            );
            if (menuPopup.length === 0) {
              menuPopup.push({title: text, isProject: false});
            }
          }
          break;
        }
      }
    }

    console.log(menuPopup);

    this.setState({
      ...this.state,
      task: {
        ...this.state.task,
        title: text,
      },
      menuPopup,
    });
  };

  render() {
    const {bottom, visible, task} = this.state;
    return (
      <Modal animationType="fade" visible={visible} transparent={true}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#000000AA',
            justifyContent: 'flex-end',
          }}>
          <TouchableWithoutFeedback onPress={this.onClosePopup}>
            <View style={{flex: 1, width: '100%'}} />
          </TouchableWithoutFeedback>
          <View style={[styles.container, {bottom: bottom}]}>
            <View>{/*To do */}</View>
            <View style={[styles.row, {alignItems: 'center'}]}>
              <TextInput
                value={task.title}
                autoFocus
                placeholder="@Label, #Project"
                onSelectionChange={({nativeEvent: {selection}}) => {
                  this.setState({...this.state, selection});
                }}
                onSubmitEditing={Keyboard.dismiss}
                onChangeText={text => this.onChangeText(text)}
              />
            </View>
            <View style={styles.row}>
              <View style={styles.wrap}>
                <Image
                  source={ICON.calendar}
                  style={[styles.icon, {tintColor: COLOR.green_dark}]}
                />
                <Text style={[styles.text, {color: COLOR.green_dark}]}>
                  Today
                </Text>
              </View>
              <View style={styles.wrap}>
                <Image
                  source={ICON.inbox}
                  style={[styles.icon, {tintColor: COLOR.blue_dark}]}
                />
                <Text style={styles.text}>Inbox</Text>
              </View>
            </View>
            <View
              style={[
                styles.row,
                {justifyContent: 'space-between', alignItems: 'center'},
              ]}>
              <View style={styles.row}>
                <Image
                  style={[styles.iconOption, {marginRight: 30}]}
                  source={ICON.label}
                />
                <Image
                  style={[styles.iconOption, {marginRight: 30}]}
                  source={ICON.flag}
                />
                <Image
                  style={[styles.iconOption, {marginRight: 30}]}
                  source={ICON.alarm}
                />
                <Image
                  style={[styles.iconOption, {marginRight: 30}]}
                  source={ICON.comment}
                />
              </View>
              <View style={[styles.row, styles.right]}>
                <Image
                  style={[styles.iconOption, {tintColor: COLOR.white}]}
                  source={ICON.send}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  container: {
    position: 'relative',
    width: '100%',
    height: 250,
    backgroundColor: COLOR.white,
    elevation: 4,
    borderRadius: 20,
    padding: 20,
  },
  menuPopup: {
    position: 'absolute',
    padding: 10,
    backgroundColor: COLOR.white,
    width: '70%',
    elevation: 3,
    bottom: '100%',
    left: 30,
  },
  wrap: {
    flexDirection: 'row',
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLOR.gray_light,
    marginRight: 20,
    justifyContent: 'center',
  },
  icon: {
    width: 20,
    height: 20,
  },
  text: {
    fontSize: 15,
    paddingLeft: 10,
  },
  iconOption: {
    width: 30,
    height: 30,
    tintColor: COLOR.gray_dark,
  },
  right: {
    backgroundColor: COLOR.red_light,
    borderRadius: 50,
    padding: 5,
  },
  tag: {backgroundColor: COLOR.pink_light, padding: 5},
});

const mapStateToProps = state => {
  return {
    labels: state.labels,
    projects: state.projects,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // To do
  };
};

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(TaskBottomPopUp_Add);
