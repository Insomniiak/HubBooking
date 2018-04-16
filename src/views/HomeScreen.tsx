import React, { ReactNode } from 'react';
import {Text, View} from "react-native";
import ApiCalendar from "../ApiCalendar";

export default class HomeScreen extends React.Component {
    public render(): ReactNode {
        return(
            <View>
                <Text>Hello Home</Text>
                <ApiCalendar/>
            </View>
        );
    }
}