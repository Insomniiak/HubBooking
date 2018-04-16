import React, { ReactNode } from 'react';
import {Text, View} from "react-native";

export default class HomeScreen extends React.Component {
    public render(): ReactNode {
        return(
            <View>
                <Text>Hello Home</Text>
            </View>
        );
    }
}