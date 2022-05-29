import Avatar from '@material-ui/core/Avatar';
import Checkbox from '@material-ui/core/Checkbox';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import { useState } from 'react';
import ToolbarMenu from './ToolbarMenu';

function MembersMenu(props) {
  const user_connected = JSON.parse(localStorage.getItem("user_connected"));

  const [anchorEl, setAnchorEl] = useState(null);
console.log('frfrfrfrfr',props.members);
  function handleMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }

  return (
    <div>
      <IconButton color="inherit"         disabled={user_connected.role === "admin" ? false : true}
 onClick={handleMenuOpen}>
        <Icon>account_circle</Icon>
      </IconButton>
      <ToolbarMenu state={anchorEl} onClose={handleMenuClose}>
        <div className="">
          {props.members.map((member) => {
            return (
              <MenuItem
                className="px-8"
                key={member._id}
                onClick={(ev) => {
                  props.onToggleMember(member._id);
                }}
              >
                <Checkbox checked={props.idMembers.includes(member._id)} />
                <Avatar className="w-32 h-32" src={member.avatar} />
                <ListItemText className="mx-8">{member.name}</ListItemText>
              </MenuItem>
            );
          })}
        </div>
      </ToolbarMenu>
    </div>
  );
}

export default MembersMenu;
