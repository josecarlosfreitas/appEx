
import React, { useState } from 'react';
import { Keyboard, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import { Container, InputArea, CustomButton, CustomButtonText, LoadingIcon } from './style';
import SignInput from '../../../components/SignInput';

import { useNavigation } from '@react-navigation/native';
import { cloudAddress } from '../../../Api'

export default () => {
    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');
    const [visibilityLoad, setVisibilityLoad] = useState(false);

    const navigation = useNavigation();

    const styles = StyleSheet.create({
        imgLogo: {
          width: 330,
          height: 80,
        }
    });

    const validarSenha = async () => {
        try {
            
            setVisibilityLoad(true);
            Keyboard.dismiss();

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            
            var usuario = JSON.stringify({
                "nome": emailField,
                "senha": passwordField,
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: usuario,
                redirect: 'follow'
            };

            await timeout(10000, fetch(cloudAddress + "usuario/validarsenha", requestOptions))
                .then(response => response.text())
                .then(result => {
                    console.log('Criado!!' + result);
                    if(result && result == "true"){
                        console.log('usuario valido');
                        /*navigation.navigate('MainTab', { 
                        msg: {
                            type: ToastTypeSuccess,
                            text1: 'Sucesso!',
                            text2: 'Atendimento criado com sucesso.'
                        }
                        });*/
                    }else{
                        console.log('usuario nao valido');
                    }
                })
                .catch(error => {
                    console.log('error', error);
                });

        } catch (error) {
            console.error(error);
        }
        setVisibilityLoad(false);
    };

    // Rough implementation. Untested.
    function timeout(ms, promise) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                reject(new Error("timeout"))
            }, ms)
            promise.then(resolve, reject)
        })
    }

    const handleClick = async () => {
        if (emailField != '' && passwordField != '') {
            //let ret = await Api.signin(emailField, passwordField);
            if (emailField.length > 0 && passwordField.length > 0) {
                validarSenha();
            }
            else {
                /*Toast.show({
                    type: 'error',
                    visibilityTime: 3000,
                    text1: 'Falha',
                    text2: 'Usuário e senha invalidos...'
                });*/
            }
        }
        else {
            Toast.show({
                type: 'info',
                visibilityTime: 3000,
                text1: 'Atenção',
                text2: 'Preencha os campos para continuar...'
            });
        }
    }

    return (
        <Container>
            <InputArea>
                <SignInput placeholder="E-mail" value={emailField}
                    onChangeText={t => setEmailField(t)} />
                <SignInput placeholder="Senha" value={passwordField}
                    onChangeText={t => setPasswordField(t)} secure={true} />
                { visibilityLoad == true ?  <LoadingIcon size="large" color="#022162" /> : null}
                <CustomButton onPress={handleClick}>
                    <CustomButtonText>LOGIN</CustomButtonText>
                </CustomButton>
            </InputArea>
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </Container>
    );
}