import React from 'react';
import Main from "./src/components/Main";
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { reducer, StateProvider } from "./src/state";

export default function App() : JSX.Element {
  return (
    <NavigationContainer>
      <PaperProvider>
        <StateProvider reducer={reducer}>
          <Main />
        </StateProvider>
      </PaperProvider>
    </NavigationContainer>
    
  );
}
