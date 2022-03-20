import React from "react";
import { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { signUp } from "../src/firebase/config";

function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    signUp(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const data = { id: uid, email }; //can put more data to transfer to homepage
        navigation.navigate("Login");
        console.log("REGISTRATION SUCCESSFUL");
      })

      .catch((error) => {
        alert(error);
      });

    // navigation.navigate("Home");
  };

  return (
    <View
      style={styles.container}
      justifyContent="center"
      accessibilityRole="form"
    >
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Text style={styles.text}>Register</Text>
        {/* <Text onPress={() => navigation.navigate("Notes")}>Logi Screen</Text>
        <Text onPress={() => navigation.navigate("Sign")}>Sign Up</Text> */}
        <View style={{ marginTop: 100 }}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={(email) => setEmail(email)}
            placeholder="Enter Email"
            keyboardType="email-address"
          ></TextInput>
          <TextInput
            style={styles.inputStyle}
            onChangeText={(password) => setPassword(password)}
            placeholder="Enter Password"
            keyboardType="default"
            secureTextEntry
          ></TextInput>

          <TouchableOpacity onPress={handleSubmit}>
            <View style={styles.btn}>
              <Text style={styles.btntitle}>Register</Text>
            </View>
          </TouchableOpacity>
              <Text
                style={styles.signtext}
                onPress={() => navigation.navigate("Login")}
              >
                Back to Login
              </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c0d9f0",
  },
  text: {
    color: "black",
    fontSize: 70,
    fontWeight: "bold",
    justifyContent: "center",
    marginTop: 150,
    marginLeft: 30,
    marginRight: 30,
    alignItems: "center",
  },
  section: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputStyle: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    color: "black",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
  },
  btn: {
    backgroundColor: "#788eec",
    marginLeft: 100,
    marginRight: 100,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  btntitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  signtext: {
    marginLeft: 100,
    marginRight: 100,
    color: "blue",
    marginTop: 10,
    fontSize: 10,
  },
});
