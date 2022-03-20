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
} from "react-native";
import { UserData } from "../src/firebase/config";
import {
  getDoc,
  updateDoc,
  getFirestore,
  doc,
  deleteDoc,
} from "firebase/firestore";

function taskviewer({ route }) {
  const db = getFirestore();
  const currentUser = UserData();
  const [items, setItems] = useState("");
  const [read, setRead] = useState("");

 


  async function handleSave() {
    Keyboard.dismiss();
    try {
      const docRef = await updateDoc(
        doc(db, currentUser.email, route.params.taskName),
        {
          items: items,
        }
      );
    } catch (e) {
      console.error("Error updating: ", e);
    }
  }
  async function handleDel() {
    Keyboard.dismiss();
    try {
      await deleteDoc(doc(db, currentUser.email, route.params.taskName));
    } catch (e) {
      console.error("Error deleting: ", e);
    }
  }

 const handleRead = async() => {
    Keyboard.dismiss();
    try {
      // this getDoc only gets ONE DOCUMENT!!!!
      const querySnapshot = await getDoc(doc(db, currentUser.email, route.params.taskName));
      // usersData.push(doc.data());
      var data = querySnapshot.data();
      console.log("task is " + data.items);
      setRead(data.items);
      console.log(read);
    } catch (e) {
      console.log(e);
    }
  }
  // poopoo@gmail.com
  useEffect(()=>{
    handleRead();
  },[])


  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.input}>
          <TextInput
            style={styles.inputBox}
            placeholder={"write a task"}
            multiline={true}
            scrollEnabled={true}
            onChangeText={(text) => setItems(text)}
          >{read}</TextInput>
        </View>
        <Text style={styles.readtxt}>{read}</Text>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.writeTaskWrapper}
        >
          <TouchableOpacity onPress={() => handleSave()}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>Save</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDel()}>
            <View style={styles.delWrapper}>
              <Text style={styles.addText}>Delete</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleRead()}>
            <View style={styles.delWrapper}>
              <Text style={styles.addText}>Read</Text>
            </View>
          </TouchableOpacity>
          {/* THIS ONE IS FOR ADDING PDF AND IMAGES ^^^ */}
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
}

export default taskviewer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c0d9f0",
  },

  sectionTitle: {
    fontSize: 45,
    fontWeight: "bold",
  },

  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  inputBox: {
    height: 350,
    width: 400,
    paddingLeft: 15,
    paddingTop: 15,
    backgroundColor: "#fff",
    borderRadius: 20,
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  readtxt: {
    flex: 1,

    paddingTop: 150,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  addWrapper: {
    width: 60,
    height: 30,
    borderColor: "#FFFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  delWrapper: {
    width: 60,
    height: 30,
    borderColor: "#FFFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "100",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {},
  scrollView: {},
});
