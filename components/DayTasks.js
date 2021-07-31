import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View, Text} from 'react-native';
import * as COLOR from '../constants/colors';
import Task from '../components/Task';

class DayTask extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {onShowPopup, tasks} = this.props;
    console.log(1, tasks);
    return (
      <View style={styles.container}>
        <View style={styles.day}>
          <Text style={styles.textLeft}>Overdue</Text>
          <Text style={styles.textRight}>Reschedule</Text>
        </View>
        <Task onShowPopup={onShowPopup} />
      </View>
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
    borderColor: COLOR.gray_light,
    borderWidth: 1,
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
    // getTaskOverdue:
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DayTask);
