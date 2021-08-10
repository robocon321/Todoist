import React from 'react';
import {StyleSheet, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Provider, FAB} from 'react-native-paper';
import LeftNavigation from '../components/LeftNavigation';
import TaskBottomPopUp_Add from '../components/TaskBottomPopUp_Add';
import Inbox from '../screens/Inbox';
import Today from '../screens/Today';
import * as COLOR from '../constants/colors';
import * as ICON from '../constants/icons';
import * as labelAction from '../actions/labelAction';
import * as projectAction from '../actions/projectAction';
import * as taskAction from '../actions/taskAction';
import * as commentTaskAction from '../actions/commentTaskAction';
import {connect} from 'react-redux';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    this.props.loadProject();
    this.props.loadLabel();
    this.props.loadTask();
  }

  render() {
    const Drawer = createDrawerNavigator();
    const addTaskPopup = this.ref;
    return (
      <Provider>
        <View style={styles.container}>
          <Drawer.Navigator
            drawerStyle={{width: '85%'}}
            initialRouteName="Today"
            drawerContent={props => <LeftNavigation {...props} />}>
            <Drawer.Screen name="Today" component={Today} />
            <Drawer.Screen name="Inbox" component={Inbox} />
          </Drawer.Navigator>
          <TaskBottomPopUp_Add
            ref={addTaskPopup}
            navigation={this.props.navigation}
          />
          <FAB
            color={'white'}
            style={[styles.fab, {zIndex: 4}]}
            icon={ICON.add}
            onPress={() => addTaskPopup.current.onShowPopup()}
          />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  fab: {
    position: 'absolute',
    margin: 35,
    right: 0,
    bottom: 0,
    backgroundColor: COLOR.red_light,
  },
});

const mapStateToProps = state => {
  return {
    // Todo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadLabel: labelAction.queryAll(dispatch),
    loadProject: projectAction.queryAll(dispatch),
    loadTask: taskAction.queryAll(dispatch),
    loadCommentTask: commentTaskAction.queryAll(dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
