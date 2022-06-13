 import 'react-native-gesture-handler'
 import React from 'react';
 import {FC} from 'react';
 import {Provider} from 'react-redux';
 import AppNavigation from './src/navigation';
 import {store} from './src/redux';
 import {LogBox} from 'react-native';
 import {NotifierWrapper} from 'react-native-notifier';
 
 LogBox.ignoreLogs(['Warning: ...']);
 LogBox.ignoreAllLogs(); 
 
 const App: FC = () => {
   return (
     <>
       <NotifierWrapper>
         <Provider store={store}>
             <AppNavigation />
         </Provider>
       </NotifierWrapper>
     </>
   );
 };
 
 export default App;
 