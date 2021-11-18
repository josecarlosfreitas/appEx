
import React, { useState } from 'react';
import { Keyboard } from 'react-native';
import Toast from 'react-native-toast-message';
import { Container, InputArea, CustomButton, CustomButtonText, LoadingIcon } from './style';
import SignInput from '../../../components/SignInput';

import { useNavigation } from '@react-navigation/native';
import { cloudAddress } from '../../../Api'
import { ToastTypeError, ToastTypeInfo } from '../../../enum/ToastTypeEnum';

export default () => {
    const [usuarioField, setUsuarioField] = useState('');
    const [senhaField, setSenhaField] = useState('');
    const [visibilityLoad, setVisibilityLoad] = useState(false);

    const navigation = useNavigation();

    const validarSenha = async () => {
        try {
            
            setVisibilityLoad(true);
            Keyboard.dismiss();

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            
            var usuario = JSON.stringify({
                "nome": usuarioField,
                "senha": senhaField,
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

    function timeout(ms, promise) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                reject(new Error("timeout"))
            }, ms)
            promise.then(resolve, reject)
        })
    }

    const handleClick = async () => {
        if (usuarioField != '' && senhaField != '') {
            if (usuarioField.length > 0 && senhaField.length > 0) {
                validarSenha();
            }
            else {
                Toast.show({
                    type: ToastTypeError,
                    visibilityTime: 3000,
                    text1: 'Erro',
                    text2: 'Usuario e senha invalidos...'
                });
            }
        }
        else {
            Toast.show({
                type: ToastTypeInfo,
                visibilityTime: 3000,
                text1: 'Atenção',
                text2: 'Preencha os campos para continuar...'
            });
        }
    }

    return (
        <Container>
            <InputArea>
                <SignInput placeholder="Usuario" value={usuarioField}
                    onChangeText={t => setUsuarioField(t)} />
                <SignInput placeholder="Senha" value={senhaField}
                    onChangeText={t => setSenhaField(t)} secure={true} />
                { visibilityLoad  ?  <LoadingIcon size="large" color="#022162" /> : null}
                <CustomButton onPress={handleClick}>
                    <CustomButtonText>LOGIN</CustomButtonText>
                </CustomButton>
            </InputArea>
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </Container>
    );
}