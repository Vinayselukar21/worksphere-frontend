import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";

type AppSettingStoreState = {
  calendarSettings: { view: "month" | "week" | "day" | "list" };
};

type AppSettingStoreActions = {
  setCalendarSettings: (
    calendarSettings: AppSettingStoreState["calendarSettings"]
  ) => void;
  resetAppSettings: () => void;
};

type AppSettingStore = AppSettingStoreState & AppSettingStoreActions;

const appSettingStore = createStore<AppSettingStore>()(
  persist(
    (set) => ({
      calendarSettings: { view: "month" },
      setCalendarSettings: (calendarSettings: AppSettingStoreState["calendarSettings"]) => {
        console.log(calendarSettings , "inside store");
        set({ calendarSettings });
      },
      resetAppSettings: () => {
        set({ calendarSettings: { view: "month" } });
      },
    }),
    { name: "appSetting-storage" }
  )
);

export default appSettingStore;
