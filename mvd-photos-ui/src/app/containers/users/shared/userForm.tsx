import React, {useCallback, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {AuthCredentialsDto} from 'openapi/src';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {useStyles} from '../formStyles';


type Props = {
    userData?: AuthCredentialsDto;
    title: string;
    onApprove: (obj: AuthCredentialsDto) => void;
    onCancel: () => void;
};

export const UserForm: React.FC<Props> = ({userData, title, onApprove, onCancel}: Props) => {

    const classes = useStyles();

    const [formObj, setFormObj] = useState<AuthCredentialsDto>(userData || {
        username: '', password: '', isAdmin: false
    });

    const handleFieldChange = (
        key: keyof AuthCredentialsDto
    ): React.ChangeEventHandler<HTMLInputElement> => e => {
        setFormObj({...formObj, [key]: key === 'isAdmin' ? e.target.checked : e.target.value});
    };

    const handleApprove = useCallback(() => {
        onApprove(formObj);
    }, [formObj]);

    const handleCancel = useCallback(() => {
        onCancel();
    }, []);

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <div className={`${classes.row} ${classes.mt} ${classes.mb}`}>
                <Typography component="h4" variant="h4">
                    {title}
                </Typography>
            </div>
            <div className={classes.row}>
                <TextField
                    required
                    variant="outlined"
                    label="Ім'я користувача"
                    value={formObj.username}
                    onChange={handleFieldChange('username')}
                />
                <TextField
                    required
                    variant="outlined"
                    label="Пароль користувача"
                    value={formObj.password}
                    onChange={handleFieldChange('password')}
                />
                <FormControlLabel
                    style={{alignSelf: 'center'}}
                    control={
                        <Checkbox
                            checked={formObj.isAdmin}
                            onChange={handleFieldChange('isAdmin')}
                            color="primary"
                        />
                    }
                    label="Адмін"
                />

            </div>
            <div className={`${classes.row} ${classes.buttonsRow} ${classes.rowDivider}`}>
                <Button
                    className={classes.mr}
                    variant="contained"
                    color="primary"
                    onClick={handleApprove}>
                    Підтвердити
                </Button>
                <Button
                    variant="contained"
                    color="default"
                    onClick={handleCancel}>
                    Скасувати
                </Button>
            </div>
        </form>
    );
};
