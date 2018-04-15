import { StackNavigator } from 'react-navigation';
import HomeScreen from '../views/HomeScreen';

const RootStack = StackNavigator({
	Home: {
		screen: HomeScreen,
	},
});

export default RootStack;
