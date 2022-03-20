import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

// import Sign from "./screens/signup";
// import Login from "./screens/login";
// import Notes from "./screens/notes";

import Home from "./screens/home";
import Login from "./screens/login";
import Register from "./screens/register";
import Taskviewer from "./screens/tasksviewer";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Task"
          component={Taskviewer}
          options={({route})=>({title:route.params.taskName})}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
