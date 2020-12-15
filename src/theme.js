import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: "'Cairo', sans-serif",
    h6 : {
      fontSize: "1rem",
      opacity: 0.9,
      fontStyle: "italic"
    },
    overline : {
      fontSize: "1.1rem"
    }
  },
  link: {
    textTransform : "none",
  }
  
});

export default theme;
