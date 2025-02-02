import { Drawer } from "expo-router/drawer";
import { DrawerContent } from "@/components";
import { CustomOptions } from "../../../types/navigation";

export default function DrawerLayout() {
    return (
        <Drawer screenOptions={{
            headerShown: false,
            drawerStyle: {
                width: "75%",
            }

        }}
            drawerContent={(props) => <DrawerContent {...props} />}
        >
            {/* aqui foi criado um tipo especifico para mostrar as opções, criado em Types.navication.d.ts */}
            <Drawer.Screen name="(tabs)"
                options={{
                    title: "Home",
                    iconName: "home",
                    isDivider: true,
                    notifications: 5
                } as CustomOptions} />

            <Drawer.Screen name="config"
                options={{
                    title: "Config",
                    iconName: "settings",
                    isDivider: false
                } as CustomOptions} />

        </Drawer>
    )
}