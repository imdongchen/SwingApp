/* eslint-disable react/no-unstable-nested-components */

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
import {NativeBaseProvider, Box, Icon} from 'native-base';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {Home} from './Home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {firebaseApp} from './firebase/init';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import type {User} from 'firebase/auth';
import {SignInScreen} from './Screens/Auth/SignInScreen';
import {SignUpScreen} from './Screens/Auth/SignUpScreen';
import {RootStackParamList} from './types';

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

const Tab = createBottomTabNavigator<RootStackParamList>();

function App() {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    const unsubscribe = onAuthStateChanged(auth, _user => {
      if (_user) {
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

const Stack = createNativeStackNavigator();
function LoggedOutApp() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Sign up" component={SignUpScreen} />
        <Stack.Screen name="Sign in" component={SignInScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function LoggedInApp(): JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
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
          component={Intro}
          options={{title: 'Calendar'}}
        />
        <Tab.Screen
          name="Checkin"
          component={Intro}
          options={{title: 'Checkin'}}
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
          component={Intro}
          options={{
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
