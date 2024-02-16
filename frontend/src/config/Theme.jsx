import { createTheme } from "@mui/material";
import { red } from '@mui/material/colors';

export const getTheme = createTheme ({
    palette: {
        primary: {
          main: '#35bf31'
        },
        secondary: {
          main: '#72bf31'
        },
        error: {
          main: red.A400
        }
      }
  })