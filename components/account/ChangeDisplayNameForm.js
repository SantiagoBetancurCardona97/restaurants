import React, {useState} from 'react'
import { StyleSheet, View } from 'react-native'
import {Button, Input} from 'react-native-elements'
import { isEmpty } from 'lodash'

import { updateProfile } from '../../utils/actions'

export default function ChangeDisplayNameForm({displayName, setShowModal, toastRef, setRelodUser}) {
    const [newDisplayName, setNewDisplayName] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const onSubmit= async() =>{
        if (!validateForm()){
            return    
        }
        
        setLoading(true)
        const result = await updateProfile ({displayName: newDisplayName})
        setLoading(false)

        if(!result.statusResponse){
            setError("Error al actualizar Nombres y Apellidos, intenta mas tarde.")
            return
        }

        setRelodUser(true)
        toastRef.current.show("Se han actualizado Nombres y Apellidos", 3000)
        setShowModal(false)
    }

    const validateForm =() => {
        setError(null)

        if (isEmpty(newDisplayName)) {
            setError("Debes ingresar Nombres y Apellidos.")
            return false
        }
        if (newDisplayName === displayName) {
            setError("Debes ingresar Nombres y Apellidos, diferentes de los actuales.")
            return false
        }
        return true
    }
    return (
        <View style={styles.view}>
            <Input
                placeholder="Ingresa nombres y apellidos"
                containerStyle={styles.iput}
                defaultValue={displayName}
                onChange={(e) => setNewDisplayName(e.nativeEvent.text)}
                errorMessage={error}
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
                onPress={onSubmit}
                loading={loading}
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
