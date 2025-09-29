import * as React from "react";
import {
  AppBar,
  Drawer,
  IconButton,
  Box,
  Toolbar,
  styled,
  Fab,
  Button,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import { Menu as MenuIcon, Search as SearchIcon, MoreVert as MoreIcon, Add as AddIcon, Inbox as InboxIcon, Mail as MailIcon, AddAlarm as AddAlarmIcon, AccessAlarm as AccessAlarmIcon, Settings as SettingsIcon } from "@mui/icons-material";

const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
});
export default function Footer({ pageId, setPageId }: { pageId: number, setPageId: (id: number) => void }) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const pageIcons = [<AccessAlarmIcon />, <InboxIcon />, <SettingsIcon />]

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {['タイマー', 'メモ', '設定'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => setPageId(index)}>
              <ListItemIcon>
                {pageIcons[index]}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      <Toolbar>
        <IconButton color="inherit" aria-label="open drawer" onClick={() => setOpen(!open)}>
          <MenuIcon />
        </IconButton>
        {pageId !== 0 && <StyledFab color="secondary" aria-label="add" onClick={() => setPageId(0)}>
          <AddAlarmIcon />
        </StyledFab>}
        <Box sx={{ flexGrow: 1 }} />
      </Toolbar>
    </AppBar>
  );
}
