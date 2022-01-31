import React, { useState } from 'react';
import { Star, StarBorder } from '@mui/icons-material';
import {
  AppBar,
  Badge,
  Button,
  Card,
  CardContent,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';

import { useDataContext } from './dataContext';
import { FilterBar } from './filterBar';
import { PeopleDetailsModal } from './PeopleDetailsModal';

export const Page = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const {
    filteredPeople,
    favoritePeople,
    onToggleFavorite,
    selectedPerson,
    onToggleSelectedPerson,
  } = useDataContext();

  return (
    <div>
      <Drawer
        anchor='right'
        open={isDrawerOpen}
        sx={{ '& .MuiDrawer-paper': { width: '600px' } }}
        onClose={() => setIsDrawerOpen(false)}
      >
        <List>
          {favoritePeople.map((x) => (
            <React.Fragment key={x.name}>
              <ListItem>
                <ListItemIcon
                  sx={{ cursor: 'pointer' }}
                  onClick={() => {
                    onToggleFavorite(x);
                  }}
                >
                  <Star />
                </ListItemIcon>
                <ListItemButton
                  onClick={() => {
                    onToggleSelectedPerson(x);
                  }}
                >
                  <ListItemText>{x.name}</ListItemText>
                </ListItemButton>
              </ListItem>
              <Divider component='li' />
            </React.Fragment>
          ))}
        </List>
      </Drawer>

      <PeopleDetailsModal isOpen={!!selectedPerson} />

      <AppBar position='static'>
        <Toolbar>
          <Typography component='div' sx={{ flexGrow: 1 }} variant='h6'>
            AVA.code
          </Typography>
          <Badge badgeContent={favoritePeople.length} color='secondary'>
            <Button
              color='secondary'
              disabled={favoritePeople.length === 0}
              variant='contained'
              onClick={() => {
                setIsDrawerOpen(true);
              }}
            >
              Favorites
            </Button>
          </Badge>
        </Toolbar>
      </AppBar>
      <FilterBar />
      <Card sx={{ marginTop: '16px' }} variant='elevation'>
        <CardContent>
          <List>
            {filteredPeople.map((x) => {
              const favorite = favoritePeople.includes(x);

              return (
                <React.Fragment key={x.name}>
                  <ListItem>
                    <ListItemIcon
                      sx={{ cursor: 'pointer' }}
                      onClick={() => {
                        onToggleFavorite(x);
                      }}
                    >
                      {favorite ? <Star /> : <StarBorder />}
                    </ListItemIcon>
                    <ListItemButton
                      onClick={() => {
                        onToggleSelectedPerson(x);
                      }}
                    >
                      <ListItemText>{x.name}</ListItemText>
                    </ListItemButton>
                  </ListItem>
                  <Divider component='li' />
                </React.Fragment>
              );
            })}
          </List>
        </CardContent>
      </Card>
    </div>
  );
};
