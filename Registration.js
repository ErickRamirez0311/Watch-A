import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { firebase } from '../config'

const Registration = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [consumo, setConsumo] =useState('')


    registerUser = async (email, password, firstName, lastName, consumo) => {
        await firebase.auth().createUserWithEmailAndPassword(email, password, consumo)
        .then(() => {
            firebase.auth().currentUser.sendEmailVerification({
                handleCodeInApp: true,
                url:'https://watch-a-85228.firebaseapp.com',
            })
            .then(() => {
                alert('Verification email sent')
            }).catch((error) =>{
                alert(error.message)
            })
            .then(() => {
                firebase.firestore().collection('users')
                .doc(firebase.auth().currentUser.uid)
                .set({
                    firstName,
                    lastName,
                    email,
                })
            })
            .catch((error) => {
                alert(error.message)
            })
        })
        .catch((error => {
            alert(error.message)
        }))

    }

    return(
        <View style={StyleSheet.container}>
            <Text style={{fontWeight: 'bold', 'fontSize':23}}>
                Register Here!
            </Text>
            <View style={{marginTop:40}}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Nombre(s)"
                    onChangeText={(firstName) => setFirstName(firstName)}
                    autoCorrect={false}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Apellidos"
                    onChangeText={(lastName) => setLastName(lastName)}
                    autoCorrect={false}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Ultimo consumo"
                    onChangeText={(consumo) => setConsumo(consumo)}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Email"
                    onChangeText={(email) => setEmail(email)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Contraseña"
                    onChangeText={(password) => setPassword(password)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                />
            </View>
            <TouchableOpacity
                onPress={() => registerUser(email, password, firstName, lastName, consumo)}
                style={styles.button}
            >
                <Text style={{fontWeight:'bold', fontSize:22}}>Register</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Registration

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        marginTop:100,
    },
    textInput: {
        paddingTop:20,
        paddingBottom:10,
        width:400,
        fontSize:20,
        borderBottomWidth:1,
        borderBottomColor:'000',
        marginBottom:10,
        textAlign:'center',
    },
    button:{
        marginTop:50,
        height:70,
        width:250,
        backgroundColor:'#026efd',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:50,
    }
})
