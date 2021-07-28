/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import {CalendarList} from 'react-native-calendars';
import * as COLOR from '../constants/colors';

const {height} = Dimensions.get('window');
export default class DateChooseBottomPopup extends React.Component {
  constructor(props) {
    super(props);
    this.levelBottom = [-height, -200, 0];
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    this.state = {
      bottom: 0,
      currentPopUpY: 0,
      visible: false,
      choose: `${year}-${month < 10 ? `0${month}` : month}-${
        day < 10 ? `0${day}` : day
      }`,
    };
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

  onDayPress = day => {
    this.setState({
      ...this.state,
      choose: day.dateString,
    });
  };

  onVisibleMonthsChange = months => {
    // Todo
  };

  render() {
    const {bottom, visible, choose} = this.state;
    const {onChangeDate} = this.props;
    const chooseStyle = {};
    chooseStyle[choose] = {
      customStyles: {
        container: {
          backgroundColor: COLOR.red_light,
        },
        text: {
          color: COLOR.white,
        },
      },
    };
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
                style={[styles.container, {bottom: bottom}]}
                onStartShouldSetResponder={() => true}
                onMoveShouldSetResponder={() => true}
                onResponderGrant={this.onPress}
                onResponderRelease={this.onRelease}
                onResponderMove={this.onMove}>
                <CalendarList
                  onVisibleMonthsChange={this.onVisibleMonthsChange}
                  onDayPress={this.onDayPress}
                  minDate={Date.now()}
                  pastScrollRange={50}
                  futureScrollRange={50}
                  scrollEnabled={true}
                  showScrollIndicator={true}
                  markingType={'custom'}
                  markedDates={chooseStyle}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
          <View style={[styles.row, styles.bottomAction]}>
            <TouchableWithoutFeedback
              onPress={() => {
                onChangeDate(choose);
                this.onClosePopup();
              }}>
              <Text style={styles.option}>OK</Text>
            </TouchableWithoutFeedback>
            <Text style={styles.info}>
              {new Date(choose).toDateString()} , 0 tasks due
            </Text>
            <TouchableWithoutFeedback onPress={() => this.onClosePopup()}>
              <Text style={styles.option}>Cancel</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
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
    padding: 10,
  },
  option: {
    marginLeft: 20,
    fontSize: 20,
    color: COLOR.red_light,
    alignContent: 'center',
  },
  info: {
    fontSize: 15,
    color: COLOR.gray_dark,
  },
  bottomAction: {
    backgroundColor: COLOR.white,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingVertical: 20,
    elevation: 14,
  },
});
