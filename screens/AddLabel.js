import React, {createRef} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Switch,
  TouchableOpacity,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {connect} from 'react-redux';
import colorType from '../constants/colorType';
import * as labelAction from '../actions/labelAction';
import AddLabelTopbar from '../components/AddLabelTopbar';
import ColorChoose from '../components/ColorChoose';
import * as COLOR from '../constants/colors';
import * as ICON from '../constants/icons';

class AddLabel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: {
        title: '',
        colorType: 1,
        favorite: false,
      },
    };
    this.refPopUp = createRef();
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
    this.refPopUp.current.onClosePopup();
  };

  onChangeText = title => {
    this.setState({
      ...this.state,
      label: {
        ...this.state.label,
        title: title,
      },
    });
  };

  onShowPopup = () => {
    this.refPopUp.current.onShowPopup();
  };

  onExit = () => {
    this.props.navigation.goBack();
  };

  onSaveLabel = () => {
    this.props.onSaveLabel(this.state.label);
    this.props.loadLabel();
    this.onExit();
  };

  render() {
    const {label} = this.state;

    return (
      <View style={styles.container}>
        <AddLabelTopbar onSaveLabel={this.onSaveLabel} onExit={this.onExit} />
        <TextInput
          onChangeText={title => this.onChangeText(title)}
          label="Title"
          value={label.title}
          mode="outlined"
          selectionColor={COLOR.red_light}
          style={styles.input}
          theme={{
            colors: {primary: COLOR.red_light},
          }}
          autoFocus
        />
        <TouchableOpacity onPress={() => this.onShowPopup()}>
          <View style={styles.row}>
            <Image source={ICON.label} style={styles.icon} />
            <View>
              <Text style={styles.title}>Color</Text>
              <Text style={styles.content}>
                {colorType.find(item => item.id == label.colorType).name}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.row}>
          <Image source={ICON.star} style={styles.icon} />
          <Text style={styles.title}>Favorite</Text>
          <Switch
            style={styles.switch}
            value={label.favorite}
            onValueChange={this.onChangeStatusFavorite}
          />
        </View>
        <ColorChoose ref={this.refPopUp} onChangeColor={this.onChangeColor} />
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
  input: {
    marginHorizontal: 10,
  },
});

const mapDispatcherToProps = dispatch => {
  return {
    onSaveLabel: label => {
      return dispatch(
        labelAction.insert({id: new Date().getTime().toString(), ...label}),
      );
    },
    loadLabel: labelAction.queryAll(dispatch),
  };
};

export default connect(null, mapDispatcherToProps)(AddLabel);
