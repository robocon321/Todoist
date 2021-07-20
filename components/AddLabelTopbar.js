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

export default class Topbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.left}>
          <TouchableWithoutFeedback>
            <Image style={[styles.image, styles.item]} source={ICON.back} />
          </TouchableWithoutFeedback>
          <Text style={[styles.text, styles.item]}>Add label</Text>
        </View>
        <View style={styles.right}>
          <Image style={[styles.image, styles.item]} source={ICON.agree} />
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
