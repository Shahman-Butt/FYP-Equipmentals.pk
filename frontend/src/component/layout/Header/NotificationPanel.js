import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import "../Header/NotificationPanel.css";
import {
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { Notifications as NotificationsIcon } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { getUserNotifications } from "../../../actions/userAction";
import { getProductDetails } from "../../../actions/productAction";

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
  // const [notifications, setNotifications] = useState([]);
  const notifications = useSelector(
    (state) => state.userNotifications.notifications
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const loading = useSelector((state) => state.userNotifications.loading);
  const dispatch = useDispatch();
  // console.log("notifi panel", notifications);
  const handleOpenNotifications = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseNotifications = () => {
    setAnchorEl(null);
  };

  const history = useHistory();

  const handleOpenDetails = (id) => {
    setAnchorEl(null);
    dispatch(getProductDetails(id));
    history.push(`/product/${id}`);
  };

  useEffect(() => {
    dispatch(getUserNotifications(user));
  }, [dispatch, user]);

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
        {loading && (
          <MenuItem>
            <CircularProgress />
          </MenuItem>
        )}
        {!loading && notifications.length === 0 && (
          <MenuItem>No new notifications</MenuItem>
        )}
        {!loading &&
          notifications.length > 0 &&
          notifications.map((notification) => (
            <div>
              <div
                className="notify"
                key={notification[1]}
                onClick={() => handleOpenDetails(notification[1])}
              >
                <p variant="body2">{notification[0]}</p>
              </div>
            </div>
          ))}
      </Menu>
    </>
  );
};

export default NotificationPanel;
