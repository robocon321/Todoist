/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import {Snackbar} from 'react-native-paper';
import {connect} from 'react-redux';
import TodayTopbar from '../components/TodayTopbar';
import DayTask from '../components/DayTasks';
import * as COLOR from '../constants/colors';
import {STATUS_TASK} from '../constants/others';
import * as taskAciton from '../actions/taskAction';

class Today extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      undo: [],
      snackbar: false,
    };
  }

  addToUndo = id => {
    let {undo} = this.state;
    undo.push(id);
    this.setState({
      ...this.state,
      undo,
      snackbar: true,
    });
  };

  openSideNav = () => {
    this.props.navigation.openDrawer();
  };

  undoTaskCompleted = async () => {
    const {undo} = this.state;
    const {changeStatus, loadTask} = this.props;
    await undo.map(item => {
      changeStatus(item, STATUS_TASK.NOT_COMPLETE);
    });
    await loadTask();
    this.setState({
      ...this.state,
      snackbar: false,
    });
  };

  onDismiss = () => {
    this.setState({
      ...this.state,
      snackbar: false,
    });
  };

  render = () => {
    const {snackbar} = this.state;
    return (
      <View style={styles.container}>
        <Snackbar
          style={{position: 'absolute', bottom: 0, left: 0, zIndex: 10}}
          visible={snackbar}
          onDismiss={() => this.onDismiss()}
          action={{
            label: 'Undo',
            onPress: () => {
              this.undoTaskCompleted();
            },
          }}>
          Task completed! Do you want to undo?
        </Snackbar>
        <StatusBar />
        <TodayTopbar openSideNav={this.openSideNav} />
        <DayTask addToUndo={this.addToUndo} />
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
    position: 'relative',
  },
});

const mapStateToProps = state => {
  return {
    labels: state.labels,
    projects: state.projects,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeStatus: (id, status) => {
      return dispatch(taskAciton.updateStatusTask(id, status));
    },
    loadTask: taskAciton.queryAll(dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Today);
