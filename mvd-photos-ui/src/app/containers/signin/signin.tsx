import React, {KeyboardEventHandler, useCallback, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {useStyles} from './styles';
import {useSignIn} from '../../services/signin/useSignIn';


export const SignIn: React.FC = () => {
    const classes = useStyles();
    const {signin} = useSignIn();

    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const signinCallback = useCallback(() => {
        signin({username, password});
    }, [password, username]);

    const onKeyUpHandler: KeyboardEventHandler<HTMLInputElement> = useCallback(event => {
        if (event.key === 'Enter') {
            signinCallback();
        }
    }, [password, username]);

    return (
        <Container component="main" maxWidth="xs">

            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Увійти
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Ім'я"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        onKeyUp={onKeyUpHandler}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Пароль"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        onKeyUp={onKeyUpHandler}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"/>}
                        label="Запам'ятати мене"
                    />
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={signinCallback}
                        className={classes.submit}>
                        Увійти
                    </Button>
                </form>
            </div>
        </Container>
    );
};
