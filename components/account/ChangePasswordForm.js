import React, {useState} from 'react'
import { StyleSheet, View } from 'react-native'
import {Button, Icon, Input} from 'react-native-elements'
import { isEmpty, size } from 'lodash'

import { reauthenticate, updatePassword } from '../../utils/actions'


export default function ChangePasswordForm({setShowModal, toastRef}) {
    const [newPassword, setNewPassword] = useState(null)
    const [currentPassword, setCurrentPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [errorNewPassword, setErrorNewPassword] = useState(null)
    const [errorCurrentPassword, setErrorCurrentPassword] = useState(null)
    const [errorConfirmPassword, setErrorConfirmPassword] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSubmit= async() =>{
        if (!validateForm()){
            return    
        }
        
        setLoading(true)
        const resultReauthenticate = await reauthenticate (currentPassword)
        
        if(!resultReauthenticate.statusResponse){
            setLoading(false)
            setErrorCurrentPassword("Contraseña Incorrecta")
            return
        }

        const resultUpdatePassword = await updatePassword (newPassword)
        setLoading(false)
        

        if(!resultUpdatePassword.statusResponse){
            setErrorNewPassword("Problemas para cambiar la contraseña, por favor intente mas tarde")
            return
        }

        toastRef.current.show("Se han actualizado la Contraseña.", 3000)
        setShowModal(false)
    }

    const validateForm =() => {
        setErrorNewPassword(null)
        setErrorCurrentPassword(null)
        setErrorConfirmPassword(null)
        let isValid =true

    
        if (isEmpty(currentPassword)) {
            setErrorCurrentPassword("Debes ingresar tu contraseña actual.")
            isValid=false
        }
        if (size(newPassword)< 6) {
            setErrorNewPassword("Debes ingresar nueva contraseña de al menos 6 caracteres.")
            isValid=false
        }
        if (size(confirmPassword)< 6) {
            setErrorConfirmPassword("Debes ingresar una confirmacion de al menos 6 caracteres.")
            isValid=false
        }
        if (newPassword !== confirmPassword) {
            setErrorNewPassword("Las contraseñas no coinciden.")
            setErrorConfirmPassword("Las contraseñas no coinciden.")
            isValid=false
        }
        if (newPassword === currentPassword) {
            setErrorNewPassword("Debes ingresar una contraseña diferente a la actual.")
            setErrorCurrentPassword("Debes ingresar una contraseña diferente a la actual.")
            setErrorConfirmPassword("Debes ingresar una contraseña diferente a la actual.")
            isValid=false
        }

        return isValid
    }
    return (
        <View style={styles.view}>
             <Input
                placeholder="Ingresa tu contraseña actual"
                containerStyle={styles.iput}
                defaultValue={currentPassword}
                onChange={(e) => setCurrentPassword(e.nativeEvent.text)}
                errorMessage={errorCurrentPassword}
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
                <Input
                    placeholder="Ingresa tu nueva contraseña"
                    containerStyle={styles.iput}
                    defaultValue={newPassword}
                    onChange={(e) => setNewPassword(e.nativeEvent.text)}
                    errorMessage={errorNewPassword}
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
                <Input
                    placeholder="Ingresa tu confirmacion de la nueva contraseña"
                    containerStyle={styles.iput}
                    defaultValue={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.nativeEvent.text)}
                    errorMessage={errorConfirmPassword}
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
                title="Cambiar Contraseña"
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
