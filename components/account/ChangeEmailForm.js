import React, {useState} from 'react'
import { StyleSheet, View } from 'react-native'
import {Button, Icon, Input} from 'react-native-elements'
import { isEmpty } from 'lodash'

import { updateProfile } from '../../utils/actions'
import { validateEmail } from '../../utils/helpers'

export default function ChangeEmailForm({email, setShowModal, toastRef, setRelodUser}) {
    const [newEmail, setNewEmail] = useState(email)
    const [password, setPassword] = useState(null)
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorPassword, setErrorPassword] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSubmit= async() =>{
        if (!validateForm()){
            return    
        }
        
        // setLoading(true)
        // const result = await updateProfile ({displayName: newDisplayName})
        // setLoading(false)

        // if(!result.statusResponse){
        //     setError("Error al actualizar Nombres y Apellidos, intenta mas tarde.")
        //     return
        // }

        // setRelodUser(true)
        // toastRef.current.show("Se han actualizado Nombres y Apellidos", 3000)
        // setShowModal(false)
    }

    const validateForm =() => {
        setErrorEmail(null)
        setErrorPassword(null)
        let isValid =true
        console.log("newEmail", newEmail)
        console.log("email", email)

        if (!validateEmail(newEmail)) {
            setErrorEmail("Debes ingresar un Email valido.")
            isValid=false
        }
        if (newEmail === email) {
            setErrorEmail("Debes ingresar Email, diferente de al actual.")
            isValid=false
        }
        if (isEmpty(password)) {
            setErrorPassword("Debes ingresar tu contraseña.")
            isValid=false
        }
        return isValid
    }
    return (
        <View style={styles.view}>
            <Input
                placeholder="Ingresa el nuevo correo..."
                containerStyle={styles.iput}
                defaultValue={email}
                keyboardType="email-address"
                onChange={(e) => setNewEmail(e.nativeEvent.text)}
                errorMessage={errorEmail}
                rightIcon={{
                    type:"material-community",
                    name:"at",
                    color: "#c2c2c2"
                }}
            />
             <Input
                placeholder="Ingresa tu contraseña"
                containerStyle={styles.iput}
                defaultValue={password}
                onChange={(e) => setPassword(e.nativeEvent.text)}
                errorMessage={errorPassword}
                password={true}
                secureTextEntry={!showPassword}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={ showPassword ? "eye-off-outline" : "eye-outline" }
                        iconStyle={{color: "#c2c2c2"}}
                        onPress={()=> setShowPassword(!showPassword)}
                    />
                 }
            />
            <Button
                title="Cambiar correo"
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
