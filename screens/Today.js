import React from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import TodayTopbar from '../components/TodayTopbar';
import DayTask from '../components/DayTasks';
import TaskBottomPopUp_Edit from '../components/TaskBottomPopUp_Edit';
import * as COLOR from '../constants/colors';

export default class Today extends React.Component {
  constructor(props) {
    super(props);
    this.popup = React.createRef();
  }

  openSideNav = () => {
    this.props.navigation.openDrawer();
  };

  onShowPopup = () => {
    this.popup.current.onShowPopup();
  };

  render = () => {
    return (
      <View style={styles.container}>
        <StatusBar />
        <TodayTopbar openSideNav={this.openSideNav} />
        <DayTask onShowPopup={this.onShowPopup} />
        <TaskBottomPopUp_Edit ref={this.popup} />
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
