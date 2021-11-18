import * as React from 'react';
import styled from 'styled-components/native';

const InputArea = styled.View`
    width: 100%;
    height: 60px;    
    background-color: #ffffff;
    border-radius: 30px;
    align-items: center;
    margin-bottom: 15px;
    flex-direction: row;
    padding-left: 15px;
`;

const Input = styled.TextInput`
    flex: 1;
    margin-left: 10px;
    color: #000000;
    font-size: 16px;
`;

export default ({placeholder, value, onChangeText, secure}) => {
    return (
        <InputArea>
            <Input placeholder={placeholder} value={value} onChangeText={onChangeText} secureTextEntry={secure}/>
        </InputArea>
    );
}