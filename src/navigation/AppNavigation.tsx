import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigator from './DrawerNavigator';
import LightTheme from '../theme/LightTheme';
import DarkTheme from '../theme/DarkTheme';
import {ApplicationState, ThemeState} from '../redux';
import {connect} from 'react-redux';
import {FC} from 'react';
import SplashScreen from '../screens/SplashScreen/SplashScreen';

interface NavigationProps {
  themeReducer: ThemeState;
}

const AppNavigation: FC<NavigationProps> = props => {
  const {selectedTheme} = props.themeReducer;
  const [loading, setLoading] = useState(true);

  return loading ? (
    <SplashScreen loading={loading} setLoading={setLoading} />
  ) : (
    <NavigationContainer
      theme={selectedTheme === 'dark' ? DarkTheme : LightTheme}>
      <DrawerNavigator />
    </NavigationContainer>
  );
};

const mapToStateProps = (state: ApplicationState) => ({
  themeReducer: state.themeReducer
});

export default connect(mapToStateProps)(AppNavigation);
