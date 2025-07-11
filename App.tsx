import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './src/navigation/StackNavigation';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <StackNavigation/>
    </NavigationContainer>
  );
}

export default App;
