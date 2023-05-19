import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Main from "../components/main";
import Settings from "../components/settings";
import Progress from "../components/progress"

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return(
        <TabNavigator>
            <Tab.Screen name="main" component={Main} />
            <Tab.Screen name="settings" component={Settings} />
            <Tab.Screen name="progress" component={Progress} />
        </TabNavigator>
    );
    
}

export default TabNavigator