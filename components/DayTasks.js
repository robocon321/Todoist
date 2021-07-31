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
import Task from '../components/Task';

class DayTask extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {onShowPopup, tasks} = this.props;
    const currentDate = new Date();
    let todayTasks = tasks.filter(item => {
      return (
        currentDate.getDate() === item.time.getDate() &&
        currentDate.getMonth() === item.time.getMonth() &&
        currentDate.getFullYear() === item.time.getFullYear()
      );
    });

    let overdueTasks = tasks.filter(item => {
      return (
        (currentDate.getFullYear() === item.time.getFullYear() &&
          currentDate.getMonth() === item.time.getMonth() &&
          currentDate.getDate() > item.time.getDate()) ||
        (currentDate.getFullYear() === item.time.getFullYear() &&
          currentDate.getMonth() > item.time.getMonth()) ||
        currentDate.getFullYear() > item.time.getFullYear()
      );
    });

    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.day}>
            <Text style={styles.textLeft}>Overdue</Text>
            <TouchableWithoutFeedback>
              <Text style={styles.textRight}>Reschedule</Text>
            </TouchableWithoutFeedback>
          </View>
          {overdueTasks.map(item => (
            <Task onShowPopup={onShowPopup} data={item} isToday={false} />
          ))}
          <View style={styles.day}>
            <Text style={styles.textLeft}>
              Today{' '}
              <Text style={{fontWeight: '100', fontSize: 15}}>
                {currentDate.toDateString()}
              </Text>
            </Text>
          </View>
          {todayTasks.map(item => (
            <Task onShowPopup={onShowPopup} data={item} isToday={true} />
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
    // Todo
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DayTask);
