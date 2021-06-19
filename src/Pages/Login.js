import React from 'react';
import * as firebaseui from 'firebaseui';
import firebase from '../firebaseConfig';
import 'firebaseui/dist/firebaseui.css';


class Login extends React.Component{
    componentDidMount(){


        const uiConfig={
            signInOptions:[{
                provider:firebase.auth.PhoneAuthProvider.PROVIDER_ID,
                recaptchaParameters:{
                    type:'image',
                    size:'normal',
                    badge:'bottomleft',
                },
                defaultCountry:'ID',
            }],
            callbacks:{
                signInSuccessWithAuthResult:function(authResult, redirectUrl){
                    localStorage.setItem('uid',authResult.user.uid)
                    return true;
                }
            },
            signInSuccessUrl:'/'
        }

        var ui=new firebaseui.auth.AuthUI(firebase.auth());
        ui.start('#firebase-auth-container', uiConfig);
    }



    render(){
            return(
                <div className="mt-4">
                    <div id="firebase-auth-container" >
                    
                    </div>
                </div>
                
            );       
    }
}

export default Login;