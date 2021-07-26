/* eslint-disable react-native/no-inline-styles */
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
} from 'react-native';
import * as labelAction from '../actions/labelAction';
import * as projectAction from '../actions/projectAction';
import colorType from '../constants/colorType';
import * as COLOR from '../constants/colors';
import * as ICON from '../constants/icons';

const Label = props => {
  const {item} = props;
  return <Text style={[styles.tag, {marginRight: 5}]}>@{item.title}</Text>;
};

const Project = props => {
  const {item} = props;
  return <Text style={[styles.tag, {marginRight: 5}]}>#{item.title}</Text>;
};

// const Date = () => {
//   return <Text style={styles.tag}>Text</Text>;
// };

const MenuLabel = props => {
  const {item, onChooseLabel} = props;
  const code = colorType.filter(i => item.colorType === i.id).code;
  return (
    <TouchableWithoutFeedback onPress={() => onChooseLabel(item.id)}>
      <View style={[styles.row, {padding: 10}]}>
        <Image source={ICON.label} style={[styles.icon, {tintColor: code}]} />
        <Text style={styles.text}>{item.title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const MenuProject = props => {
  const {item, onChooseProject} = props;
  const code = colorType.filter(i => item.colorType === i.id).code;
  return (
    <TouchableWithoutFeedback onPress={() => onChooseProject(item.id)}>
      <View style={[styles.row, {padding: 10}]}>
        <Image source={ICON.dot} style={[styles.icon, {tintColor: code}]} />
        <Text style={styles.text}>{item.title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const MenuAddLabel = props => {
  const {item, onAddLabel} = props;
  return (
    <TouchableWithoutFeedback onPress={() => onAddLabel(item.title)}>
      <View style={[styles.row, {padding: 10}]}>
        <Text>Add new </Text>
        <Image
          source={ICON.label}
          style={[styles.icon, {tintColor: COLOR.gray_dark}]}
        />
        <Text style={styles.text}>{item.title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const MenuAddProject = props => {
  const {item, onAddProject} = props;
  return (
    <TouchableWithoutFeedback onPress={() => onAddProject(item.title)}>
      <View style={[styles.row, {padding: 10}]}>
        <Text>Add new </Text>
        <Image
          source={ICON.dot}
          style={[styles.icon, {tintColor: COLOR.gray_dark}]}
        />
        <Text style={styles.text}>{item.title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const init = {
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
  labelIds: [],
  menuPopup: [],
};

class TaskBottomPopUp_Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = init;
    this.selection = {
      start: 0,
      end: 0,
    };
  }

  onShowPopup = () => {
    this.setState({
      ...this.state,
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
    const {labelIds} = this.state;
    const {selection} = this;
    const {labels, projects} = this.props;
    let menuPopup = [];

    for (var i = selection.start; i >= 0; i--) {
      if (i > 0) {
        if (text[i] === '#' && text[i - 1] === ' ') {
          str = text.substring(i + 1, selection.start + 1).trim();
          if (str.length === 0) {
            menuPopup.push(
              ...projects.filter(item => item.id !== this.state.task.projectId),
            );
          } else {
            menuPopup.push(
              ...projects.filter(
                item =>
                  item.title.indexOf(str) === 0 &&
                  item.id !== this.state.task.projectId,
              ),
            );
            if (menuPopup.length === 0) {
              menuPopup.push({title: str, isLabel: false});
            }
          }
          break;
        }
        if (text[i] === '@' && text[i - 1] === ' ') {
          str = text.substring(i + 1, selection.start + 1).trim();
          if (str.length === 0) {
            menuPopup.push(
              ...labels.filter(item => !labelIds.find(k => k === item.id)),
            );
          } else {
            menuPopup.push(
              ...labels.filter(
                item =>
                  item.title.indexOf(str) === 0 &&
                  !labelIds.find(k => k === item.id),
              ),
            );
            if (menuPopup.length === 0) {
              menuPopup.push({title: str, isLabel: true});
            }
          }
          break;
        }
      } else {
        if (text[i] === '#') {
          str = text.substring(i + 1, selection.start + 1).trim();
          if (str.length === 0) {
            menuPopup.push(
              ...projects.filter(item => item.id !== this.state.task.projectId),
            );
          } else {
            menuPopup.push(
              ...projects.filter(
                item =>
                  item.title.indexOf(str) === 0 &&
                  item.id !== this.state.task.projectId,
              ),
            );
            if (menuPopup.length === 0) {
              menuPopup.push({title: str, isLabel: false});
            }
          }
          break;
        }
        if (text[i] === '@') {
          str = text.substring(i + 1, selection.start + 1).trim();
          if (str.length === 0) {
            menuPopup.push(
              ...labels.filter(item => !labelIds.find(k => k === item.id)),
            );
          } else {
            menuPopup.push(
              ...labels.filter(
                item =>
                  item.title.indexOf(str) === 0 &&
                  !labelIds.find(k => k === item.id),
              ),
            );
            if (menuPopup.length === 0) {
              menuPopup.push({title: str, isLabel: true});
            }
          }
          break;
        }
      }
    }

    this.setState({
      ...this.state,
      task: {
        ...this.state.task,
        title: text,
      },
      menuPopup,
    });
  };

  onKeyPress = nativeEvent => {
    const {selection} = this;
    let {task, labelIds} = this.state;

    if (selection.start === 0 && nativeEvent.key === 'Backspace') {
      if (labelIds.length > 0) {
        labelIds.pop();
        this.setState({
          ...this.state,
          labelIds,
        });
      } else if (task.projectId.length) {
        this.setState({
          ...this.state,
          task: {
            ...task,
            projectId: '',
          },
        });
      } else {
        return;
      }
    }
  };

  onChooseProject = id => {
    this.setState({
      ...this.state,
      task: {
        ...this.state.task,
        projectId: id,
      },
      menuPopup: [],
    });
  };

  onChooseLabel = id => {
    this.setState({
      ...this.state,
      labelIds: [...this.state.labelIds, id],
      menuPopup: [],
    });
  };

  onAddLabel = async title => {
    let id = new Date().getTime().toString();
    await this.props.onSaveLabel({
      id,
      title,
      colorType: 1,
      favorite: false,
    });
    await this.props.onLoadLabel();
    this.onChooseLabel(id);
  };

  onAddProject = async title => {
    let id = new Date().getTime().toString();
    await this.props.onSaveProject({
      id,
      title,
      parentId: null,
      viewType: 1,
      colorType: 1,
      favorite: false,
    });
    await this.props.onLoadProject();
    this.onChooseProject(id);
  };

  render() {
    const {visible, task, menuPopup, labelIds} = this.state;
    const {labels, projects} = this.props;
    return (
      <Modal animationType="fade" visible={visible} transparent={true}>
        <View style={styles.root}>
          <TouchableWithoutFeedback onPress={this.onClosePopup}>
            <View
              style={{
                flex: 1,
                width: '100%',
              }}
            />
          </TouchableWithoutFeedback>
          <View style={[styles.container]}>
            <View style={[styles.menuPopup]}>
              {menuPopup.map((item, index) => {
                if (item.isLabel === undefined) {
                  if (item.viewType === undefined) {
                    return (
                      <MenuLabel
                        item={item}
                        key={index}
                        onChooseLabel={this.onChooseLabel}
                      />
                    );
                  } else {
                    return (
                      <MenuProject
                        item={item}
                        key={index}
                        onChooseProject={this.onChooseProject}
                      />
                    );
                  }
                } else {
                  if (item.isLabel) {
                    return (
                      <MenuAddLabel
                        item={item}
                        key={index}
                        onAddLabel={this.onAddLabel}
                      />
                    );
                  } else {
                    return (
                      <MenuAddProject
                        item={item}
                        key={index}
                        onAddProject={this.onAddProject}
                      />
                    );
                  }
                }
              })}
            </View>
            <View style={[styles.row, {alignItems: 'center'}]}>
              {task.projectId.length > 0 && (
                <Project
                  item={projects.find(item => item.id === task.projectId)}
                />
              )}
              {labelIds.map((item, index) => (
                <Label item={labels.find(i => i.id === item)} key={index} />
              ))}
              <TextInput
                style={styles.textInput}
                value={task.title}
                autoFocus
                placeholder="@Label, #Project"
                onKeyPress={({nativeEvent}) => this.onKeyPress(nativeEvent)}
                onSelectionChange={({nativeEvent: {selection}}) => {
                  this.selection = selection;
                }}
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
                {
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 10,
                },
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
  root: {
    flex: 1,
    backgroundColor: '#000000AA',
    justifyContent: 'flex-end',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  container: {
    position: 'relative',
    width: '100%',
    backgroundColor: COLOR.white,
    elevation: 4,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  menuPopup: {
    position: 'absolute',
    width: '70%',
    elevation: 3,
    backgroundColor: COLOR.white,
    bottom: '110%',
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
  textInput: {
    minWidth: '30%',
    maxWidth: '100%',
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
    onSaveLabel: label => {
      return dispatch(labelAction.insert(label));
    },
    onSaveProject: project => {
      return dispatch(projectAction.insert(project));
    },
    onLoadLabel: labelAction.queryAll(dispatch),
    onLoadProject: projectAction.queryAll(dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(TaskBottomPopUp_Add);
