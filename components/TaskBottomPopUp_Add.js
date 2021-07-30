/* eslint-disable react-native/no-inline-styles */
import React, {createRef} from 'react';
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
import DateTimePicker from '@react-native-community/datetimepicker';
import {TouchableRipple} from 'react-native-paper';
import * as labelAction from '../actions/labelAction';
import * as projectAction from '../actions/projectAction';
import colorType from '../constants/colorType';
import * as COLOR from '../constants/colors';
import * as ICON from '../constants/icons';
import {priorities} from '../constants/others';
import TimeChooseBottomPopup from './TimeChooseBottomPopup';

const TYPE_LABEL = 0;
const TYPE_PROJECT = 1;
const TYPE_PRIORITY = 2;

const Label = props => {
  const {item} = props;
  return <Text style={[styles.tag, {marginRight: 5}]}>@{item.title}</Text>;
};

const Project = props => {
  const {item} = props;
  return <Text style={[styles.tag, {marginRight: 5}]}>#{item.title}</Text>;
};

const MenuPriority = props => {
  const {onChangePriority} = props;
  return (
    <View>
      {priorities.map(item => (
        <TouchableWithoutFeedback
          key={item.id}
          onPress={() => onChangePriority(item.id)}>
          <View style={[styles.row, {padding: 10}]}>
            <Image
              source={ICON.label}
              style={[styles.icon, {tintColor: item.color}]}
            />
            <Text style={styles.text}>Priority {item.id}</Text>
          </View>
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
};

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
  console.log(item);
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
    alarm: null,
    projectId: '',
    time: new Date(),
  },
  labelIds: [],
  menuPopup: {},
  isShowPicker: false,
};

class TaskBottomPopUp_Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = init;
    this.selection = {
      start: 0,
      end: 0,
    };
    this.dateChooseRef = createRef();
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
    let menuPopup = {};

    for (var i = selection.start; i >= 0; i--) {
      if (i > 0) {
        if (text[i] === '#' && text[i - 1] === ' ') {
          str = text.substring(i + 1, selection.start + 1).trim();
          if (str.length === 0) {
            menuPopup = {
              type: TYPE_PROJECT,
              isAdd: false,
              data: projects.filter(
                item => item.id !== this.state.task.projectId,
              ),
            };
          } else {
            menuPopup = {
              type: TYPE_PROJECT,
              isAdd: false,
              data: projects.filter(
                item =>
                  item.title.indexOf(str) === 0 &&
                  item.id !== this.state.task.projectId,
              ),
            };
            if (menuPopup.data.length === 0) {
              menuPopup = {
                type: TYPE_PROJECT,
                isAdd: true,
                data: [{title: str}],
              };
            }
          }
          break;
        }
        if (text[i] === '@' && text[i - 1] === ' ') {
          str = text.substring(i + 1, selection.start + 1).trim();
          if (str.length === 0) {
            menuPopup = {
              type: TYPE_LABEL,
              isAdd: false,
              data: labels.filter(item => !labelIds.find(k => k === item.id)),
            };
          } else {
            menuPopup = {
              type: TYPE_LABEL,
              isAdd: false,
              data: labels.filter(
                item =>
                  item.title.indexOf(str) === 0 &&
                  !labelIds.find(k => k === item.id),
              ),
            };
            if (menuPopup.data.length === 0) {
              menuPopup = {
                type: TYPE_LABEL,
                isAdd: true,
                data: [{title: str}],
              };
            }
          }
          break;
        }
      } else {
        if (text[i] === '#') {
          str = text.substring(i + 1, selection.start + 1).trim();
          if (str.length === 0) {
            menuPopup = {
              type: TYPE_PROJECT,
              isAdd: false,
              data: projects.filter(
                item => item.id !== this.state.task.projectId,
              ),
            };
          } else {
            menuPopup = {
              type: TYPE_PROJECT,
              isAdd: false,
              data: projects.filter(
                item =>
                  item.title.indexOf(str) === 0 &&
                  item.id !== this.state.task.projectId,
              ),
            };
            if (menuPopup.data.length === 0) {
              menuPopup = {
                type: TYPE_PROJECT,
                isAdd: true,
                data: [{title: str}],
              };
            }
          }
          break;
        }
        if (text[i] === '@') {
          str = text.substring(i + 1, selection.start + 1).trim();
          if (str.length === 0) {
            menuPopup = {
              type: TYPE_LABEL,
              isAdd: false,
              data: labels.filter(item => !labelIds.find(k => k === item.id)),
            };
          } else {
            menuPopup = {
              type: TYPE_LABEL,
              isAdd: false,
              data: labels.filter(
                item =>
                  item.title.indexOf(str) === 0 &&
                  !labelIds.find(k => k === item.id),
              ),
            };
            if (menuPopup.data.length === 0) {
              menuPopup = {
                type: TYPE_LABEL,
                isAdd: true,
                data: [{title: str}],
              };
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
      menuPopup: {},
    });
  };

  onChooseLabel = id => {
    this.setState({
      ...this.state,
      labelIds: [...this.state.labelIds, id],
      menuPopup: {},
    });
  };

  onChangeTime = time => {
    this.setState({
      ...this.state,
      task: {
        ...this.state.task,
        time,
      },
    });
  };

  onChangePriority = id => {
    this.setState({
      ...this.state,
      task: {
        ...this.state.task,
        priorityType: id,
      },
      menuPopup: {},
    });
  };

  onChangeTime = ({type}, selectedDate) => {
    const {alarm} = this.state.task;
    if (alarm) {
      this.setState({
        ...this.state,
        task: {...this.state.task, alarm: null},
        isShowPicker: false,
      });
    } else {
      if (type === 'set') {
        this.setState({
          ...this.state,
          task: {
            ...this.state.task,
            alarm: selectedDate,
          },
          isShowPicker: false,
        });
      } else {
        this.setState({...this.state, isShowPicker: false});
      }
    }
  };

  onShowTimePicker = () => {
    const {alarm} = this.state.task;
    if (alarm) {
      this.setState({
        ...this.state,
        task: {
          ...this.state.task,
          alarm: null,
        },
      });
    } else {
      this.setState({
        ...this.state,
        isShowPicker: true,
      });
    }
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
    const {visible, task, menuPopup, labelIds, isShowPicker} = this.state;
    const {labels, projects} = this.props;
    const {time, alarm, projectId, priorityType} = task;
    let current = new Date();
    let timeStr = `${time.toDateString()}`;

    if (
      current.getFullYear() === time.getFullYear() &&
      current.getMonth() === time.getMonth() &&
      current.getDate() === time.getDate()
    ) {
      timeStr = 'Today';
    }

    current.setDate(current.getDate() + 1);

    if (
      current.getFullYear() === time.getFullYear() &&
      current.getMonth() === time.getMonth() &&
      current.getDate() === time.getDate()
    ) {
      timeStr = 'Tomorrow';
    }

    return (
      <Modal animationType="fade" visible={visible} transparent={true}>
        <View style={styles.root}>
          {isShowPicker && (
            <DateTimePicker
              testID="timePicker"
              value={new Date()}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={this.onChangeTime}
            />
          )}

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
              {menuPopup.isAdd === undefined ? (
                <View />
              ) : menuPopup.isAdd ? (
                menuPopup.type === TYPE_LABEL ? (
                  menuPopup.data.map((item, index) => (
                    <MenuAddLabel
                      item={item}
                      key={index}
                      onAddLabel={this.onAddLabel}
                    />
                  ))
                ) : (
                  menuPopup.data.map((item, index) => (
                    <MenuAddProject
                      item={item}
                      key={index}
                      onAddProject={this.onAddProject}
                    />
                  ))
                )
              ) : menuPopup.type === TYPE_LABEL ? (
                menuPopup.data.map((item, index) => (
                  <MenuLabel
                    item={item}
                    key={index}
                    onChooseLabel={this.onChooseLabel}
                  />
                ))
              ) : menuPopup.type === TYPE_PROJECT ? (
                menuPopup.data.map((item, index) => (
                  <MenuProject
                    item={item}
                    key={index}
                    onChooseProject={this.onChooseProject}
                  />
                ))
              ) : (
                <MenuPriority onChangePriority={this.onChangePriority} />
              )}
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
              <TouchableRipple
                onPress={() => {
                  this.dateChooseRef.current.onShowPopup();
                }}>
                <View style={styles.wrap}>
                  <Image
                    source={ICON.calendar}
                    style={[styles.icon, {tintColor: COLOR.green_dark}]}
                  />
                  <Text style={[styles.text, {color: COLOR.green_dark}]}>
                    {timeStr}
                  </Text>
                </View>
              </TouchableRipple>
              <TouchableRipple
                onPress={() => {
                  this.setState({
                    ...this.state,
                    menuPopup: {
                      type: TYPE_PROJECT,
                      isAdd: false,
                      data: projects.filter(
                        item => item.id !== this.state.task.projectId,
                      ),
                    },
                  });
                }}>
                <View style={[styles.wrap, {marginLeft: 10}]}>
                  <Image
                    source={ICON.inbox}
                    style={[styles.icon, {tintColor: COLOR.blue_dark}]}
                  />
                  <Text style={styles.text}>
                    {projectId.length > 0
                      ? projects.find(item => item.id === projectId).title
                      : 'Inbox'}
                  </Text>
                </View>
              </TouchableRipple>
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
                <TouchableRipple
                  onPress={() => {
                    this.setState({
                      ...this.state,
                      menuPopup: {
                        type: TYPE_LABEL,
                        isAdd: false,
                        data: labels.filter(
                          item => !labelIds.find(k => k === item.id),
                        ),
                      },
                    });
                  }}>
                  <Image
                    style={[styles.iconOption, {marginRight: 30}]}
                    source={ICON.label}
                  />
                </TouchableRipple>
                <TouchableRipple
                  onPress={() => {
                    this.setState({
                      ...this.state,
                      menuPopup: {
                        type: TYPE_PRIORITY,
                        isAdd: false,
                      },
                    });
                  }}>
                  <Image
                    style={[
                      styles.iconOption,
                      {
                        marginRight: 30,
                        tintColor: priorities.filter(
                          item => item.id === priorityType,
                        ).color,
                      },
                    ]}
                    source={ICON.flag}
                  />
                </TouchableRipple>
                <TouchableRipple onPress={this.onShowTimePicker}>
                  <Image
                    style={[
                      styles.iconOption,
                      {
                        marginRight: 30,
                        tintColor: alarm ? COLOR.green_light : COLOR.black,
                      },
                    ]}
                    source={ICON.alarm}
                  />
                </TouchableRipple>
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
          <TimeChooseBottomPopup
            ref={this.dateChooseRef}
            onChangeTime={this.onChangeTime}
          />
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
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
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
