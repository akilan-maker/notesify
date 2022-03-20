import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";


const Task = ({task,id}) => {
  console.log("task passed");
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={styles.square}></View>
        <Text style={styles.itemText} key={id} >{task}</Text>
      </View>
      {/* <div className='btn-container'>
      <button type="button" className="delete-btn" onClick={()=>{console.log('pressed')}}>
        <FaTrash/>
      </button>
      </div> */}
      <Text style={styles.circular}></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: "#55BCF6",
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: "80%",
    backgroundColor: "#FFF",
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: "transparent",
    borderWidth: 2,
    borderRadius: 5,
  },
});

export default Task;
