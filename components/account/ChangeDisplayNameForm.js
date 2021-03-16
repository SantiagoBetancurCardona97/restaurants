import React from 'react'
import { StyleSheet, View } from 'react-native'
import {Button, Input} from 'react-native-elements'

export default function ChangeDisplayNameForm({displayName, setShowModal, toastRef}) {
    return (
        <View style={styles.view}>
            <Input
                placeholder="Ingresa nombres y apellidos"
                containerStyle={styles.iput}
                defaultValue={displayName}
                rightIcon={{
                    type:"material-community",
                    name:"account-circle-outline",
                    color: "#c2c2c2"
                }}
            />
            <Button
                title="Cambiar Nombre y Apellidos"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    viwe:{
        alignItems: "center",
        paddingVertical: 10
    },
    input:{
        marginBottom: 10
    },
    btnContainer:{
        width: "95%"
    },
    btn:{
        backgroundColor: "#0ca3c4"
    }
})
