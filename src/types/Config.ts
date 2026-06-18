import { NotificationTheme } from "./Theme";

export interface NotificationConfig {
  applicationId: string;

  userId: string;

  apiUrl: string;

  websocketUrl?: string;

  theme?: NotificationTheme;
}
