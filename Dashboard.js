import { Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { firebase } from '../config'

//Dashboard principal del usuario (MENU PRINCIPAL)
const Dashboard = () => {
    const [name, setName] = useState('')
    const [consumo, setConsumo] = useState('')

    //Change the password
    const changePassword = () => {
        firebase.auth().sendPasswordResetEmail(firebase.auth().currentUser)
        .then(() => {
            alert("Password reset email sent")
        }).catch((error) => {
            alert(error)
        })
    }

    //Conectividad de la base de datos con el sistema en general, tomando en cuenta el nombre del usuario y el consumo. Se agregaran mas datos
    useEffect(() => {
        firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get()
        .then((snapshot) => {
            if(snapshot.exists){
                setName(snapshot.data())
                setConsumo(snapshot.data())
            }
            else{
                console.log('User does not exist')
            }
        })
    }, [])


    //Ejecucion de resultados del usuario, solo podra visualizarse por medio de usuario.
    return (
        <SafeAreaView style={styles.container}>

            <Text style={{fontSize:20, fontWeight:'bold'}}>
                Hello, {name.firstName}
            </Text>
            <Text style={{fontSize:20, fontWeight: 'bold'}}>
                Tu consumo anterior fue de, {consumo.setConsumo}
            </Text>
            <TouchableOpacity
                onPress={() => {
                    changePassword()
                }}
                style={styles.button}
            >
                <Text style={{fontSize:20, fontWeight:'bold'}}>Cambiar Contraseña</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
                onPress={() => {
                    firebase.auth().signOut();
                }}
                style={styles.button}
            >
                <Text style={{fontSize:20, fontWeight:'bold'}}>Salir</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}

export default Dashboard 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        marginTop:100,
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
