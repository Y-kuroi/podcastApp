import React from 'react';
import Main from "./src/components/Main";
import { Provider as PaperProvider } from 'react-native-paper';
import { NativeRouter as Router } from "react-router-native";

export default function App() : JSX.Element {
  return (
    <Router>
      <PaperProvider>
        <Main />
      </PaperProvider>
    </Router>
    
  );
}
