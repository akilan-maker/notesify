import React, { Component, useState, useRef } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Button,
} from "react-native";

import { logIn } from "../src/firebase/config";

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    logIn(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const data = { id: uid, email }; //can put more data to transfer to homepage
        navigation.navigate("Home");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, width: "100%" }}
      keyboardShouldPersistTaps="always"
    >
      <ScrollView>
        <View
          style={styles.container}
          justifyContent="center"
          accessibilityRole="form"
        >
          <Text style={styles.text}>Notesify</Text>

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
                <Text style={styles.btntitle}>Log In</Text>
              </View>
            </TouchableOpacity>
            <Text
              style={styles.signtext}
              onPress={() => navigation.navigate("Register")}
            >
              Don't have an Account? Sign Up now
            </Text>
            <Text style={{ marginTop: 50 }}></Text>
            <Text style={styles.word}>
              Created by Akilan (Ngee Ann Polytechnic)
            </Text>
            <Text style={styles.word}>For testing purposes: </Text>
            <Text style={styles.word}>email : testemail@gmail.com</Text>
            <Text style={styles.word}>password : test12345</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
export default LoginScreen;

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
  word: {
    color: "black",
    fontSize: 20,
    justifyContent: "center",
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

//https://www.youtube.com/watch?v=_Kv965pA-j8
//https://www.freecodecamp.org/news/react-native-firebase-tutorial/
