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

export default class CommentTopbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {task, onExit} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <TouchableWithoutFeedback onPress={() => onExit()}>
            <Image style={[styles.image, styles.item]} source={ICON.back} />
          </TouchableWithoutFeedback>
          <Text style={[styles.title, styles.item]}>Comments</Text>
        </View>
        <Text style={styles.text}>Task: {task.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.red_light,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    tintColor: COLOR.white,
    width: 35,
    height: 35,
  },
  title: {
    fontSize: 25,
    color: COLOR.white,
    fontWeight: 'bold',
  },
  text: {
    color: COLOR.white,
    fontSize: 20,
    marginLeft: 65,
    paddingBottom: 10,
  },
  item: {
    paddingVertical: 10,
    marginHorizontal: 10,
  },
});
