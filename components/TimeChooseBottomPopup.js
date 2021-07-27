/* eslint-disable react-native/no-inline-styles */
import React, {createRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import * as COLOR from '../constants/colors';
import * as ICON from '../constants/icons';
import DateChooseBottomPopup from './DateChooseBottomPopup';

const {height} = Dimensions.get('window');
export default class TimeChooseBottomPopup extends React.Component {
  constructor(props) {
    super(props);
    this.levelBottom = [-height, -200, 0];
    this.state = {
      bottom: 0,
      currentPopUpY: 0,
      visible: false,
    };
    this.ref = createRef();
  }

  onPress = e => {
    const {locationY} = e.nativeEvent;
    this.setState({
      ...this.state,
      currentPopUpY: locationY,
    });
  };

  onMove = e => {
    const {pageY} = e.nativeEvent;
    const {currentPopUpY} = this.state;
    const bottom = height - pageY - (this.heightComponent - currentPopUpY);
    if (bottom < 0) {
      this.setState({
        ...this.state,
        bottom,
      });
    }
  };

  onRelease = e => {
    const {bottom} = this.state;
    if (bottom < this.levelBottom[0]) {
      this.setState({
        ...this.state,
        bottom: -this.heightComponent,
        visible: false,
      });
    } else if (
      bottom > this.levelBottom[0] &&
      bottom < this.levelBottom[1] + 50
    ) {
      this.setState({
        ...this.state,
        bottom: this.levelBottom[1],
      });
    } else {
      this.setState({
        ...this.state,
        bottom: this.levelBottom[2],
      });
    }
  };

  onShowPopup = () => {
    this.setState({
      ...this.state,
      bottom: this.levelBottom[1],
      visible: true,
    });
  };

  onClosePopup = () => {
    this.setState({
      ...this.state,
      visible: false,
    });
  };

  onLayout = e => {
    const {layout} = e.nativeEvent;
    this.heightComponent = layout.height;
  };

  render() {
    const {bottom, visible} = this.state;
    return (
      <Modal animationType="fade" visible={visible} transparent={true}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#000000AA',
            justifyContent: 'flex-end',
          }}>
          <TouchableWithoutFeedback onPress={this.onClosePopup}>
            <View style={{flex: 1, width: '100%'}}>
              <View
                style={[
                  styles.container,
                  {position: 'absolute', bottom: bottom},
                ]}
                onStartShouldSetResponder={() => true}
                onMoveShouldSetResponder={() => true}
                onLayout={this.onLayout}
                onResponderGrant={this.onPress}
                onResponderRelease={this.onRelease}
                onResponderMove={this.onMove}>
                <View>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      this.ref.current.onShowPopup();
                    }}>
                    <View style={[styles.row, styles.borderBottom]}>
                      <View style={styles.row}>
                        <Image style={styles.image} source={ICON.pen} />
                        <Text style={styles.title}>26 Jul</Text>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                  <View style={styles.row}>
                    <View style={styles.row}>
                      <Image
                        style={[styles.image, {tintColor: COLOR.orange_dark}]}
                        source={ICON.sun}
                      />
                      <Text style={[styles.title, {fontWeight: 'bold'}]}>
                        Tomorrow
                      </Text>
                    </View>
                    <Text style={styles.content}>Tue</Text>
                  </View>
                  <View style={styles.row}>
                    <View style={styles.row}>
                      <Image
                        style={[styles.image, {tintColor: COLOR.purple_dark}]}
                        source={ICON.week}
                      />
                      <Text style={[styles.title, {fontWeight: 'bold'}]}>
                        Later this week
                      </Text>
                    </View>
                    <Text style={styles.content}>Web</Text>
                  </View>
                  <View style={styles.row}>
                    <View style={styles.row}>
                      <Image
                        style={[styles.image, {tintColor: COLOR.blue_dark}]}
                        source={ICON.chair}
                      />
                      <Text style={[styles.title, {fontWeight: 'bold'}]}>
                        This weekend
                      </Text>
                    </View>
                    <Text style={styles.content}>Sat</Text>
                  </View>
                  <View style={styles.row}>
                    <View style={styles.row}>
                      <Image
                        style={[styles.image, {tintColor: COLOR.purple_dark}]}
                        source={ICON.next_week}
                      />
                      <Text style={[styles.title, {fontWeight: 'bold'}]}>
                        Next weekend
                      </Text>
                    </View>
                    <Text style={styles.content}>Mon (2 Aug)</Text>
                  </View>
                  <View style={styles.row}>
                    <View style={styles.row}>
                      <Image
                        style={[styles.image, {tintColor: COLOR.gray_dark}]}
                        source={ICON.no}
                      />
                      <Text style={[styles.title, {fontWeight: 'bold'}]}>
                        No date
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View
          style={[
            styles.row,
            {
              backgroundColor: COLOR.white,
              position: 'absolute',
              bottom: 0,
              width: '100%',
            },
          ]}>
          <View style={styles.row}>
            <Image
              style={[styles.image, {tintColor: COLOR.red_light}]}
              source={ICON.add}
            />
            <Text style={[styles.title, {color: COLOR.red_light}]}>
              TIME ZONE
            </Text>
          </View>
          <Text
            style={[
              styles.content,
              {color: COLOR.red_light, paddingHorizontal: 20},
            ]}>
            RESCHEDULE
          </Text>
        </View>
        <DateChooseBottomPopup ref={this.ref} />
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    width: '100%',
    height: height - 150,
    backgroundColor: COLOR.white,
    elevation: 4,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  image: {
    width: 30,
    height: 30,
  },
  title: {
    marginLeft: 20,
    fontSize: 20,
  },
  content: {
    marginLeft: 20,
    fontSize: 20,
    color: COLOR.gray_dark,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderColor: COLOR.gray_light,
  },
});
