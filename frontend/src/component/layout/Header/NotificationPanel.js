// import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import {
//   Badge,
//   IconButton,
//   Menu,
//   MenuItem,
//   Typography,
// } from "@material-ui/core";
// import { Notifications as NotificationsIcon } from "@material-ui/icons";

// const useStyles = makeStyles((theme) => ({
//   notificationsButton: {
//     marginRight: theme.spacing(1),
//   },
//   notificationsBadge: {
//     top: "50%",
//     right: -3,
//     // The border color match the background color.
//     border: `2px solid ${
//       theme.palette.type === "light"
//         ? theme.palette.grey[200]
//         : theme.palette.grey[900]
//     }`,
//   },
// }));

// const NotificationPanel = () => {
//   const classes = useStyles();
//   const [anchorEl, setAnchorEl] = React.useState(null);

//   const handleOpenNotifications = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleCloseNotifications = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <>
//       <IconButton
//         aria-label="show notifications"
//         aria-controls="notifications-menu"
//         aria-haspopup="true"
//         color="inherit"
//         className={classes.notificationsButton}
//         onClick={handleOpenNotifications}
//       >
//         <Badge
//           badgeContent={4}
//           color="secondary"
//           classes={{ badge: classes.notificationsBadge }}
//         >
//           <NotificationsIcon />
//         </Badge>
//       </IconButton>
//       <Menu
//         id="notifications-menu"
//         anchorEl={anchorEl}
//         keepMounted
//         open={Boolean(anchorEl)}
//         onClose={handleCloseNotifications}
//       >
//         <MenuItem onClick={handleCloseNotifications}>
//           <Typography variant="body2">You have a new message</Typography>
//         </MenuItem>
//         <MenuItem onClick={handleCloseNotifications}>
//           <Typography variant="body2">Your item has been shipped</Typography>
//         </MenuItem>
//         <MenuItem onClick={handleCloseNotifications}>
//           <Typography variant="body2">Your order has been delivered</Typography>
//         </MenuItem>
//         <MenuItem onClick={handleCloseNotifications}>
//           <Typography variant="body2">You have a new follower</Typography>
//         </MenuItem>
//       </Menu>
//     </>
//   );
// };

// export default NotificationPanel;
// import { useEffect, useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import {
//   Badge,
//   IconButton,
//   Menu,
//   MenuItem,
//   Typography,
// } from "@material-ui/core";
// import { Notifications as NotificationsIcon } from "@material-ui/icons";
// import { useSelector, useDispatch } from "react-redux";
// import { getUserNotifications } from "../../../actions/userAction";
// const useStyles = makeStyles((theme) => ({
//   notificationsButton: {
//     marginRight: theme.spacing(1),
//   },
//   notificationsBadge: {
//     top: "50%",
//     right: -3,
//     // The border color match the background color.
//     border: `2px solid ${
//       theme.palette.type === "light"
//         ? theme.palette.grey[200]
//         : theme.palette.grey[900]
//     }`,
//   },
// }));

// const NotificationPanel = ({ user }) => {
//   console.log("noti");
//   const classes = useStyles();
//   const [notifications, setNotifications] = useState([]);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const dispatch = useDispatch();
//   // const { notifications, loading, error } = useSelector(
//   //   (state) => state.getUserNotifications
//   // );
//   // const userId = user._id;
//   // const { user, isAuthenticated } = useSelector((state) => state.user);

//   useEffect(() => {
//     // Fetch notifications data from backend API using userId
//     console.log("noti", notifications);

//     console.log("header userId ", user);

//     // console.log("header userId ", user._id);
//     // fetch(`/api/notifications?userId=${userId}`)
//     //   .then((response) => response.json())
//     //   .then((data) => setNotifications(data))
//     //   .catch((error) => console.error(error));
//     dispatch(getUserNotifications(user));
//   }, [user]);

//   const handleOpenNotifications = (event) => {
//     console.log("notification");
//     setAnchorEl(event.currentTarget);
//   };

//   const handleCloseNotifications = () => {
//     console.log("no");
//     setAnchorEl(null);
//   };

//   return (
//     <>
//       <IconButton
//         aria-label="show notifications"
//         aria-controls="notifications-menu"
//         aria-haspopup="true"
//         color="inherit"
//         className={classes.notificationsButton}
//         onClick={handleOpenNotifications}
//       >
//         <Badge
//           badgeContent={notifications.length}
//           color="secondary"
//           classes={{ badge: classes.notificationsBadge }}
//         >
//           <NotificationsIcon />
//         </Badge>
//       </IconButton>
//       <Menu
//         id="notifications-menu"
//         anchorEl={anchorEl}
//         keepMounted
//         open={Boolean(anchorEl)}
//         onClose={handleCloseNotifications}
//       >
//         console.log(notifications);
//         {notifications.map((notification) => (
//           <MenuItem key={notification._id} onClick={handleCloseNotifications}>
//             <Typography variant="body2">{notification.info}</Typography>
//           </MenuItem>
//         ))}
//       </Menu>
//     </>
//   );
// };

// export default NotificationPanel;

// import { useEffect, useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import {
//   Badge,
//   IconButton,
//   Menu,
//   MenuItem,
//   Typography,
// } from "@material-ui/core";
// import { Notifications as NotificationsIcon } from "@material-ui/icons";
// import { useSelector, useDispatch } from "react-redux";
// import { getUserNotifications } from "../../../actions/userAction";

// const useStyles = makeStyles((theme) => ({
//   notificationsButton: {
//     marginRight: theme.spacing(1),
//   },
//   notificationsBadge: {
//     top: "50%",
//     right: -3,
//     // The border color match the background color.
//     border: `2px solid ${
//       theme.palette.type === "light"
//         ? theme.palette.grey[200]
//         : theme.palette.grey[900]
//     }`,
//   },
// }));

// const NotificationPanel = ({ user }) => {
//   console.log("noti");
//   const classes = useStyles();
//   const [notifications, setNotifications] = useState([]);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     // Fetch notifications data from backend API using userId
//     console.log("noti", notifications);

//     console.log("header userId ", user);

//     dispatch(getUserNotifications(user));
//   }, [user]);

//   const handleOpenNotifications = (event) => {
//     console.log("notification");
//     setAnchorEl(event.currentTarget);
//   };

//   const handleCloseNotifications = () => {
//     console.log("no");
//     setAnchorEl(null);
//   };

//   return (
//     <>
//       <IconButton
//         aria-label="show notifications"
//         aria-controls="notifications-menu"
//         aria-haspopup="true"
//         color="inherit"
//         className={classes.notificationsButton}
//         onClick={handleOpenNotifications}
//       >
//         <Badge
//           badgeContent={notifications.length}
//           color="secondary"
//           classes={{ badge: classes.notificationsBadge }}
//         >
//           <NotificationsIcon />
//         </Badge>
//       </IconButton>
//       <Menu
//         id="notifications-menu"
//         anchorEl={anchorEl}
//         keepMounted
//         open={Boolean(anchorEl)}
//         onClose={handleCloseNotifications}
//       >
//         {notifications.map((notification) => (
//           <div key={notification[2]}>
//             <MenuItem onClick={handleCloseNotifications}>
//               <Typography variant="body2">{notification[0]}</Typography>
//             </MenuItem>
//             <MenuItem onClick={handleCloseNotifications}>
//               <Typography variant="body2">{notification[1]}</Typography>
//             </MenuItem>
//           </div>
//         ))}
//       </Menu>
//     </>
//   );
// };

// export default NotificationPanel;

import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { Notifications as NotificationsIcon } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { getUserNotifications } from "../../../actions/userAction";

const useStyles = makeStyles((theme) => ({
  notificationsButton: {
    marginRight: theme.spacing(1),
  },
  notificationsBadge: {
    top: "50%",
    right: -3,
    // The border color match the background color.
    border: `2px solid ${
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[900]
    }`,
  },
}));

const NotificationPanel = ({ user }) => {
  const classes = useStyles();
  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  console.log(notifications, "noti in Fe");
  useEffect(() => {
    const fetchNotifications = async () => {
      const data = await dispatch(getUserNotifications(user));
      setNotifications(data.notifications);
    };
    fetchNotifications();
  }, [user, dispatch]);

  const handleOpenNotifications = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseNotifications = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-label="show notifications"
        aria-controls="notifications-menu"
        aria-haspopup="true"
        color="inherit"
        className={classes.notificationsButton}
        onClick={handleOpenNotifications}
      >
        <Badge
          badgeContent={notifications.length}
          color="secondary"
          classes={{ badge: classes.notificationsBadge }}
        >
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        id="notifications-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseNotifications}
      >
        <Typography variant="body2"> i </Typography>
        <Typography variant="body2">k </Typography>
        <Typography variant="body2">lorem*5 beduhnfihff </Typography>
        <Typography variant="body2">lorem*5 beduhnfihff </Typography>
        <Typography variant="body2">lorem*5 beduhnfihff </Typography>
        <Typography variant="body2">lorem*5 beduhnfihff </Typography>

        <Typography variant="body2"> {notifications} </Typography>
        {/* {notifications.map((notification) => (
          <MenuItem onClick={handleCloseNotifications}>
            <Typography variant="body2">{notification[0][0]} i </Typography>
            <Typography variant="body2">{notification[1][0]} k </Typography>
          </MenuItem>
        ))} */}

        {notifications.map((notification, index) => (
          <MenuItem key={index} onClick={handleCloseNotifications}>
            <Typography variant="body2">e</Typography>
            <Typography variant="body2">f</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default NotificationPanel;

// import { useEffect, useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import {
//   Badge,
//   IconButton,
//   Menu,
//   MenuItem,
//   Typography,
// } from "@material-ui/core";
// import { Notifications as NotificationsIcon } from "@material-ui/icons";
// import { useSelector, useDispatch } from "react-redux";
// import { getUserNotifications } from "../../../actions/userAction";

// const useStyles = makeStyles((theme) => ({
//   notificationsButton: {
//     marginRight: theme.spacing(1),
//   },
//   notificationsBadge: {
//     top: "50%",
//     right: -3,
//     // The border color match the background color.
//     border: `2px solid ${
//       theme.palette.type === "light"
//         ? theme.palette.grey[200]
//         : theme.palette.grey[900]
//     }`,
//   },
// }));

// const NotificationPanel = ({ user }) => {
//   const classes = useStyles();
//   const [notifications, setNotifications] = useState([]);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getUserNotifications(user));
//   }, [user]);

//   const handleOpenNotifications = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleCloseNotifications = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <>
//       <IconButton
//         aria-label="show notifications"
//         aria-controls="notifications-menu"
//         aria-haspopup="true"
//         color="inherit"
//         className={classes.notificationsButton}
//         onClick={handleOpenNotifications}
//       >
//         <Badge
//           badgeContent={notifications.length}
//           color="secondary"
//           classes={{ badge: classes.notificationsBadge }}
//         >
//           <NotificationsIcon />
//         </Badge>
//       </IconButton>
//       <Menu
//         id="notifications-menu"
//         anchorEl={anchorEl}
//         keepMounted
//         open={Boolean(anchorEl)}
//         onClose={handleCloseNotifications}
//       >
//         <Typography variant="body2">el</Typography>
//         <Typography variant="body2">{notifications}</Typography>
//         {notifications.map((notification, index) => (
//           <MenuItem key={index} onClick={handleCloseNotifications}>
//             <Typography variant="body2">{notification[0]}</Typography>
//             <Typography variant="body2">{notification[1]}</Typography>
//           </MenuItem>
//         ))}
//       </Menu>
//     </>
//   );
// };

// export default NotificationPanel;
