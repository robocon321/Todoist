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

export default class InboxTopbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {openSideNav} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.left}>
          <TouchableWithoutFeedback onPress={() => openSideNav()}>
            <Image style={[styles.image, styles.item]} source={ICON.nav_side} />
          </TouchableWithoutFeedback>
          <Text style={[styles.text, styles.item]}>Inbox</Text>
        </View>
        <View style={styles.right}>
          <Image style={[styles.image, styles.item]} source={ICON.search} />
          <View style={styles.wrapComment}>
            <Image style={[styles.image, styles.item]} source={ICON.comment} />
            <View style={styles.wrapCount}>
              <Text style={styles.textCount}>1</Text>
            </View>
          </View>
          <Image style={[styles.image, styles.item]} source={ICON.option} />
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
  wrapComment: {
    position: 'relative',
  },
  wrapCount: {
    width: 20,
    height: 20,
    right: 0,
    top: -5,
    position: 'absolute',
    backgroundColor: COLOR.white,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCount: {
    color: COLOR.red_light,
  },
});
