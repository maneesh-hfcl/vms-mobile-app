import React from "react";
import {View, Text, StyleSheet, TextInput, Button, ActivityIndicator} from 'react-native'

import LoadingDialogComponent from "../../../component/loadingDialogComponent";
import { globalStyles } from "../../../style/globalstyle";
import {Formik} from 'formik'
import * as yup from "yup"

const validationSchema = yup.object().shape({
    name: yup.string().required().label("First name"),
    email: yup.string().required()
})


const AddSrvrScreen = ()=>{
    return (
        <View style={globalStyles.container_main}>
            <Formik
                initialValues={{
                    sym:'',
                    name:'',
                    ipaddress:'',
                    port:'',
                    type:'',
                    status:''
                }}
                onSubmit={ (values, action) => {
                        console.log(JSON.stringify(values))
                        setTimeout(()=>{
                            action.setSubmitting(false)
                        },1000)

                    }
                }
                validationSchema = {validationSchema}
            >
                {(formikProps)=>(
                    <React.Fragment>
                        <Text>Sym</Text>
                        <TextInput onChangeText={formikProps.handleChange("sym")}  />
                        <Text style={{color:'red'}}>{formikProps.touched.name && formikProps.errors.name}</Text>
                        <Text>Name</Text>
                        <TextInput onChangeText={formikProps.handleChange("name")} />
                        <Text>IP Address</Text>
                        <TextInput onChangeText={formikProps.handleChange("ipaddress")} />
                        <Text>Port</Text>
                        <TextInput onChangeText={formikProps.handleChange("port")} />
                        <Text>Type</Text>
                        <TextInput onChangeText={formikProps.handleChange("type")} />
                        <Text>Status</Text>
                        <TextInput onChangeText={formikProps.handleChange("status")} />

                        <Text style={{color:'red'}}> {formikProps.touched.email && formikProps.errors.email } </Text>
                        {formikProps.isSubmitting?(
                            <ActivityIndicator />
                        ):(
                            <Button title="Submit" onPress={formikProps.handleSubmit} />
                        )}

                    </React.Fragment>
                )}   
            </Formik>
        </View>
    )
}

export default AddSrvrScreen;