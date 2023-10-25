/* eslint-disable react/no-unstable-nested-components */

import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {NativeBaseProvider, Icon} from 'native-base';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {HomeScreen} from './Screens/Home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFirebase} from './firebase/init';
import {onAuthStateChanged} from 'firebase/auth';
import type {User} from 'firebase/auth';
import {SignInScreen} from './Screens/Auth/SignInScreen';
import {SignUpScreen} from './Screens/Auth/SignUpScreen';
import {AuthStackParamList, RootStackParamList} from './types/routes';
import {ProfileScreen} from './Screens/Profile';
import {CheckInForm} from './Screens/Checkin';
import {CalendarScreen} from './Screens/Calendar';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App() {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const {auth} = getFirebase();
    const unsubscribe = onAuthStateChanged(auth, _user => {
      if (_user !== undefined) {
        setUser(_user);
      }
    });

    return unsubscribe;
  }, []);

  // if (user === undefined) {
  //   return (
  //     <SafeAreaView>
  //       <View>
  //         <Text>loading</Text>
  //       </View>
  //     </SafeAreaView>
  //   ); // or a loading screen
  // }
  return (
    <NativeBaseProvider>
      {user ? <LoggedInApp /> : <LoggedOutApp />}
    </NativeBaseProvider>
  );
}

const Stack = createNativeStackNavigator<AuthStackParamList>();
function LoggedOutApp() {
  return (
    <NavigationContainer
      linking={{
        prefixes: ['https://swing.app', 'swing://'],
        config: {
          screens: {
            SignIn: {path: 'signin'},
            SignUp: {path: 'signup'},
          },
        },
      }}>
      <Stack.Navigator>
        <Stack.Screen
          name="SignIn"
          options={{title: 'Sign In'}}
          component={SignInScreen}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{title: 'Sign Up'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Tab = createBottomTabNavigator<RootStackParamList>();

function LoggedInApp(): JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            title: 'Home',
            tabBarIcon: ({focused}) => (
              <Icon
                as={
                  <IonIcon
                    name={focused ? 'ios-person' : 'ios-person-outline'}
                  />
                }
                color="black"
                size="lg"
              />
            ),
          }}
        />
        <Tab.Screen
          name="Calendar"
          component={CalendarScreen}
          options={{title: 'Calendar'}}
        />
        <Tab.Screen
          name="Inbox"
          component={Intro}
          options={{
            title: 'Inbox',
            tabBarIcon: ({focused}) => (
              <Icon
                as={
                  <IonIcon
                    name={focused ? 'paper-plane' : 'paper-plane-outline'}
                  />
                }
                color="black"
                size="lg"
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: false,
            title: 'Profile',
            tabBarIcon: ({focused}) => (
              <Icon
                as={
                  <IonIcon
                    name={focused ? 'ios-person' : 'ios-person-outline'}
                  />
                }
                color="black"
                size="lg"
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function Intro() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes hahah">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
