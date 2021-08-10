/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-did-mount-set-state */
import React, {createRef} from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import * as ICON from '../constants/icons';
import * as COLOR from '../constants/colors';
import {STATUS_TASK} from '../constants/others';
import * as taskAction from '../actions/taskAction';
import TaskBottomPopUp_Edit from './TaskBottomPopUp_Edit';

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.popup = createRef();
  }

  changeStatus = async status => {
    const {updateStatusTask, loadTask, addToUndo, data} = this.props;
    await updateStatusTask(data.id, status);
    await loadTask();
    addToUndo(data.id);
  };

  render() {
    const {
      data,
      allLabels,
      allProjects,
      allLabelTasks,
      isToday,
      allTasks,
      navigation,
    } = this.props;
    const projectName =
      data.projectId.length === 0
        ? 'Inbox'
        : allProjects.find(item => item.id === data.projectId).title;
    const labelTasks = allLabelTasks.filter(item => item.taskId === data.id);
    const labels = allLabels.filter(item => {
      return labelTasks.find(i => item.id === i.labelId);
    });
    const childTasks = allTasks.filter(item => item.parentId === data.id);
    const childTasksComplete = childTasks.filter(
      item => item.status === STATUS_TASK.COMPLETE,
    );
    return (
      <TouchableWithoutFeedback
        onPress={() => this.popup.current.onShowPopup()}>
        <View style={styles.container}>
          <View style={styles.row}>
            <TouchableWithoutFeedback
              onPress={() => this.changeStatus(STATUS_TASK.COMPLETE)}>
              <Image style={styles.check} source={ICON.o} />
            </TouchableWithoutFeedback>
            <View style={styles.col2}>
              <Text style={styles.title}>{data.title}</Text>
              {!isToday && (
                <View style={[styles.yesterday, {marginTop: 5}]}>
                  <Image style={styles.iconYesterday} source={ICON.yesterday} />
                  <Text style={styles.textYesterday}>
                    {data.time.toDateString()}
                  </Text>
                </View>
              )}
              <View style={[styles.label, {marginTop: 5}]}>
                {labels.map((item, index) => (
                  <Text style={styles.labelItem} key={index}>
                    {item.title}
                  </Text>
                ))}
              </View>
              <View style={[styles.row, {marginTop: 5}]}>
                <View style={styles.row}>
                  <Image source={ICON.comment} style={styles.icon} />
                  <Text style={[styles.text, {marginLeft: 3}]}>0</Text>
                </View>
                {childTasks.length > 0 && (
                  <View style={[styles.row, {marginLeft: 10}]}>
                    <Image source={ICON.branch} style={styles.icon} />
                    <Text
                      style={[
                        styles.text,
                        {marginLeft: 3},
                      ]}>{`${childTasksComplete.length}/${childTasks.length}`}</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
          <View style={styles.col3}>
            <Text style={styles.text}>{projectName}</Text>
            <Image style={styles.icon} source={ICON.inbox} />
          </View>
          <TaskBottomPopUp_Edit
            ref={this.popup}
            task={data}
            navigation={navigation}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginLeft: 20,
    paddingRight: 20,
    justifyContent: 'space-between',
    borderBottomColor: COLOR.gray_light,
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  check: {
    width: 25,
    height: 25,
    borderRadius: 50,
  },
  row: {
    flexDirection: 'row',
  },
  col2: {
    paddingHorizontal: 10,
  },
  title: {
    alignItems: 'center',
    fontSize: 20,
  },
  yesterday: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconYesterday: {
    width: 15,
    height: 15,
    tintColor: COLOR.red_light,
  },
  textYesterday: {
    color: COLOR.red_light,
    fontSize: 15,
    marginLeft: 5,
  },
  label: {
    flexDirection: 'row',
  },
  labelItem: {
    color: COLOR.gray_dark,
    fontSize: 20,
    paddingRight: 10,
  },
  col3: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  text: {
    fontSize: 15,
    color: COLOR.gray_dark,
    marginRight: 10,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: COLOR.gray_dark,
  },
});

const mapStateToProps = state => {
  return {
    allTasks: state.tasks,
    allProjects: state.projects,
    allLabelTasks: state.labelTasks,
    allLabels: state.labels,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateStatusTask: (id, status) => {
      return dispatch(taskAction.updateStatusTask(id, status));
    },
    loadTask: taskAction.queryAll(dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);
