import * as React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    background-color: #6A5ACD;
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const InputArea = styled.View`
    padding: 40px;
    width: 100%;
`;

export const CustomButton = styled.TouchableOpacity`
    height: 60px;
    background-color: #191970;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`;

export const CustomButtonText = styled.Text`
    font-size: 18px;
    color: #ffffff;
`;

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: -65px;
    margin-bottom: 70px;
    position: relative;
    flex-direction: row;
`;