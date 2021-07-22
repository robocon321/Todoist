import React from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import * as COLOR from '../constants/colors';
import * as ICON from '../constants/icons';

const {height} = Dimensions.get('window');

const Label = key => {
  return (
    <Text style={styles.tag} key={key}>
      @Label
    </Text>
  );
};

const Project = key => {
  return (
    <Text style={styles.tag} key={key}>
      #Project
    </Text>
  );
};

const Date = key => {
  return (
    <Text style={styles.tag} key={key}>
      Text
    </Text>
  );
};

class TaskBottomPopUp_Add extends React.Component {
  constructor(props) {
    super(props);
    this.levelBottom = [-300, -200, 0];
    this.state = {
      bottom: 0,
      currentPopUpY: 0,
      visible: false,
      inputAddTask: [
        {
          component: key => Date(key),
        },
        {
          component: key => (
            <TextInput key={key} autoFocus placeholder="@Label, #Project" />
          ),
        },
      ],
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
    this.setState({
      ...this.state,
      bottom: height - pageY - (this.heightComponent - currentPopUpY),
    });
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
    const {bottom, visible, inputAddTask} = this.state;
    return (
      <Modal animationType="fade" visible={visible} transparent={true}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#000000AA',
            justifyContent: 'flex-end',
          }}>
          <TouchableWithoutFeedback onPress={this.onClosePopup}>
            <View style={{flex: 1, width: '100%'}}></View>
          </TouchableWithoutFeedback>
          <View
            style={[styles.container, {bottom: bottom}]}
            onLayout={this.onLayout}
            onStartShouldSetResponder={() => true}
            onMoveShouldSetResponder={() => true}
            onResponderGrant={this.onPress}
            onResponderRelease={this.onRelease}
            onResponderMove={this.onMove}>
            <View style={[styles.row, {alignItems: 'center'}]}>
              {inputAddTask.map((item, index) => {
                return item.component(index);
              })}
            </View>
            <View style={styles.row}>
              <View style={styles.wrap}>
                <Image
                  source={ICON.calendar}
                  style={[styles.icon, {tintColor: COLOR.green_dark}]}
                />
                <Text style={[styles.text, {color: COLOR.green_dark}]}>
                  Today
                </Text>
              </View>
              <View style={styles.wrap}>
                <Image
                  source={ICON.inbox}
                  style={[styles.icon, {tintColor: COLOR.blue_dark}]}
                />
                <Text style={styles.text}>Inbox</Text>
              </View>
            </View>
            <View
              style={[
                styles.row,
                {justifyContent: 'space-between', alignItems: 'center'},
              ]}>
              <View style={styles.row}>
                <Image
                  style={[styles.iconOption, {marginRight: 30}]}
                  source={ICON.label}
                />
                <Image
                  style={[styles.iconOption, {marginRight: 30}]}
                  source={ICON.flag}
                />
                <Image
                  style={[styles.iconOption, {marginRight: 30}]}
                  source={ICON.alarm}
                />
                <Image
                  style={[styles.iconOption, {marginRight: 30}]}
                  source={ICON.comment}
                />
              </View>
              <View style={[styles.row, styles.right]}>
                <Image
                  style={[styles.iconOption, {tintColor: COLOR.white}]}
                  source={ICON.send}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  container: {
    position: 'absolute',
    width: '100%',
    height: 400,
    backgroundColor: COLOR.white,
    elevation: 4,
    borderRadius: 20,
    padding: 20,
  },
  wrap: {
    flexDirection: 'row',
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLOR.gray_light,
    marginRight: 20,
    justifyContent: 'center',
  },
  icon: {
    width: 20,
    height: 20,
  },
  text: {
    fontSize: 15,
    paddingLeft: 10,
  },
  iconOption: {
    width: 30,
    height: 30,
    tintColor: COLOR.gray_dark,
  },
  right: {
    backgroundColor: COLOR.red_light,
    borderRadius: 50,
    padding: 5,
  },
  tag: {backgroundColor: COLOR.pink_light, padding: 5},
});

const mapStateToProps = state => {
  return {
    labels: state.labels,
    projects: state.projects,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // To do
  };
};

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(TaskBottomPopUp_Add);
