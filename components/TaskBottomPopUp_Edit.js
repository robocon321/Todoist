/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable react-native/no-inline-styles */
import React, {createRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {connect} from 'react-redux';
import {TouchableRipple} from 'react-native-paper';
import * as labelAction from '../actions/labelAction';
import * as projectAction from '../actions/projectAction';
import * as taskAction from '../actions/taskAction';
import * as labelTaskAction from '../actions/labelTaskAction';
import colorType from '../constants/colorType';
import * as COLOR from '../constants/colors';
import * as ICON from '../constants/icons';
import * as OTHER from '../constants/others';
import {priorities} from '../constants/others';
import TimeChooseBottomPopup from './TimeChooseBottomPopup';
import DateTimePicker from '@react-native-community/datetimepicker';

const {height} = Dimensions.get('window');

const TYPE_LABEL = 0;
const TYPE_PROJECT = 1;
const TYPE_PRIORITY = 2;

const Label = props => {
  const {item, onRemoveLabel} = props;
  return (
    <TouchableRipple onPress={() => onRemoveLabel(item.id)}>
      <Text style={styles.labelItem}>{item.title}</Text>
    </TouchableRipple>
  );
};

const Project = props => {
  const {item, onChangeToInboxProject} = props;
  return (
    <TouchableRipple onPress={() => onChangeToInboxProject()}>
      <Text style={[styles.tag, {marginRight: 5}]}>#{item.title}</Text>
    </TouchableRipple>
  );
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
    status: OTHER.STATUS_TASK.NOT_COMPLETE,
  },
  labelIds: [],
  menuPopup: {},
  isShowPicker: false,
  bottom: 0,
};

class TaskBottomPopUp_Edit extends React.Component {
  constructor(props) {
    super(props);
    this.levelBottom = [-300, -200, 0];
    this.state = init;
    this.selection = {
      start: 0,
      end: 0,
    };
    this.dateChooseRef = createRef();
  }

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

  onChangeAlarm = ({type}, selectedDate) => {
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

  onComment = () => {
    this.props.navigation.navigate('Comment');
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

  onAddNewTask = async () => {
    const {task, labelIds} = this.state;
    const {onSaveLabelTask, onSaveTask, onLoadTask, onLoadLabelTask} =
      this.props;
    task.id = `${Date.now()}`;
    await labelIds.forEach(item =>
      onSaveLabelTask({id: `${Date.now()}`, taskId: task.id, labelId: item}),
    );
    await onSaveTask(task);
    await onLoadTask();
    await onLoadLabelTask();
    this.onClosePopup();
  };

  onRemoveLabel = id => {
    const {labelIds} = this.state;
    this.setState({
      ...this.state,
      labelIds: labelIds.filter(item => id !== item),
    });
  };

  onChangeToInboxProject = () => {
    this.setState({
      ...this.state,
      task: {
        ...this.state.task,
        projectId: '',
      },
    });
  };

  onPress = e => {
    const {locationY} = e.nativeEvent;
    this.setState({
      ...this.state,
      currentPopUpY: locationY,
    });
  };

  onMove = e => {
    const {pageY} = e.nativeEvent;
    const {currentPopUpY} = this.state;
    this.setState({
      ...this.state,
      bottom: height - pageY - (this.heightComponent - currentPopUpY),
    });
  };

  onRelease = e => {
    const {bottom} = this.state;
    if (bottom < this.levelBottom[0]) {
      this.setState({
        ...this.state,
        bottom: -this.heightComponent,
        visible: false,
      });
    } else if (
      bottom > this.levelBottom[0] &&
      bottom < this.levelBottom[1] + 50
    ) {
      this.setState({
        ...this.state,
        bottom: this.levelBottom[1],
      });
    } else {
      this.setState({
        ...this.state,
        bottom: this.levelBottom[2],
      });
    }
  };

  onShowPopup = task => {
    const {id, title, parentId, priorityType, alarm, projectId, time, status} =
      task;
    const {labelTasks} = this.props;
    let labelIds = [];
    labelTasks.map(item => {
      if (item.taskId === id) labelIds.push(item.labelId);
    });
    this.setState({
      ...this.state,
      task: {
        id,
        title,
        parentId,
        priorityType,
        alarm,
        projectId,
        time,
        status,
      },
      bottom: this.levelBottom[1],
      visible: true,
      labelIds,
    });
  };

  onClosePopup = () => {
    this.setState({
      ...this.state,
      visible: false,
    });
  };

  onLayout = e => {
    const {layout} = e.nativeEvent;
    this.heightComponent = layout.height;
  };

  render() {
    const {visible, task, bottom, menuPopup, labelIds, isShowPicker} =
      this.state;
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
        <View
          style={{
            flex: 1,
            backgroundColor: '#000000AA',
            justifyContent: 'flex-end',
          }}>
          {isShowPicker && (
            <DateTimePicker
              testID="timePicker"
              value={new Date()}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={this.onChangeAlarm}
            />
          )}
          <TouchableWithoutFeedback onPress={this.onClosePopup}>
            <View style={{flex: 1, width: '100%'}} />
          </TouchableWithoutFeedback>
          <View
            style={[styles.container, {bottom: bottom}]}
            onLayout={this.onLayout}
            onStartShouldSetResponder={() => true}
            onMoveShouldSetResponder={() => true}
            onResponderGrant={this.onPress}
            onResponderRelease={this.onRelease}
            onResponderMove={this.onMove}>
            <TouchableWithoutFeedback
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
              <View style={styles.project}>
                <Image style={styles.iconProject} source={ICON.inbox} />
                <Text style={styles.textProject}>
                  {projectId.length > 0
                    ? projects.find(item => item.id === projectId).title
                    : 'Inbox'}
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <View style={styles.wrap}>
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
              <KeyboardAvoidingView>
                <View style={styles.row}>
                  <Image style={styles.check} source={ICON.o} />
                  <View style={styles.col2}>
                    <TextInput
                      style={styles.title}
                      value={task.title}
                      placeholder="@Label, #Project"
                      onKeyPress={({nativeEvent}) =>
                        this.onKeyPress(nativeEvent)
                      }
                      onSelectionChange={({nativeEvent: {selection}}) => {
                        this.selection = selection;
                      }}
                      onChangeText={text => this.onChangeText(text)}
                    />
                    <TouchableRipple
                      onPress={() => {
                        this.dateChooseRef.current.onShowPopup();
                      }}>
                      <View style={styles.time}>
                        <Image
                          style={styles.iconTime}
                          source={ICON.yesterday}
                        />
                        <Text style={styles.textTime}>{timeStr}</Text>
                      </View>
                    </TouchableRipple>
                    <View style={styles.label}>
                      {labelIds.map((item, index) => (
                        <Label
                          onRemoveLabel={this.onRemoveLabel}
                          item={labels.find(i => i.id === item)}
                          key={index}
                        />
                      ))}
                    </View>
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
                          style={[styles.iconOption, {marginRight: 30}]}
                          source={ICON.flag}
                        />
                      </TouchableRipple>
                      <TouchableRipple onPress={() => this.onShowTimePicker()}>
                        <Image
                          style={[styles.iconOption, {marginRight: 30}]}
                          source={ICON.alarm}
                        />
                      </TouchableRipple>
                      <TouchableRipple onPress={() => this.onComment()}>
                        <Image
                          style={[styles.iconOption, {marginRight: 30}]}
                          source={ICON.comment}
                        />
                      </TouchableRipple>
                    </View>
                  </View>
                </View>
              </KeyboardAvoidingView>
              <View style={styles.col3}>
                <Image style={styles.iconOption} source={ICON.option} />
              </View>
            </View>
            <View>
              <View style={styles.sub}>
                <Image style={styles.iconSub} source={ICON.branch} />
                <Text style={styles.titleSub}>Sub-tasks</Text>
              </View>
              <View>
                <View style={{marginLeft: 40}}>
                  <View style={styles.sub}>
                    <Image style={styles.iconSub} source={ICON.o} />
                    <Text style={styles.titleSub}>To do Item</Text>
                  </View>
                  <View
                    style={[
                      styles.row,
                      {marginLeft: 60, alignItems: 'center', paddingBottom: 10},
                    ]}>
                    <View style={[styles.row, {alignItems: 'center'}]}>
                      <Image style={styles.imgCmtSub} source={ICON.comment} />
                      <Text style={styles.textCmtSub}>0</Text>
                    </View>
                    <View style={[styles.row, {alignItems: 'center'}]}>
                      <Image style={styles.imgCmtSub} source={ICON.branch} />
                      <Text style={styles.textCmtSub}>0/2</Text>
                    </View>
                  </View>
                  <View style={styles.sub}>
                    <Image
                      style={[styles.iconSub, {tintColor: COLOR.gray_dark}]}
                      source={ICON.add}
                    />
                    <Text style={[styles.titleSub, {color: COLOR.gray_dark}]}>
                      Add sub-task
                    </Text>
                  </View>
                </View>
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
  row: {
    flexDirection: 'row',
  },
  container: {
    position: 'absolute',
    width: '100%',
    height: height - 50,
    backgroundColor: COLOR.white,
    elevation: 4,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  menuPopup: {
    position: 'absolute',
    width: '70%',
    elevation: 3,
    backgroundColor: COLOR.white,
    top: '35%',
    left: 30,
    zIndex: 5,
  },
  wrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  project: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  iconProject: {
    width: 30,
    height: 30,
    tintColor: COLOR.blue_dark,
  },
  textProject: {
    color: COLOR.black,
    fontSize: 20,
    marginLeft: 20,
  },
  check: {
    width: 35,
    height: 35,
    tintColor: COLOR.black,
    borderRadius: 50,
    backgroundColor: '#fff5f5',
  },
  icon: {
    width: 20,
    height: 20,
  },
  text: {
    fontSize: 15,
    paddingLeft: 10,
  },
  col2: {
    paddingHorizontal: 10,
  },
  title: {
    paddingVertical: 0,
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  time: {
    minWidth: 100,
    maxWidth: 150,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLOR.gray_dark,
    zIndex: 4,
  },
  iconTime: {
    width: 15,
    height: 15,
    tintColor: COLOR.red_light,
  },
  textTime: {
    color: COLOR.red_light,
    fontSize: 15,
    marginLeft: 5,
  },
  label: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  labelItem: {
    width: 40,
    height: 40,
    marginRight: 10,
    paddingTop: 5,
    fontSize: 20,
    textAlign: 'center',
    borderRadius: 5,
    backgroundColor: COLOR.gray_light,
    color: COLOR.black,
  },
  col3: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  iconOption: {
    width: 30,
    height: 30,
    tintColor: COLOR.gray_dark,
  },

  sub: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopColor: COLOR.gray_light,
    borderTopWidth: 1,
  },
  iconSub: {
    width: 20,
    height: 20,
    tintColor: COLOR.black,
  },
  titleSub: {
    color: COLOR.black,
    fontSize: 20,
    marginLeft: 20,
  },
  imgCmtSub: {
    width: 20,
    height: 20,
    tintColor: COLOR.gray_dark,
    marginRight: 5,
  },
  textCmtSub: {
    fontSize: 20,
    color: COLOR.gray_dark,
    marginRight: 20,
  },
});

const mapStateToProps = state => {
  return {
    labels: state.labels,
    projects: state.projects,
    labelTasks: state.labelTasks,
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
    onSaveTask: task => {
      return dispatch(taskAction.insert(task));
    },
    onSaveLabelTask: labelTask => {
      return dispatch(labelTaskAction.insert(labelTask));
    },
    onLoadLabelTask: labelTaskAction.queryAll(dispatch),
    onLoadLabel: labelAction.queryAll(dispatch),
    onLoadProject: projectAction.queryAll(dispatch),
    onLoadTask: taskAction.queryAll(dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(TaskBottomPopUp_Edit);
