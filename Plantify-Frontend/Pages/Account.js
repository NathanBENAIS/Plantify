
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,ScrollView } from 'react-native';


const Account = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textAccount}>Réglage</Text>
      <Text style={styles.hr} />
      <Text>{"\n"}</Text>
      <View style={styles.containerText}>

        <Text>{"\n"}</Text>
        <Text style={styles.textAccount}>Mon historique</Text>

      <Text style={styles.hr} />
    

      
        <Text style={styles.textAccount}>Mes favoris</Text>
      <Text style={styles.hr} />
   

     
        <Text style={styles.textAccount}>Autorisations</Text>
      <Text style={styles.hr} />
    
      
        <Text style={styles.textAccount}>Support</Text>
        <Text style={styles.hr} />
     
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,  
  },
  
  title: {
    fontSize: 20,   
    marginBottom: 40,
    padding: 20,
    fontSize: 30,
    color:'#CEB876',
    backgroundColor: '#6E1C40',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  containerText: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 150,
    
  },
  textAccount: {
    justifyContent: 'center',
    padding:15,
    fontWeight: '700',
    fontSize: 25,
    lineHeight: 60,
    color: '#3F1524',
    marginBottom: 0,
    marginTop:10,
  },
  hr: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 2,
 
  
  },
});

export default Account;
