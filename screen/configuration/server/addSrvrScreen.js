import React, { useState } from "react";
import {View, Text, StyleSheet, TextInput, Button, ActivityIndicator, TouchableOpacity} from 'react-native'

import LoadingDialogComponent from "../../../component/loadingDialogComponent";
import { globalStyles } from "../../../style/globalstyle";
import {Formik} from 'formik'
import * as yup from "yup"
import TextInputTemplate from "../../../component/card/form/textInputTemplate";

const validationSchema = yup.object().shape({
    sym: yup.string().required().label("sym")
})


const AddSrvrScreen = ()=>{
    const[focusName, setFocusName] = useState('')
    return (
        <View style={[globalStyles.container_main, { paddingHorizontal:20, 
            backgroundColor:'#fff', paddingTop:30}]}>
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
                        console.log('Submitting values here')
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
                        <Text style={globalStyles.text}>Sym</Text>
                        {/* <TextInput onChangeText={formikProps.handleChange("sym")}  /> */}
                        <TextInputTemplate isSelect={focusName=="sym"} 
                            setFocusName={()=> setFocusName("sym")}
                            setChangeText={formikProps.handleChange("sym")}
                            setValErr = {formikProps.touched.sym && formikProps.errors.sym}
                            />

                        {/* <Text style={{color:'red'}}>{formikProps.touched.sym && formikProps.errors.sym}</Text> */}
                        <Text style={globalStyles.text}>Name</Text>
                        {/* <TextInput onChangeText={formikProps.handleChange("name")} /> */}
                        <TextInputTemplate isSelect={focusName=="name"} 
                            setFocusName={()=> setFocusName("name")} />
                        <Text style={globalStyles.text}>IP Address</Text>
                        {/* <TextInput onChangeText={formikProps.handleChange("ipaddress")} /> */}
                        <TextInputTemplate isSelect={focusName=="ipaddress"} 
                            setFocusName={()=> setFocusName("ipaddress")} />
                        <Text style={globalStyles.text}>Port</Text>
                        {/* <TextInput onChangeText={formikProps.handleChange("port")} /> */}
                        <TextInputTemplate isSelect={focusName=="port"} 
                            setFocusName={()=> setFocusName("port")} />
                        <Text style={globalStyles.text}>Type</Text> 
                        <TextInputTemplate isSelect={focusName=="type"} 
                            setFocusName={()=> setFocusName("type")} />
                        {/* <TextInput onChangeText={formikProps.handleChange("type")} /> */}
                        <Text style={globalStyles.text}>Status</Text>
                        <TextInputTemplate isSelect={focusName=="status"} 
                            setFocusName={()=> setFocusName("status")} />
                        {/* <TextInput onChangeText={formikProps.handleChange("status")} /> */}

                        {/* <Text style={{color:'red'}}> {formikProps.touched.email && formikProps.errors.email } </Text> */}
                        
                        <View style={{marginTop:30}}>
                            {formikProps.isSubmitting?(
                                <ActivityIndicator />
                            ):(

                                <TouchableOpacity style={globalStyles.touchable_btn} 
                                onPress={formikProps.handleSubmit}>
                                    <Text style={globalStyles.text_btn}>Add</Text>
                                </TouchableOpacity>
                            )}
                        </View>

                    </React.Fragment>
                )}   
            </Formik>
        </View>
    )
}

export default AddSrvrScreen;