import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import * as ICON from '../constants/icons';
import * as COLOR from '../constants/colors';
import {Menu} from 'react-native-paper';

export default class Topbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainVisible: false,
      sortVisible: false,
    };
  }

  onCloseMenuMain = () => {
    this.setState({
      ...this.state,
      mainVisible: false,
    });
  };

  onOpenMenuMain = () => {
    this.setState({
      ...this.state,
      mainVisible: true,
    });
  };

  onCloseMenuSort = () => {
    this.setState({
      ...this.state,
      sortVisible: false,
      mainVisible: false,
    });
  };

  onOpenMenuSort = () => {
    this.setState({
      ...this.state,
      sortVisible: true,
    });
  };

  render() {
    const {openSideNav} = this.props;
    const {mainVisible, sortVisible} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.left}>
          <TouchableWithoutFeedback onPress={() => openSideNav()}>
            <Image style={[styles.image, styles.item]} source={ICON.nav_side} />
          </TouchableWithoutFeedback>
          <Text style={[styles.text, styles.item]}>Today</Text>
        </View>
        <View style={styles.right}>
          <Image style={[styles.image, styles.item]} source={ICON.search} />
          <Menu
            style={{top: 0}}
            visible={mainVisible}
            onDismiss={this.onCloseMenuMain}
            anchor={
              <TouchableWithoutFeedback onPress={this.onOpenMenuMain}>
                <Image
                  style={[styles.image, styles.item]}
                  source={ICON.option}
                />
              </TouchableWithoutFeedback>
            }>
            <Menu.Item onPress={() => {}} title="Select tasks" />
            <Menu
              style={{top: 0}}
              visible={sortVisible}
              onDismiss={this.onCloseMenuSort}
              anchor={<Menu.Item onPress={this.onOpenMenuSort} title="Sort" />}>
              <Text
                style={{
                  paddingLeft: 15,
                  color: COLOR.black,
                  fontWeight: 'bold',
                }}>
                Sort
              </Text>
              <Menu.Item onPress={() => {}} title="By due date" />
              <Menu.Item onPress={() => {}} title="By priority" />
              <Menu.Item onPress={() => {}} title="Alphabetically" />
              <Menu.Item onPress={() => {}} title="Custom sort" />
            </Menu>

            <Menu.Item onPress={() => {}} title="Activiity log" />
            <Menu.Item onPress={() => {}} title="Notifications" />
          </Menu>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    backgroundColor: COLOR.red_light,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    tintColor: COLOR.white,
    width: 35,
    height: 35,
  },
  text: {
    fontSize: 25,
    color: COLOR.white,
    fontWeight: 'bold',
  },
  item: {
    paddingVertical: 10,
    marginHorizontal: 10,
  },
});
