import React, { useState, useEffect } from 'react'
import { Alert, Dimensions, StyleSheet, Text, View, ScrollView  } from 'react-native'
import { Avatar, Button, Icon, Input, Image } from 'react-native-elements'
import CountryPicker from 'react-native-country-picker-modal'
import {map, size, filter} from 'lodash'
import MapView from 'react-native-maps'

import { getCurrentLocation, loadImageFromGallery } from '../../utils/helpers'
import Modal from '../../components/Modal'

const widthScreen = Dimensions.get("window").width

export default function AddRestaurantForm({toastRef, setLoading, navigation}) {
    const [formData, setFormData] = useState(defaultFomrValues())
    const [errorName, setErrorName] = useState(null)
    const [errorDescripcion, setErrorDescripcion] = useState(null)
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorAddress, setErrorAddress] = useState(null)
    const [errorPhone, setErrorPhone] = useState(null)
    const [imagesSelected, setImagesSelected] = useState([])
    const [isVisibleMap, setIsVisibleMap] = useState(false)
    const [locationRestaurant, setLocationRestaurant] = useState(null)
    
   
    const addRestaurant=()=>{
        console.log(formData)
        console.log("melo pa")
    }
    return (
        <ScrollView style={styles.viewContainer}>
            <ImageRestaurant
                imageRestaurant={imagesSelected[0]}
            />
            <FormAdd
                formData={formData}
                setFormData={setFormData}
                errorName={errorName}
                errorDescripcion={errorDescripcion}
                errorEmail={errorEmail}
                errorAddress={errorAddress}
                errorPhone={errorPhone}
                setIsVisibleMap={setIsVisibleMap}
            />
            <UploadImage
                toastRef={toastRef}
                imagesSelected={imagesSelected}
                setImagesSelected={setImagesSelected}
            />
            <Button
                title="Crear Restaurante"
                onPress={addRestaurant}
                buttonStyle={styles.btnAddRestaurant}
            />
            <MapRestaurant 
                isVisibleMap={isVisibleMap}
                setIsVisibleMap={setIsVisibleMap}
                locationRestaurant={locationRestaurant}
                setLocationRestaurant={setLocationRestaurant}
                toastRef={toastRef}
            />
        </ScrollView>
    )
}

function MapRestaurant ({isVisibleMap, setIsVisibleMap, locationRestaurant, setLocationRestaurant, toastRef}){
    useEffect(()=>{
        (async()=>{
            const response = await getCurrentLocation()
            if (response.status){
                setLocationRestaurant(response.location)
                console.log(response.location)
            }
        })()
    }, [])
    return(
    <Modal isVisible={isVisibleMap} setIsVisble={setIsVisibleMap}>
        <View>
            {
                locationRestaurant && (
                    <MapView
                        style={styles.mapStyle}
                        initialRegion={locationRestaurant}
                        showsUserLocation={true}
                    >
                        <MapView.Marker
                            coordinate={{
                                latitude: locationRestaurant.latitude,
                                longitude: locationRestaurant.longitude
                            }}
                            draggable
                        />
                    </MapView>
                )
            }
            <View style={styles.viewMapBtn}>
                <Button
                    title="Guardar Ubicacion"
                    containerStyle={styles.viewMapBtnContainerSave}
                    buttonStyle={styles.viewMapBtnSave}
                />
                 <Button
                    title="Cancelar Ubicacion"
                    containerStyle={styles.viewMapBtnContainerCancel}
                    buttonStyle={styles.viewMapBtnCancel}
                />
            </View>
        </View>
    </Modal>
    )
    
}

function ImageRestaurant({ imageRestaurant}){
    return (
        <View style={styles.viewPhoto}>
            <Image
                style={{width: widthScreen, height: 200}}
                source= {
                    imageRestaurant
                        ?{ uri: imageRestaurant}
                        : require("../../assets/no-image.png")
                }
            />
        </View>
    )    
}

function UploadImage({toastRef, imagesSelected, setImagesSelected}) {
    const imageSelected = async() => {
        const response = await loadImageFromGallery([4, 3])
        if(!response.status) {
            toastRef.current.show("No has selecionado ninguna imagen", 3000)
            return
        }
        setImagesSelected([...imagesSelected, response.image])
    }
    const removeImage= (image) => {
        Alert.alert(
         "Eliminar Imagen",
         "¿Estas seguro que quieres eliminar la imagen?",
            [
                {
                    text: "No",
                    style: "Cancel"
                },
                {
                    text: "Si",
                    onPress: () => {
                        setImagesSelected(
                            filter(imagesSelected, (imageUrl) => imageUrl !== image)
                        )
                    }
                }
            ],
            {cancelable: false}
        )

    }

    return(
        <ScrollView
            horizontal
            style={styles.viewImages}
        >
            {
                size(imagesSelected)< 10 && (
                    <Icon 
                        type="material-community"
                        name="camera"
                        color="#7a7a7a"
                        containerStyle={styles.containerIcon}   
                        onPress={imageSelected}     
                    /> 
                )               
            } 
            {
            map(imagesSelected,(imageRestaurant, index) => (
                <Avatar
                    key={index}
                    style={styles.miniatureStyle}
                    source={{uri: imageRestaurant}}
                    onPress={() => removeImage(imageRestaurant)}
                />
            ))
            }       
        </ScrollView>
    )
}

function FormAdd({formData,setFormData,errorName,errorDescripcion,errorEmail,errorAddress,errorPhone, setIsVisibleMap}){
    const [country, setCountry] = useState("CO")
    const [callingCode, setCallingCode] = useState("57")
    const [phone, setPhone] = useState(" ")

    const onChange=(e, type) =>{
        setFormData({...formData, [type]:e.nativeEvent.text})
    }

    return (
        <View style={styles.viewForm}>
            <Input
                placeholder= "Nombre del restaurante"
                defaultValue={formData.name}
                onChange={(e) => onChange(e, "name")}
                errorMessage={errorName}
            />
            <Input
                placeholder= "Direccion del restaurante"
                defaultValue={formData.address}
                onChange={(e) => onChange(e, "address")}
                errorMessage={errorAddress}
                rightIcon={{
                    type: "material-community",
                    name: "google-maps",
                    color: "#c2c2c2",
                    onPress:()=> setIsVisibleMap(true)
                }}
            />
            <Input
                keyboardType="email-address"
                placeholder= "Email del restaurante"
                defaultValue={formData.email}
                onChange={(e) => onChange(e, "email")}
                errorMessage={errorEmail}
            />
            <View style={styles.phoneView}>
                <CountryPicker
                    withFlag
                    withCallingCode
                    withFilter
                    withCallingCodeButton
                    containerStyle={styles.countryPicker}
                    countryCode={country}
                    onSelect={(country)=> {
                        setFormData({...formData, "country":country.cca2, "callingCode":country.callingCode[0]})
                        setCountry(country.cca2)
                        setCallingCode(country.callingCode[0])
                    }}
                />
                <Input
                    placeholder="WhatsApp del restaurante ..."
                    keyboardType="phone-pad"
                    containerStyle={styles.inputPhone}
                    defaultValue={formData.phone}
                    onChange={(e) => onChange(e, "phone")}
                    errorMessage={errorPhone}
                />  
            </View>
            <Input
                placeholder="Descripcion del restaurante ..."
                multiline
                containerStyle={styles.textArea}
                defaultValue={formData.description}
                onChange={(e) => onChange(e, "descripcion")}
                errorMessage={errorDescripcion}
            />
            </View>
    )
}
const defaultFomrValues =() =>{
    return{
        name:"",
        description:"",
        email:"",
        phone:"",
        address:"",
        country:"CO",
        callingCode:"57"

    }
}

const styles = StyleSheet.create({
    viewContainer:{
        height:"100%"
    },
    viewForm:{
        marginHorizontal:10,
    },
    textArea:{
        height:100,
        width:"100%"
    },
    phoneView:{
        width:"80%"
    },
    btnAddRestaurant:{
        margin:20,
        backgroundColor:"#0ca3c4"
    },
    viewImages:{
        flexDirection:"row",
        marginHorizontal: 20,
        marginTop: 30
    },
    containerIcon:{
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        height: 70,
        width: 70,
        backgroundColor:"#0ca3c4"
    },
    miniatureStyle:{
        width:70,
        height: 70,
        marginRight: 10
    },
    viewPhoto:{
        alignItems: "center",
        height: 200,
        marginBottom: 20
    },
    mapStyle:{
        width: "100%",
        height: 550
    },
    viewMapBtn:{
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10
    },
    viewMapBtnContainerCancel:{
        paddingLeft: 5
    },
    viewMapBtnContainerSave:{
        paddingRight: 5
    },
    viewMapBtnCancel:{
        backgroundColor:"#d0d1ca"
    },
    viewMapBtnSave:{
        backgroundColor:"#0ca3c4"
    }

})
