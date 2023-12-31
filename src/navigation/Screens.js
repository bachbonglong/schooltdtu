import React from "react";
import { Easing, Animated, Dimensions } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Block, Icon } from "galio-framework";

// screens
import Home from "../screens/Home";
import Onboarding from "../screens/Onboardingv2";
import Pro from "../screens/Pro";
import Profile from "../screens/Profilev2";
import Register from "../screens/Register";
import Login from "../screens/Login";
import Elements from "../screens/Elements";
import Components from "../screens/Components";
import Article from "../screens/Article";
import Articles from "../screens/Articles";
import Presentation from "../screens/Presentation";
import Dashboard from "../screens/Dashboard";
import Settings from "../screens/Settings";
// drawer
import CustomDrawerContent from "./Menu";

// header for screens
import { Header } from "../components";
import Registerv2 from "../screens/Registerv2";
import Scores from "../screens/Scores";
import ClassObject from "../screens/ClassObject";
import DetailClassObject from "../screens/DetailClassObject";
import ChatScreen from "../screens/ChatGPT";
import NotificationsScreen from "../screens/Notification";
import TeacherFeedbackScreen from "../screens/Feedback";
import ChangePass from "../screens/ChangePass";
import DetailComment from "../screens/DetailComment";
import SpellScreen from "../screens/Spell";
import DuDoanChonKhoi from "../screens/DuDoanChonKhoi";
import QuickCaculator from "../screens/QuickCaculator";
import GetInfo from "../screens/GetInfo";
import Student from "../screens/Student";

const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function ElementsStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Elements"
        component={Components}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Elements" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
      <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

function DashboardStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Dashboard" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
      <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

function PresentationStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Presentation"
        component={Presentation}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
      <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

function SettingsStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Settings" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
      <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

function ArticlesStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Articles"
        component={Articles}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Articles" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
      <Stack.Screen
        name="Article"
        component={Article}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Article"
              back
              navigation={navigation}
              scene={scene}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function ProfileStack(props) {
  return (
    <Stack.Navigator initialRouteName="Profile" mode="card" headerMode="screen">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              transparent
              white
              title="Profile"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

function LoginStack(props) {
  return (
    <Stack.Navigator initialRouteName="Profile" mode="card" headerMode="screen">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              transparent
              black
              title=""
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              black
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

function HomeStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Home"
              search
              options
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
      <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
      />

      <Stack.Screen name="PROFILE" component={Profile} options={{}} />
      <Stack.Screen name="SCORE" component={Scores} options={{}} />
      <Stack.Screen name="CLASS SUBJECT" component={ClassObject} options={{}} />

      <Stack.Screen
        name="DETAIL CLASS SUBJECT"
        component={DetailClassObject}
        options={{}}
      />

      <Stack.Screen
        name="DETAIL COMMENT"
        component={DetailComment}
        options={{}}
      />
      <Stack.Screen name="CHAT GPT" component={ChatScreen} options={{}} />

      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{}}
      />

      <Stack.Screen
        name="Feedback"
        component={TeacherFeedbackScreen}
        options={{}}
      />

      <Stack.Screen name="Prediction" component={SpellScreen} options={{}} />
      <Stack.Screen
        name="Prediction Industry Sector"
        component={DuDoanChonKhoi}
        options={{}}
      />
      <Stack.Screen
        name="Quick Calculator"
        component={QuickCaculator}
        options={{}}
      />
      <Stack.Screen
        name="Get Info University"
        component={GetInfo}
        options={{}}
      />

      <Stack.Screen name="List Student" component={Student} options={{}} />
    </Stack.Navigator>
  );
}

export default function OnboardingStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        option={{
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="LOGIN"
        component={Login}
        option={{
          headerTransparent: true,
        }}
      />
      <Stack.Screen name="CHANGE PASS" component={ChangePass} />
      <Stack.Screen name="App" component={AppStack} />
      <Stack.Screen name="Pro" component={Pro} />
    </Stack.Navigator>
  );
}

function AppStack(props) {
  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: "white",
        width: width * 0.8,
      }}
      drawerContentOptions={{
        activeTintcolor: "white",
        inactiveTintColor: "#000",
        activeBackgroundColor: "transparent",
        itemStyle: {
          width: width * 0.75,
          backgroundColor: "transparent",
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          overflow: "hidden",
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: "normal",
        },
      }}
      initialRouteName="Home"
    >
      <Drawer.Screen name="Home" component={HomeStack} />
      <Drawer.Screen name="Profile" component={ProfileStack} />
      <Drawer.Screen name="Notification" component={ElementsStack} />
      <Drawer.Screen name="Settings" component={SettingsStack} />
    </Drawer.Navigator>
  );
}
