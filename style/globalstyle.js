import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    container_header:{
    backgroundColor:'#2a2e36',
        alignItems:'center'
    },
    container_header_logo:{
        paddingTop:20,
        alignItems:'center'

    },
    container_login_view:{
        padding:0, 
       flex:1,

    },
    container_main:{
        paddingTop:10,
        paddingHorizontal:0,
        flex:1,
        backgroundColor:'#fff'
    },
    text_input:{
        borderBottomWidth:1,

        marginHorizontal:0,
        marginVertical:0,
        paddingHorizontal:3,
        paddingVertical:3,
        borderColor:'#c7c7c7',
        fontSize:15,

    },
    text:{
        fontSize:15,
        color:'gray',
        marginHorizontal:3,
        marginTop:10,
        paddingHorizontal:0,
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

    },
    container_form:{
        backgroundColor:'#fff',
        marginHorizontal:5,
        marginVertical:5,
        paddingVertical:10,
        paddingHorizontal:2,
        borderRadius:8,
        borderWidth:1,
        borderColor:'#d7d7d7',
        backgroundColor:'#f9f9f9'
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
    },
    text_sort:{
        color:'#4072c2',
        marginHorizontal:5,
        fontWeight:'bold',
        marginTop:5,
        paddingHorizontal:2,
        marginVertical:5,
      //  textDecorationLine:"underline"
    },
    modal_dialog:{
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
        backgroundColor:'#fff',
          flex:1,
   //   borderTopRightRadius:10,

      borderWidth:1,
      borderColor:"#e7e7e7",
      paddingHorizontal:10,
      paddingVertical:0,
      
  },
  container_user_detail:{
    flex:1
  },
  container_user_detail_section:
  {
    borderBottomWidth:1,
    borderBottomColor:"#ededed",
    marginHorizontal:5,
    paddingVertical:0,
    alignItems:'flex-end'
  },
  vw_logout:{
    backgroundColor:'#f9f9f9',
    borderTopWidth:1,
    borderColor:'#e7e7e7',
    alignItems:'center',
    paddingVertical:15
  },
  lnk_btn:{
    color:'#3c698c',
    fontWeight:'bold',
    fontSize:15,
  }
})