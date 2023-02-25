import {createMuiTheme} from '@material-ui/core/styles';
import {green} from '@material-ui/core/colors';


export const theme = createMuiTheme({
    palette: {
        info: {
            main: green[600],
            light: green[500]
        }
    }
});
