import React, { useState } from "react";
import {View, Text, StyleSheet, ActivityIndicator, TouchableOpacity} from 'react-native'
import TextInputTemplate from "../../../component/card/form/textInputTemplate";
import { globalStyles } from "../../../style/globalstyle";
import {Formik} from 'formik'
import * as yup from "yup"

const validationSchema = yup.object().shape({
    sym: yup.string().required("Enter sym")
})

const EditSrvrScreen = ()=>{
    const[focusName, setFocusName] = useState('')
    return(
        <View style={[globalStyles.container_main, { paddingHorizontal:20, 
            backgroundColor:'#fff', paddingTop:30}]}>
            <Formik 
                initialValues={
                    {
                        sym:'',
                        name:'',
                        ipaddress:'',
                        port:'',
                        type:'',
                        status:''
                    }
                }
                onSubmit={(values, action)=>{
                    console.log(values)
                    action.setSubmitting(false)
                }}
                validationSchema={validationSchema}
            >
                {(formikProps)=>(
                    <React.Fragment>
                        <Text style={globalStyles.text}>Sym</Text>
                        <TextInputTemplate isSelect={focusName == "sym"} 
                            setFocusName={()=> setFocusName('sym')}
                            setChangeText={formikProps.handleChange("sym")}
                            setValErr = {formikProps.touched && formikProps.errors.sym}
                        />
                        <Text style={globalStyles.text}>Name</Text>
                        <TextInputTemplate isSelect={focusName == "name"} 
                            setFocusName={()=> setFocusName('name')}
                        />
                        <Text style={globalStyles.text}>IP Address</Text>
                        <TextInputTemplate isSelect={focusName == "ipaddress"} 
                            setFocusName={()=> setFocusName('ipaddress')}
                        />
                        <Text style={globalStyles.text}>Port</Text>
                        <TextInputTemplate isSelect={focusName == "port"} 
                            setFocusName={()=> setFocusName('port')}
                        />
                        <Text style={globalStyles.text}>Type</Text>
                        <TextInputTemplate isSelect={focusName == "type"} 
                            setFocusName={()=> setFocusName('type')}
                        />
                        <Text style={globalStyles.text}>Status</Text>
                        <TextInputTemplate isSelect={focusName == "status"}
                            setFocusName={()=> setFocusName('status')}
                        />
                        <View style={{marginTop:30}}>
                        {
                            formikProps.isSubmitting?(
                                <ActivityIndicator />
                            ):(
                                <TouchableOpacity style={globalStyles.touchable_btn} 
                            onPress={formikProps.handleSubmit}>
                                <Text style={globalStyles.text_btn}>Save</Text>
                            </TouchableOpacity>
                            )
                        }
                        </View>
                    </React.Fragment>
                )}
            </Formik>

        </View>
    )
}

export default EditSrvrScreen;

const styles = StyleSheet.create({})