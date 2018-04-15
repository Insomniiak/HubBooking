import React, { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  render(): ReactNode {
    return (
      <View style={styles.container}>
        <Text>done people</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
