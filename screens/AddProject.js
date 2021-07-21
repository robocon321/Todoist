import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Switch,
  TouchableWithoutFeedback,
} from 'react-native';
import {TextInput, RadioButton} from 'react-native-paper';
import {connect} from 'react-redux';
import colorType from '../constants/colorType';
import * as ACTION from '../constants/actionType';
import AddProjectTopbar from '../components/AddProjectTopbar';
import AddLabelBottomPopUp from '../components/AddLabelBottomPopUp';
import * as COLOR from '../constants/colors';
import * as ICON from '../constants/icons';

class AddProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      project: {
        title: '',
        parentId: null,
        viewType: 1,
        colorType: 1,
        favorite: false,
      },
    };
  }

  onExit = () => {
    this.props.navigation.goBack();
  };

  onSelectViewType = viewType => {
    this.setState({
      ...this.state,
      project: {
        ...this.state.project,
        viewType,
      },
    });
  };

  render() {
    const {project} = this.state;
    return (
      <View style={styles.container}>
        <AddProjectTopbar onExit={this.onExit} />
        <TextInput
          label="Name"
          value={project.title}
          mode="outlined"
          selectionColor={COLOR.red_light}
          style={styles.input}
          theme={{
            colors: {primary: COLOR.red_light},
          }}
          autoFocus
        />
        <TouchableWithoutFeedback>
          <View style={styles.row}>
            <Image source={ICON.list} style={styles.icon} />
            <View>
              <Text style={styles.title}>Color</Text>
              <Text style={styles.content}>
                {colorType.find(item => item.id == project.colorType).name}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <View style={styles.row}>
            <Image source={ICON.new_user} style={styles.icon} />
            <View>
              <Text style={styles.title}>Collaborators</Text>
              <Text style={styles.content}>No collaborators</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <View style={styles.row}>
            <Image source={ICON.parent} style={styles.icon} />
            <View>
              <Text style={styles.title}>Parent</Text>
              <Text style={styles.content}>No parent</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.row}>
          <Image source={ICON.star} style={styles.icon} />
          <Text style={styles.title}>Favorite</Text>
          <Switch style={styles.switch} value={project.favorite} />
        </View>
        <View style={styles.row}>
          <Image source={ICON.view} style={styles.icon} />
          <View>
            <Text style={styles.title}>View</Text>
          </View>
        </View>
        <View style={styles.row}>
          <TouchableWithoutFeedback onPress={() => this.onSelectViewType(1)}>
            <Image
              source={ICON.list_2}
              style={[
                styles.image,
                project.viewType === 1 ? styles.border : {},
              ]}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.onSelectViewType(2)}>
            <Image
              source={ICON.grid}
              style={[
                styles.image,
                project.viewType === 2 ? styles.border : {},
              ]}
            />
          </TouchableWithoutFeedback>
        </View>
        <View style={[styles.row, styles.radio]}>
          <RadioButton
            value={1}
            status={project.viewType === 1 ? 'checked' : 'unchecked'}
            onPress={() => this.onSelectViewType(1)}
          />
          <Text style={[styles.title, {marginRight: 60}]}>List</Text>
          <RadioButton
            value={2}
            status={project.viewType === 2 ? 'checked' : 'unchecked'}
            onPress={() => this.onSelectViewType(2)}
          />
          <Text style={[styles.title]}>Board</Text>
        </View>
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
    marginVertical: 5,
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
  image: {
    marginLeft: 60,
    width: 80,
    height: 80,
  },
  radio: {
    marginLeft: 60,
  },
  border: {
    borderWidth: 2,
    borderColor: COLOR.red_dark,
  },
});

const mapDispatcherToProps = dispatch => {
  return {
    // Todo
  };
};

export default connect(null, mapDispatcherToProps)(AddProject);
