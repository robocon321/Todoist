import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import colorType from '../constants/colorType';
import * as COLOR from '../constants/colors';
import * as ICON from '../constants/icons';

const {height} = Dimensions.get('window');

const Item = props => {
  const {id, name, code, onChangeColor} = props;
  return (
    <TouchableWithoutFeedback onPress={() => onChangeColor(id)}>
      <View style={[styles.row, {paddingVertical: 5}]}>
        <Image source={ICON.label} style={[styles.icon, {tintColor: code}]} />
        <Text style={[styles.title, {color: code, marginLeft: 20}]}>
          {name}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default class ColorChoose extends React.Component {
  constructor(props) {
    super(props);
    this.levelBottom = [-400, -200, 0];
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
    const {bottom, visible} = this.state;
    const {onChangeColor} = this.props;
    return (
      <Modal animationType="fade" visible={visible} transparent={true}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#000000AA',
            justifyContent: 'flex-end',
          }}>
          <TouchableWithoutFeedback onPress={this.onClosePopup}>
            <View style={{flex: 1, width: '100%'}} />
          </TouchableWithoutFeedback>
          <View
            style={[styles.container, {bottom: bottom}]}
            onLayout={this.onLayout}
            onStartShouldSetResponder={() => true}
            onMoveShouldSetResponder={() => true}
            onResponderGrant={this.onPress}
            onResponderRelease={this.onRelease}
            onResponderMove={this.onMove}>
            <Text style={styles.title}>Color</Text>
            <FlatList
              data={colorType}
              renderItem={({item}) => (
                <Item
                  id={item.id}
                  name={item.name}
                  code={item.code}
                  onChangeColor={onChangeColor}
                />
              )}
              keyExtractor={item => `${item.id}`}
            />
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
    alignItems: 'center',
  },
  container: {
    position: 'absolute',
    width: '100%',
    height: 450,
    backgroundColor: COLOR.white,
    elevation: 4,
    borderRadius: 20,
    padding: 20,
  },
  icon: {
    width: 20,
    height: 20,
  },
  title: {
    color: COLOR.black,
    fontSize: 20,
  },
});
