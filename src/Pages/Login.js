import React from 'react';
import firebaseConfig from '../firebaseConfig';
import * as firebaseui from 'firebaseui';
import firebase from 'firebase';
import 'firebaseui/dist/firebaseui.css';


class Login extends React.Component{
    componentDidMount(){
        firebase.initializeApp(firebaseConfig);
        const uiConfig={
            signInOptions:[{
                provider:firebase.auth.PhoneAuthProvider.PROVIDER_ID,
                recaptchaParameters:{
                    type:'image',
                    size:'normal',
                    badge:'bottomleft',
                },
                defaultCountry:'US',
            }],
            callbacks:{
                signInSuccessWithAuthResult:function(authResult, redirectUrl){
                    alert('succesfull');
                    return true;
                }
            },
            signInSuccessUrl:'https://promosteem.com'
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