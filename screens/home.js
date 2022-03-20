import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Button,
  LogBox,
} from "react-native";

import { UserData, logout } from "../src/firebase/config";
import Task from "../components/task";
import {
  collection,
  getDocs,
  getFirestore,
  setDoc,
  doc,
} from "firebase/firestore";
import { async } from "@firebase/util";
LogBox.ignoreLogs(["Setting a timer"]);

function Home({ navigation }) {
  const db = getFirestore();
  const [task, setTask] = useState("");
  const [items, setItems] = useState("");
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(true);
  const currentUser = UserData();

  async function handleAddTask() {
    console.log(update);

    Keyboard.dismiss();
    try {
      const docRef = await setDoc(doc(db, currentUser.email, task), {
        id: new Date().getTime().toString(),
        task: task,
        items: items,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  // useEffect(
  //   () => {
  //     const currentUser = UserData();
  //     const querySnapshot = getDocs(collection(db, currentUser.email));
  //     querySnapshot.forEach((doc) => {
  //       // usersData.push(doc.data());
  //       var data = doc.data();
  //       console.log("task is " + data.task);
  //       setInfo((arr) => [...arr, data]);
  //     });
  //   },
  //   (error) => {
  //     console.log(error);
  //   }
  // );
  // console.log(NewTask);

  //data update
  // const todoRef = firebase.firestore().collection("notesify");

  // todoRef.push(task);
  // const res = firebase
  //   .firestore()
  //   .collection("notesify")
  //   .doc("user")
  //   .set(task);

  function loggedout() {
    try {
      logout();
      navigation.navigate("Login");
      alert("Logged Out!");
    } catch {
      alert("Error!");
    }
  }
  const ReadDat = async () => {
    setInfo([]);
    try {
      const querySnapshot = await getDocs(collection(db, currentUser.email));
      querySnapshot.forEach((doc) => {
        // usersData.push(doc.data());
        var data = doc.data();
        console.log("task is " + data.task);
        setInfo((arr) => [...arr, data]);
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.taskWrapper}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.sectionTitle}>Notesify</Text>
          <Text style={styles.emcurrentemailTitle}>{currentUser?.email}</Text>
          <Text style={styles.emcurrentemailTitle}>
            {currentUser?.uid}
          </Text>
          <Text style={styles.logoutTitle} onPress={loggedout}>
            log out
          </Text>
          <Button title="Open Task" onPress={ReadDat}></Button>
          <View style={styles.items}>
            {info.map((data) => {
              console.log(data.task);
              return (
                <TouchableOpacity
                  key={data.id}
                  onPress={() => {
                    var taskName = data.task;
                    navigation.navigate("Task", { taskName });
                    // DO THIS 16/12/2021^^^
                    //FIX AUTO READ STORAGE PLS
                  }}
                >
                  <Task task={data.task} id={data.id} />
                </TouchableOpacity>
              );
            })}
          </View>

          {/* THIS IS WHERE THE TASK ADDED WILL APPEAR */}
        </ScrollView>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={"write a task"}
          onChangeText={(text) => setTask(text)}
        ></TextInput>
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
          {/* PUT A SEND ICON FOR ADDING TASK ^^^ */}
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c0d9f0",
  },
  taskWrapper: {
    flex: 1,
    padding: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  emcurrentemailTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  logoutTitle: {
    fontSize: 14,
    fontWeight: "bold",
    paddingLeft: 100,
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 60,
    width: 250,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    borderColor: "#FFFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {},
  scrollView: {},
});
