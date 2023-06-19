import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Main from "./components/main";
import Progress from "./components/progress";
import Settings from "./components/settings";
import { isDarkMode } from "./styles/style";

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                showLabel: false,
                style: {
                    position: 'absolute',
                    bottom: 20,
                    left: 32,
                    right: 32,
                    height: 66,
                    backgroundColor: isDarkMode() ? '#7B68EE' : '#E6E6FA',
                    borderRadius: 85,
                }
            }}>
            <Tab.Screen name='Main' component={Main} />
            <Tab.Screen name='Progress' component={Progress} />
            <Tab.Screen name='Settings' component={Settings} />
        </Tab.Navigator>
    );
}

export default Tabs;