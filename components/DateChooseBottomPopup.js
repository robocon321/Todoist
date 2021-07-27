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
import * as ICON from '../constants/icons';

const {height} = Dimensions.get('window');
export default class DateChooseBottomPopup extends React.Component {
  constructor(props) {
    super(props);
    this.levelBottom = [-height, -200, 0];
    this.state = {
      bottom: 0,
      currentPopUpY: 0,
      visible: false,
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
    console.log(1);
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
                style={[styles.container, {bottom: bottom}]}
                onStartShouldSetResponder={() => true}
                onMoveShouldSetResponder={() => true}
                onResponderGrant={this.onPress}
                onResponderRelease={this.onRelease}
                onResponderMove={this.onMove}>
                <CalendarList
                  onVisibleMonthsChange={months => {
                    console.log('now these months are visible', months);
                  }}
                  current={Date.now()}
                  minDate={Date.now()}
                  pastScrollRange={50}
                  futureScrollRange={50}
                  scrollEnabled={true}
                  showScrollIndicator={true}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
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
