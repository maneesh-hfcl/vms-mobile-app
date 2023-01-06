import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    container_header:{
        backgroundColor:'#000',
        alignItems:'center'
    },
    container_header_logo:{
        paddingTop:20,
        alignItems:'center'

    },
    container_login_view:{
        padding:30,
       flex:1
    },
    text_input:{
        borderWidth:1,
        marginHorizontal:5,
        marginVertical:5,
        paddingHorizontal:5,
        paddingVertical:8,
        borderColor:'#c7c7c7',
        fontSize:15
    },
    text:{
        fontSize:15,
        color:'gray',
        marginHorizontal:5,
        marginTop:10,
        paddingHorizontal:2,
        paddingVertical:2
    },
    touchable_btn:{
        backgroundColor:'#1742d1',
        alignItems:'center',
        marginVertical:15,
        marginHorizontal:5,
        paddingHorizontal:15,
        paddingVertical:10,
        borderRadius:5,

        
    },
    touchable_btn_logout:{
        alignSelf:'center'
        
    },
    text_btn:{
        fontSize:18,
        color:'#fff',

    },
    view_padding_top:{
        paddingTop:80
    },
    modalContent:{
        height:'70%',
        backgroundColor:'#fff',
        bottom:'8%',
        position:'absolute',
        width:'100%',  
        borderTopWidth:2,
        elevation:3,
        borderColor:'#000',
        shadowOffset:{width:1, height:1},
        shadowColor:'#333',
        shadowOpacity:0.3,
        shadowRadius:2,      
    },
})