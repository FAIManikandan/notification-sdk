import React from "react";
import { NotificationConfig } from "../types/Config";
interface Props extends NotificationConfig {
    children: React.ReactNode;
}
export declare const NotificationProvider: ({ children, ...config }: Props) => React.JSX.Element;
export {};
