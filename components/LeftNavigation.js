import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import {connect} from 'react-redux';
import * as labelAction from '../actions/labelAction';
import * as IMAGE from '../constants/images';
import * as ICON from '../constants/icons';
import * as COLOR from '../constants/colors';
import * as ACTION from '../constants/actionType';
import colorType from '../constants/colorType';
import MenuItem from './MenuItem';
import MenuGroup from './MenuGroup';

class LeftNavigaiton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {
        id: '',
        name: '',
        avatar: '',
      },
    };
    this._retrieveData();
  }

  _retrieveData = async () => {
    const id = await AsyncStorage.getItem('id');
    const name = await AsyncStorage.getItem('name');
    const avatar = await AsyncStorage.getItem('avatar');
    this.setState({
      ...this.state,
      info: {
        id,
        name,
        avatar,
      },
    });
  };

  onAddNewProject = () => {
    this.props.navigation.navigate('AddProject');
  };

  onAddNewLabel = () => {
    this.props.navigation.navigate('AddLabel');
  };

  onAddNewFilter = () => {
    // Todo
  };

  componentDidMount() {
    this.props.loadLabel();
  }

  render() {
    const {info} = this.state;
    const {navigation, labels} = this.props;
    return (
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity activeOpacity={0.9}>
            <View style={styles.wrap}>
              <Image style={styles.avatar} source={{uri: info.avatar}} />
              <View style={styles.info}>
                <Text style={styles.name}>{info.name}</Text>
                <Text style={styles.completed}>
                  Hoàn thành: <Text>3/5</Text>
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Inbox')}>
            <MenuItem
              icon={ICON.inbox}
              leftContent="Inbox"
              rightContent="3"
              color={COLOR.blue_light}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Today')}>
            <MenuItem
              icon={ICON.today}
              leftContent="Today"
              rightContent="2"
              color={COLOR.green_light}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <MenuItem
              icon={ICON.calendar}
              leftContent="Upcoming"
              rightContent=""
              color={COLOR.purple_light}
            />
          </TouchableOpacity>
          <MenuGroup content="Projects" onAdd={this.onAddNewProject}>
            <MenuItem
              icon={ICON.dot}
              leftContent="Welcome"
              rightContent="9"
              color={COLOR.gray_dark}
            />
            <MenuItem
              icon={ICON.setting}
              leftContent="Manage projects"
              rightContent=""
              color={COLOR.gray_dark}
            />
          </MenuGroup>
          <MenuGroup content="Labels" onAdd={this.onAddNewLabel}>
            {labels.map((item, index) => (
              <MenuItem
                icon={ICON.label}
                leftContent={item.title}
                color={colorType.find(i => i.id == item.colorType).code}
              />
            ))}
            <MenuItem
              icon={ICON.setting}
              leftContent="Manage labels"
              color={COLOR.gray_dark}
            />
          </MenuGroup>
          <MenuGroup content="Filters">
            <MenuItem
              icon={ICON.priority}
              leftContent="Assigned to me"
              rightContent="2"
              color={COLOR.gray_dark}
            />
            <MenuItem
              icon={ICON.priority}
              leftContent="Assigned to others"
              rightContent="1"
              color={COLOR.gray_dark}
            />
            <MenuItem
              icon={ICON.priority}
              leftContent="Priority 1"
              rightContent=""
              color={COLOR.blue_light}
            />
            <MenuItem
              icon={ICON.priority}
              leftContent="Priority 2"
              rightContent="2"
              color={COLOR.blue_light}
            />
            <MenuItem
              icon={ICON.priority}
              leftContent="Priority 3"
              rightContent=""
              color={COLOR.blue_light}
            />
            <MenuItem
              icon={ICON.priority}
              leftContent="Priority 4"
              rightContent="9"
              color={COLOR.blue_light}
            />
            <MenuItem
              icon={ICON.priority}
              leftContent="View all"
              rightContent="12"
              color={COLOR.blue_light}
            />
            <MenuItem
              icon={ICON.priority}
              leftContent="No due date"
              rightContent="1"
              color={COLOR.blue_light}
            />
            <MenuItem
              icon={ICON.setting}
              leftContent="Manage filters"
              rightContent=""
              color={COLOR.gray_dark}
            />
          </MenuGroup>
          <View style={styles.break} />
          <TouchableOpacity>
            <MenuItem
              icon={ICON.setting}
              leftContent="Settings"
              rightContent=""
              color={COLOR.black}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  wrap: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: COLOR.red_light,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  info: {
    marginLeft: 20,
  },
  name: {
    fontSize: 18,
    color: COLOR.white,
    fontWeight: 'bold',
  },
  completed: {
    fontSize: 15,
    color: COLOR.white,
  },
  break: {
    height: 0.5,
    backgroundColor: COLOR.gray_light,
  },
});

const mapStateToProps = state => {
  return {
    labels: state.labels,
  };
};

const mapDispatcherToProps = dispatch => {
  return {
    loadLabel: labelAction.queryAll(dispatch),
  };
};

export default connect(mapStateToProps, mapDispatcherToProps)(LeftNavigaiton);
