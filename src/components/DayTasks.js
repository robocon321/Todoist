/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import * as COLOR from '../constants/colors';
import * as taskAction from '../actions/taskAction';
import {STATUS_TASK} from '../constants/others';
import Task from '../components/Task';

class DayTask extends React.Component {
  constructor(props) {
    super(props);
  }

  onReschedule = async tasks => {
    const {updateTimeTask, loadTask} = this.props;
    await tasks.map(item => {
      var date = new Date();
      updateTimeTask(item.id, date);
    });
    await loadTask();
  };

  render() {
    let {onChooseTask, tasks, addToUndo, navigation} = this.props;
    const currentDate = new Date();
    let todayTasks = tasks.filter(item => {
      return (
        currentDate.getDate() === item.time.getDate() &&
        currentDate.getMonth() === item.time.getMonth() &&
        currentDate.getFullYear() === item.time.getFullYear() &&
        item.status === STATUS_TASK.NOT_COMPLETE &&
        !item.parentId
      );
    });

    let overdueTasks = tasks.filter(item => {
      return (
        !item.parentId &&
        item.status === STATUS_TASK.NOT_COMPLETE &&
        ((currentDate.getFullYear() === item.time.getFullYear() &&
          currentDate.getMonth() === item.time.getMonth() &&
          currentDate.getDate() > item.time.getDate()) ||
          (currentDate.getFullYear() === item.time.getFullYear() &&
            currentDate.getMonth() > item.time.getMonth()) ||
          currentDate.getFullYear() > item.time.getFullYear())
      );
    });

    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.day}>
            <Text style={styles.textLeft}>Overdue</Text>
            <TouchableWithoutFeedback
              onPress={() => this.onReschedule(overdueTasks)}>
              <Text style={styles.textRight}>Reschedule</Text>
            </TouchableWithoutFeedback>
          </View>
          {overdueTasks.map((item, index) => (
            <Task
              addToUndo={addToUndo}
              onChooseTask={onChooseTask}
              data={item}
              isToday={false}
              key={index}
            />
          ))}
          <View style={styles.day}>
            <Text style={styles.textLeft}>
              Today{' '}
              <Text style={{fontWeight: '100', fontSize: 15}}>
                {currentDate.toDateString()}
              </Text>
            </Text>
          </View>
          {todayTasks.map((item, index) => (
            <Task
              navigation={navigation}
              addToUndo={addToUndo}
              onChooseTask={onChooseTask}
              data={item}
              isToday={true}
              key={index}
            />
          ))}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  day: {
    paddingTop: 15,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: COLOR.gray_light,
    borderBottomWidth: 1,
  },
  textLeft: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textRight: {
    fontSize: 20,
    color: COLOR.red_light,
  },
});

const mapStateToProps = state => {
  return {
    tasks: state.tasks,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateTimeTask: (id, time) => dispatch(taskAction.updateTimeTask(id, time)),
    loadTask: taskAction.queryAll(dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DayTask);
