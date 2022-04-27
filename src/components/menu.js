import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import StarIcon from '@mui/icons-material/Star';
import { Link } from "gatsby";

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="/">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Market Data" />
    </ListItemButton>
    <ListItemButton component={Link} to="/favorites">
      <ListItemIcon>
        <StarIcon />
      </ListItemIcon>
      <ListItemText primary="Favorites" />
    </ListItemButton>
    <ListItemButton component={Link} to="/historical-data">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Historical Data" />
    </ListItemButton>
    <ListItemButton component={Link} to="/pricing-config">
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Pricing Configuration" />
    </ListItemButton>
    <ListItemButton component={Link} to="/batch-report">
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Batch Reports" />
    </ListItemButton>
  </React.Fragment>
);
