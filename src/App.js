import React, { useState } from 'react';
import { Text,Modal,Button,TextInput,View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { inline } from 'react-native-web/dist/cjs/exports/StyleSheet/compiler';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

function BalloonPage() {

  const [animation, setAnimation] = useState(new Animated.Value(1));
  var count = 1;

  const handlePressincrease = () => {
    count = count+0.2;
    Animated.timing(animation, {
      toValue: count,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  const handlePressdecrease = () => {
    count = count-0.2;
    Animated.timing(animation, {
      toValue: count,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const animatedStyles = {
    transform: [{ scale: animation}],
    opacity: animation,
    
  };

  return (
    <View style={styles.container}>
    <View style={styles.bol}>
    <Animated.View style={[styles.balloon, animatedStyles]} />
    </View>
    {/* <TouchableOpacity> */}
      <View style={styles.btcontainer}>
      <Text style={styles.button} onPress={handlePressincrease}>Click to inflate balloon</Text>
      <Text style={styles.button} onPress={handlePressdecrease}>Click to decrease balloon</Text>
      </View>
    {/* </TouchableOpacity> */}
    </View>
  );

}

function FormPage() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [response, setResponse] = React.useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email })
      });
      const data = await response.json();
      setResponse(data);
      setModalVisible(true);
      
      
    } catch (error) {
      console.error(error);
      setResponse('Error: ' + error.message);
    }
  };

  return (
    <View>
      <View style={styles.containerform}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <TouchableOpacity onPress={handleSubmit}>
          <Text style={styles.buttonForm}>Submit</Text>
        </TouchableOpacity>
        </View>
        <Modal visible={modalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Form submitted successfully!</Text>
            <Text style={styles.modalText}>Name  :  {response.name} <br/>Email   :  {response.email} <br/>ID        : {response.id}</Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
      </Modal>
    </View>
  );
}
export default function App() {
  return (
    <Router>
      <View style={styles.nav}>
        <Link to="/" style={styles.link}>Click for Balloon</Link>
        <Link to="/form" style={styles.link}>Click for Form</Link>
      </View>
      <Routes>
        <Route exact path="/" element={<BalloonPage />} />
        <Route path="/form" element={<FormPage />} />
      </Routes>
    </Router>
  );
}
const styles = StyleSheet.create({
  bol:{
    transform: [{ rotate: '-45deg' }],
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:150,
    marginBottom:150
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  containerform: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#333',
    borderRadius:20,
    padding: 20,
    marginTop:100,
    marginStart:300,
    marginEnd:300
  },
  response: {
    marginTop: 20,
    fontSize: 16,
    color: 'green'
  },
  balloon: {
    backgroundColor: 'red',
    alignSelf: 'center',
    display:inline,
    width:150,
    height:150,
    borderRightColor:'black',
    borderRightWidth:5,
    shadowColor:'red',
    position:'relative',
    borderTopLeftRadius: 100,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,


  },
  link:{
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
    textDecorationLine: 'none',
    backgroundColor:'white',
    padding:10,
    borderRadius:10
  },
  button: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white',
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 10,
    
  },
  buttonForm: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#333',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    
  },
  btcontainer:{
    display:'flex'

  },
  input: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    margin: 10,
    padding: 5,
    width: '100%',
    color:'white'
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#333',
    height: 50,
  },
  label: {
    fontSize: 20,
    textAlign: 'left',
    color: 'white',
    padding:10,
    margin: 10
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  modalText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  }
});

