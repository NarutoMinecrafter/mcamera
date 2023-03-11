import React, { PropsWithChildren, useState } from "react";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import Drawer from "@material-ui/core/Drawer";
import MenuIcon from "@material-ui/icons/Menu";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";
import StayCurrentPortraitIcon from "@material-ui/icons/StayCurrentPortrait";
import { useStyles } from "./styles";
import { useUser } from "../../services/user/useUser";
import { Link } from "react-router-dom";

const MenuRoutes = [
  {
    path: "/users",
    title: "Користувачі",
    icon: <PersonIcon />,
  },
  {
    path: "/devices",
    title: "Пристрої",
    icon: <StayCurrentPortraitIcon />,
  },
];

export const Main: React.FC<PropsWithChildren<{}>> = ({
  children,
}: PropsWithChildren<{}>) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { logout, user, isLogged } = useUser();

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setOpen(open);
    };

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {isLogged && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer(true)}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Система керування &quot;М камера&quot;
          </Typography>
          {isLogged && (
            <>
              <Typography component="p" className={classes.name}>
                {user?.username}
              </Typography>
              {user?.isAdmin && (
                <Avatar className={`${classes.orange} ${classes.name}`}>
                  AD
                </Avatar>
              )}
              <Button color="default" variant="contained" onClick={logout}>
                Вихід
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <div
          className={classes.list}
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {MenuRoutes.map((route, index) => (
              <ListItem button key={index} component={Link} to={route.path}>
                <ListItemIcon>{route.icon}</ListItemIcon>
                <ListItemText primary={route.title} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
      <main className={clsx(classes.content)}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="xl" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <div className={classes.paper}>{children}</div>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
};
