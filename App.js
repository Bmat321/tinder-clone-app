import StackNavigation from './StackNavigation'
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from './contexts/context';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();


export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StackNavigation />
      </AuthProvider>
   </NavigationContainer>
  );
}
