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
import DateTimePicker from '@react-native-community/datetimepicker';
import * as COLOR from '../constants/colors';
import * as ICON from '../constants/icons';
import DateChooseBottomPopup from './DateChooseBottomPopup';

const {height} = Dimensions.get('window');
const dayOfWeekName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default class TimeChooseBottomPopup extends React.Component {
  constructor(props) {
    super(props);
    this.levelBottom = [-height, -200, 0];
    this.state = {
      bottom: 0,
      currentPopUpY: 0,
      visible: false,
      time: new Date(),
      isShowPicker: false,
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

  nextDate = n => {
    let {time} = this.state;
    let current = new Date();

    current.setDate(current.getDate() + n);
    current.setHours(time.getHours());
    current.setMinutes(time.getMinutes());

    this.setState({
      ...this.state,
      time: current,
    });
  };

  onChangeDate = date => {
    let {time} = this.state;
    const hour = time.getHours();
    const minute = time.getMinutes();

    time = new Date(date);
    time.setHours(hour);
    time.setMinutes(minute);

    this.setState({
      ...this.state,
      time,
    });
  };

  onChangeTime = ({type}, selectedDate) => {
    if (type === 'set') {
      this.setState({...this.state, time: selectedDate, isShowPicker: false});
    } else {
      this.setState({...this.state, isShowPicker: false});
    }
  };

  onLayout = e => {
    const {layout} = e.nativeEvent;
    this.heightComponent = layout.height;
  };

  onReschedule = () => {
    this.props.onChangeTime(this.state.time);
    this.onClosePopup();
  };

  render() {
    const {bottom, visible, isShowPicker, time} = this.state;
    let timeStr =
      time.toDateString() + ` ${time.getHours()}:${time.getMinutes()}`;
    let date = new Date();
    date.setHours(0, 0, 0, 0);

    return (
      <Modal animationType="fade" visible={visible} transparent={true}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#000000AA',
            justifyContent: 'flex-end',
          }}>
          {isShowPicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={time}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={this.onChangeTime}
            />
          )}
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
                  <View style={[styles.row, styles.borderBottom]}>
                    <View style={styles.row}>
                      <Text style={styles.title}>{timeStr}</Text>
                    </View>
                  </View>
                  <TouchableWithoutFeedback onPress={() => this.nextDate(1)}>
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
                      <Text style={styles.content}>
                        {dayOfWeekName[(date.getDay() + 1) % 7]}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={() => this.nextDate(2)}>
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
                      <Text style={styles.content}>
                        {dayOfWeekName[(date.getDay() + 2) % 7]}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback
                    onPress={() => this.nextDate(6 - new Date().getDay())}>
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
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={() => this.nextDate(7)}>
                    <View style={[styles.row, styles.borderBottom]}>
                      <View style={styles.row}>
                        <Image
                          style={[styles.image, {tintColor: COLOR.purple_dark}]}
                          source={ICON.next_week}
                        />
                        <Text style={[styles.title, {fontWeight: 'bold'}]}>
                          Next week
                        </Text>
                      </View>
                      <Text style={styles.content}>
                        {dayOfWeekName[time.getDay()]}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      this.ref.current.onShowPopup();
                    }}>
                    <View style={styles.row}>
                      <View style={styles.row}>
                        <Image style={styles.image} source={ICON.pen} />
                        <Text style={[styles.title, {fontWeight: 'bold'}]}>
                          Choose
                        </Text>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
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
          <TouchableWithoutFeedback
            onPress={() => this.setState({...this.state, isShowPicker: true})}>
            <View style={styles.row}>
              <Image
                style={[styles.image, {tintColor: COLOR.red_light}]}
                source={ICON.add}
              />
              <Text style={[styles.title, {color: COLOR.red_light}]}>
                TIME ZONE
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.onReschedule()}>
            <Text
              style={[
                styles.content,
                {color: COLOR.red_light, paddingHorizontal: 20},
              ]}>
              RESCHEDULE
            </Text>
          </TouchableWithoutFeedback>
        </View>
        <DateChooseBottomPopup
          ref={this.ref}
          onChangeDate={this.onChangeDate}
        />
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
