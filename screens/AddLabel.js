import React, {createRef} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Switch,
  TouchableWithoutFeedback,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import colorType from '../constants/colorType';
import AddLabelTopbar from '../components/AddLabelTopbar';
import AddLabelBottomPopUp from '../components/AddLabelBottomPopUp';
import * as COLOR from '../constants/colors';
import * as ICON from '../constants/icons';

export default class AddLabel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: {
        text: '',
        colorType: 1,
        favorite: false,
      },
    };
    this.refPopUp = createRef();
  }

  onSaveLabel = () => {
    
  }

  onChangeStatusFavorite = () => {
    this.setState({
      ...this.state,
      label: {
        ...this.state.label,
        favorite: !this.state.label.favorite,
      },
    });
  };

  onChangeColor = id => {
    this.setState({
      ...this.state,
      label: {
        ...this.state.label,
        colorType: id,
      },
    });
  };

  onChangeText = text => {
    this.setState({
      ...this.state,
      label: {
        ...this.state.label,
        text: text,
      },
    });
    console.log(text, this.state);
  };

  onShowPopup = () => {
    this.refPopUp.current.onShowPopup();
  };

  render() {
    const {label} = this.state;
    return (
      <View style={styles.container}>
        <AddLabelTopbar />
        <TextInput
          onChangeText={text => this.onChangeText(text)}
          label="Title"
          value={label.text}
          mode="outlined"
          selectionColor={COLOR.red_light}
          style={styles.input}
          theme={{
            colors: {primary: COLOR.red_light},
          }}
          autoFocus
        />
        <TouchableWithoutFeedback onPress={() => this.onShowPopup()}>
          <View style={styles.row}>
            <Image source={ICON.label} style={styles.icon} />
            <View>
              <Text style={styles.title}>Color</Text>
              <Text style={styles.content}>
                {colorType.find(item => item.id == label.colorType).name}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.row}>
          <Image source={ICON.star} style={styles.icon} />
          <Text style={styles.title}>Favorite</Text>
          <Switch
            style={styles.switch}
            value={label.favorite}
            onValueChange={this.onChangeStatusFavorite}
          />
        </View>
        <AddLabelBottomPopUp
          ref={this.refPopUp}
          onChangeColor={this.onChangeColor}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: COLOR.black,
    fontSize: 20,
  },
  content: {
    color: COLOR.gray_dark,
    fontSize: 18,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: COLOR.gray_dark,
    margin: 20,
  },
  switch: {
    marginLeft: 20,
  },
  input:{
    marginHorizontal: 10,
  },
});
