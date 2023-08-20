import { DefaultTheme } from "react-native-paper";
import colors from "./colors";

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    accent: colors.primaryLight,
  },
};
