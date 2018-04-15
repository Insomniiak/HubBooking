import { StackNavigator } from 'react-navigation';
import HomeScreen from '../view/HomeScreen';

const RootStack = StackNavigator({
	Home: {
		screen: HomeScreen,
M	},
});

export default RootStack;
