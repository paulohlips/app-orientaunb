import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {colors} from './styles';

import Main from './pages/Main';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Camera from './pages/Camera';
import Talk from './pages/Talk';
import Orientation from './pages/Orientation';
import MyOrientation from './pages/MyOrientation';
import NewOrientation from './pages/NewOrientation';
import Aluno from './pages/Aluno';

const AppStack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <AppStack.Navigator
        screenOptions={{
          headerTintColor: colors.white,
          headerStyle: {height: 40, backgroundColor: colors.headerBlue},
          headerTitle: '',
        }}
        headerMode="none">
        <AppStack.Screen
          name="Main"
          component={Main}
          options={{
            headerStyle: {
              height: 20,
              backgroundColor: colors.headerBlue,
            },
          }}
        />
        <AppStack.Screen name="Camera" component={Camera} />
        <AppStack.Screen name="Register" component={Signup} />
        <AppStack.Screen name="Home" component={Home} />
        <AppStack.Screen name="Talk" component={Talk} />
        <AppStack.Screen name="Orientation" component={Orientation} />
        <AppStack.Screen name="MyOrientation" component={MyOrientation} />
        <AppStack.Screen name="NewOrientation" component={NewOrientation} />
        <AppStack.Screen name="Aluno" component={Aluno} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
