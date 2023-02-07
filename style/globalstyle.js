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
       flex:1,

    },
    container_main:{
        paddingTop:10,
        paddingHorizontal:8,
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
    text_form:{
        color:'gray',
        marginHorizontal:5,
        marginTop:5,
        paddingHorizontal:2,
        paddingVertical:0
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
        backgroundColor:'#e4e9f7',
        bottom:'8%',
        width:'100%',  
        borderTopWidth:2,
        elevation:3,
        borderColor:'#000',
        shadowOffset:{width:1, height:1},
        shadowColor:'#333',
        shadowOpacity:0.3,
        shadowRadius:2,
        marginTop:'6or30%',      
    },
    container_form:{
        backgroundColor:'#fff',
        
        marginVertical:5,
        paddingVertical:10,
        paddingHorizontal:5,
        borderRadius:5
    },
    text_form_input:{
        color:'#000',
    },
    form_btn_text:{
        marginVertical:0,
        marginHorizontal:5,
        color:'yellow'
    },
    form_btn:{
        backgroundColor:'#1742d1',
        alignItems:'center',
        marginVertical:1,
        marginHorizontal:0,
        paddingHorizontal:5,
        paddingVertical:5,
        borderRadius:5,      
    },
    card_cam_text_empty:{
        paddingHorizontal:5,
        paddingVertical:5,
        color:'gray',
        fontSize:15
    }
})