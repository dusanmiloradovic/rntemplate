import React, { Component } from "react";
import { View, Text, Image, Platform } from "react-native";
import { Input, Button } from "react-native-elements";
import NavigationService from "../navigation/NavigationService";
import { showMessage, hideMessage } from "react-native-flash-message";
import { maxLogin } from "mplus-react";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", error: "" };
  }

  login = () => {
    const setLoggedIn = this.props.setLoggedIn;
    maxLogin(
      this.state.username,
      this.state.password,
      () => {
        setLoggedIn(true);
      },
      err =>
        showMessage({
          message: "Invalid Username or Password",
          type: "error",
          position: "top",
          duration: 2000,
          color: "white",
          backgroundColor: "red",
          icon: "warning"
        })
    );
  };
  render() {
    return (
      <View>
        <View>
          <Text>{this.state.error}</Text>
        </View>

        <View style={{ marginTop: "20%", marginLeft: "5%", marginRight: "5%" }}>
          <Input
            placeholder="Username"
            leftIcon={{ type: "font-awesome", name: "user" }}
            leftIconContainerStyle={{ marginRight: 5 }}
            onChangeText={text => this.setState({ username: text })}
          />
          <Input
            placeholder="Password"
            secureTextEntry={true}
            leftIcon={{ type: "font-awesome", name: "lock" }}
            leftIconContainerStyle={{ marginRight: 5 }}
            onChangeText={text => this.setState({ password: text })}
          />
          <View style={{ marginTop: "20%" }}>
            <Button title="Sign In" onPress={this.login} />
          </View>
        </View>
      </View>
    );
  }
}
