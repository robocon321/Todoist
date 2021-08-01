/* eslint-disable react/no-did-mount-set-state */
import React from 'react';
import Realm from 'realm';
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

class Task extends React.Component {
  constructor(props) {
    super(props);
  }

  changeStatus = async status => {
    const {task} = this.state;
    const {updateTask, loadTask} = this.props;
    await this.setState({
      ...this.state,
      task: {
        id: task.id,
        title: task.title,
        parentId: task.parentId,
        priorityType: task.priorityType,
        alarm: task.alarm,
        projectId: task.projectId,
        time: task.time,
        status,
      },
    });
    await updateTask(this.state.task);
    await loadTask();
  };

  componentDidMount() {
    this.setState({task: this.props.data});
  }

  render() {
    const {onShowPopup, data, allLabels, allProjects, allLabelTasks, isToday} =
      this.props;
    const projectName =
      data.projectId.length === 0
        ? 'Inbox'
        : allProjects.find(item => item.id === data.projectId).title;
    const labelTasks = allLabelTasks.filter(item => item.taskId === data.id);
    const labels = allLabels.filter(item => {
      return labelTasks.find(i => item.id === i.labelId);
    });
    return (
      <TouchableWithoutFeedback onPress={() => onShowPopup()}>
        <View style={styles.container}>
          <View style={styles.left}>
            <TouchableWithoutFeedback
              onPress={() => this.changeStatus(STATUS_TASK.COMPLETE)}>
              <Image style={styles.check} source={ICON.o} />
            </TouchableWithoutFeedback>
            <View style={styles.col2}>
              <Text style={styles.title}>{data.title}</Text>
              {!isToday && (
                <View style={styles.yesterday}>
                  <Image style={styles.iconYesterday} source={ICON.yesterday} />
                  <Text style={styles.textYesterday}>
                    {data.time.toDateString()}
                  </Text>
                </View>
              )}
              <View style={styles.label}>
                {labels.map(item => (
                  <Text style={styles.labelItem}>{item.title}</Text>
                ))}
              </View>
            </View>
          </View>
          <View style={styles.col3}>
            <Text style={styles.textInbox}>{projectName}</Text>
            <Image style={styles.iconInbox} source={ICON.inbox} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginLeft: 20,
    paddingVertical: 15,
    paddingRight: 20,
    justifyContent: 'space-between',
    borderBottomColor: COLOR.gray_light,
    borderBottomWidth: 1,
  },
  left: {
    flexDirection: 'row',
  },
  check: {
    width: 35,
    height: 35,
    tintColor: COLOR.red_light,
    borderRadius: 50,
    backgroundColor: '#fff5f5',
  },
  col2: {
    paddingHorizontal: 10,
  },
  title: {
    paddingVertical: 5,
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
  textInbox: {
    fontSize: 15,
    color: COLOR.gray_dark,
    marginRight: 10,
  },
  iconInbox: {
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
    updateTask: data => {
      return dispatch(taskAction.update(data));
    },
    loadTask: taskAction.queryAll(dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);
