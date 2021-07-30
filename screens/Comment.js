/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Text,
  TextInput,
} from 'react-native';
import CommentTopbar from '../components/CommentTopbar';
import * as ICON from '../constants/icons';
import * as COLOR from '../constants/colors';

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <CommentTopbar />
        <ScrollView>
          <View style={[styles.comment, styles.row]}>
            <View style={styles.row}>
              <View style={styles.wrap_img}>
                <Image style={styles.img} source={ICON.dot} />
              </View>
              <View style={{marginLeft: 10}}>
                <View style={styles.row}>
                  <View style={styles.row}>
                    <Text style={styles.name}>Nguyễn Thanh Nhật</Text>
                    <Text style={styles.time}>5 Jul, 18:30</Text>
                  </View>
                </View>
                <Text style={styles.title}>Hello world</Text>
                <View style={[styles.row, styles.wrap_reaction]}>
                  <View style={[styles.row, styles.item_reaction]}>
                    <Image style={styles.img_reaction} source={ICON.dot} />
                    <Text style={styles.text_reaction}>1</Text>
                  </View>
                </View>
              </View>
            </View>
            <Image style={styles.icon} source={ICON.option} />
          </View>
          <View style={[styles.comment, styles.row]}>
            <View style={styles.row}>
              <View style={styles.wrap_img}>
                <Image style={styles.img} source={ICON.dot} />
              </View>
              <View style={{marginLeft: 10}}>
                <View style={styles.row}>
                  <View style={styles.row}>
                    <Text style={styles.name}>Nguyễn Thanh Nhật</Text>
                    <Text style={styles.time}>5 Jul, 18:30</Text>
                  </View>
                </View>
                <Text style={styles.title}>Hello world</Text>
                <View style={[styles.row, styles.wrap_reaction]}>
                  <View style={[styles.row, styles.item_reaction]}>
                    <Image style={styles.img_reaction} source={ICON.dot} />
                    <Text style={styles.text_reaction}>1</Text>
                  </View>
                </View>
              </View>
            </View>
            <Image style={styles.icon} source={ICON.option} />
          </View>
          <View style={[styles.comment, styles.row]}>
            <View style={styles.row}>
              <View style={styles.wrap_img}>
                <Image style={styles.img} source={ICON.dot} />
              </View>
              <View style={{marginLeft: 10}}>
                <View style={styles.row}>
                  <View style={styles.row}>
                    <Text style={styles.name}>Nguyễn Thanh Nhật</Text>
                    <Text style={styles.time}>5 Jul, 18:30</Text>
                  </View>
                </View>
                <Text style={styles.title}>Hello world</Text>
                <View style={[styles.row, styles.wrap_reaction]}>
                  <View style={[styles.row, styles.item_reaction]}>
                    <Image style={styles.img_reaction} source={ICON.dot} />
                    <Text style={styles.text_reaction}>1</Text>
                  </View>
                </View>
              </View>
            </View>
            <Image style={styles.icon} source={ICON.option} />
          </View>
          <View style={[styles.comment, styles.row]}>
            <View style={styles.row}>
              <View style={styles.wrap_img}>
                <Image style={styles.img} source={ICON.dot} />
              </View>
              <View style={{marginLeft: 10}}>
                <View style={styles.row}>
                  <View style={styles.row}>
                    <Text style={styles.name}>Nguyễn Thanh Nhật</Text>
                    <Text style={styles.time}>5 Jul, 18:30</Text>
                  </View>
                </View>
                <Text style={styles.title}>Hello world</Text>
                <View style={[styles.row, styles.wrap_reaction]}>
                  <View style={[styles.row, styles.item_reaction]}>
                    <Image style={styles.img_reaction} source={ICON.dot} />
                    <Text style={styles.text_reaction}>1</Text>
                  </View>
                </View>
              </View>
            </View>
            <Image style={styles.icon} source={ICON.option} />
          </View>
          <View style={[styles.comment, styles.row]}>
            <View style={styles.row}>
              <View style={styles.wrap_img}>
                <Image style={styles.img} source={ICON.dot} />
              </View>
              <View style={{marginLeft: 10}}>
                <View style={styles.row}>
                  <View style={styles.row}>
                    <Text style={styles.name}>Nguyễn Thanh Nhật</Text>
                    <Text style={styles.time}>5 Jul, 18:30</Text>
                  </View>
                </View>
                <Text style={styles.title}>Hello world</Text>
                <View style={[styles.row, styles.wrap_reaction]}>
                  <View style={[styles.row, styles.item_reaction]}>
                    <Image style={styles.img_reaction} source={ICON.dot} />
                    <Text style={styles.text_reaction}>1</Text>
                  </View>
                </View>
              </View>
            </View>
            <Image style={styles.icon} source={ICON.option} />
          </View>
          <View style={[styles.comment, styles.row]}>
            <View style={styles.row}>
              <View style={styles.wrap_img}>
                <Image style={styles.img} source={ICON.dot} />
              </View>
              <View style={{marginLeft: 10}}>
                <View style={styles.row}>
                  <View style={styles.row}>
                    <Text style={styles.name}>Nguyễn Thanh Nhật</Text>
                    <Text style={styles.time}>5 Jul, 18:30</Text>
                  </View>
                </View>
                <Text style={styles.title}>Hello world</Text>
                <View style={[styles.row, styles.wrap_reaction]}>
                  <View style={[styles.row, styles.item_reaction]}>
                    <Image style={styles.img_reaction} source={ICON.dot} />
                    <Text style={styles.text_reaction}>1</Text>
                  </View>
                </View>
              </View>
            </View>
            <Image style={styles.icon} source={ICON.option} />
          </View>
        </ScrollView>
        <View style={[styles.row, styles.form]}>
          <TextInput style={styles.input} />
          <Image source={ICON.send} style={[styles.img, styles.send]} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  comment: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.gray_light,
    justifyContent: 'space-between',
  },
  wrap_img: {
    borderRadius: 50,
  },
  img: {
    width: 40,
    height: 40,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  time: {
    color: COLOR.gray_dark,
    fontSize: 15,
    alignSelf: 'center',
  },
  title: {
    color: COLOR.black,
    fontSize: 20,
  },
  icon: {
    width: 20,
    height: 20,
  },
  wrap_reaction: {
    marginTop: 10,
  },
  item_reaction: {
    padding: 5,
    marginRight: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLOR.black,
  },
  text_reaction: {
    fontSize: 15,
  },
  img_reaction: {
    width: 20,
    height: 20,
  },
  form: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: COLOR.gray_light,
  },
  input: {
    padding: 10,
    fontSize: 20,
    minWidth: '80%',
  },
  attach: {
    tintColor: COLOR.gray_dark,
  },
  send: {
    backgroundColor: COLOR.red_light,
    tintColor: COLOR.white,
    borderRadius: 50,
    padding: 5,
  },
});
