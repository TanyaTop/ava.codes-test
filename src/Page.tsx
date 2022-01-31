import React, { useEffect, useState } from 'react';
import { Star, StarBorder } from '@mui/icons-material';
import {
  AppBar,
  Badge,
  Button,
  Card,
  CardContent,
  Divider,
  Drawer,
  FormControl,
  FormControlLabel,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  Switch,
  Toolbar,
  Typography,
} from '@mui/material';
import { Films, IFilm, IPeople, ISpecie, IStarship, People, Species, Starships } from 'swapi-ts';

import { PeopleDetailsModal } from './PeopleDetailsModal';

const minYear = 8;
const maxYear = 896;

const yearsOptions: string[] = [];

for (let index = minYear; index < maxYear; index += 50) {
  yearsOptions.push(`${index}-${index + 50}`);
}

export const Page = () => {
  const [selectedPerson, setSelectedPerson] = useState<string>('');
  const [favorites, setFavorites] = useState<string[]>([]);

  const [selectedFilm, setSelectedFilm] = useState<string>('none');
  const [selectedSpecie, setSelectedSpecie] = useState<string>('none');
  const [selectedBirthRange, setSelectedBirthRange] = useState<string>('none');
  const [isOrFiltering, setIsOrFiltering] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [people, setPeople] = useState<IPeople[]>([]);
  const [films, setFilms] = useState<IFilm[]>([]);
  const [species, setSpecie] = useState<ISpecie[]>([]);
  const [starships, setStarships] = useState<IStarship[]>([]);

  useEffect(() => {
    People.find().then((x) => setPeople(x.resources.map((r) => r.value)));
    Species.find().then((x) => setSpecie(x.resources.map((r) => r.value)));
    Films.find().then((x) => setFilms(x.resources.map((r) => r.value)));
    Starships.find().then((x) => setStarships(x.resources.map((r) => r.value)));
  }, []);

  useEffect(() => {
    People.find((x) => {
      if (selectedFilm !== 'none') {
        const resultFilm = x.films.includes(selectedFilm as any);

        if (resultFilm === false) {
          return false;
        }

        if (isOrFiltering) {
          return true;
        }
      }

      if (selectedSpecie !== 'none') {
        const resultSpecies = x.species.includes(selectedSpecie as any);

        if (resultSpecies === false) {
          return false;
        }

        if (isOrFiltering) {
          return true;
        }
      }

      if (selectedBirthRange !== 'none') {
        if (x.birth_year === 'unknown') {
          return false;
        }

        const peopleYear = Number.parseInt(x.birth_year, 10);

        const [left, right] = selectedBirthRange.split('-');

        const resultBirthRange = +left >= peopleYear && peopleYear <= +right;

        if (resultBirthRange === false) {
          return false;
        }

        if (isOrFiltering) {
          return true;
        }
      }

      return true;
    }).then((x) => setPeople(x.resources.map((r) => r.value)));
  }, [selectedFilm, selectedSpecie, selectedBirthRange, isOrFiltering]);

  const favoritesPeople = people.filter((x) => favorites.includes(x.name));

  return (
    <div>
      <Drawer
        anchor='right'
        open={isDrawerOpen}
        sx={{ '& .MuiDrawer-paper': { width: '600px' } }}
        onClose={() => setIsDrawerOpen(false)}
      >
        <List>
          {favoritesPeople.map((x) => (
            <React.Fragment key={x.name}>
              <ListItem>
                <ListItemIcon
                  sx={{ cursor: 'pointer' }}
                  onClick={() => {
                    setFavorites([...favorites, x.name]);
                  }}
                >
                  <Star />
                </ListItemIcon>
                <ListItemButton
                  onClick={() => {
                    setSelectedPerson(x.name);
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

      <PeopleDetailsModal
        isOpen={selectedPerson !== ''}
        movies={films}
        selectedName={selectedPerson}
        species={species}
        starships={starships}
        onClose={() => setSelectedPerson('')}
      />

      <AppBar position='static'>
        <Toolbar>
          <Typography component='div' sx={{ flexGrow: 1 }} variant='h6'>
            AVA.code
          </Typography>
          <Badge badgeContent={favorites.length} color='secondary'>
            <Button
              color='secondary'
              disabled={favorites.length === 0}
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
      <Card variant='elevation'>
        <CardContent>
          <Stack alignItems='center' direction='row' justifyContent='space-between' spacing={3}>
            <FormControl fullWidth>
              <InputLabel id='movie-label'>Movie</InputLabel>
              <Select
                label='Movie'
                labelId='movie-label'
                value={selectedFilm}
                displayEmpty
                onChange={(e) => {
                  setSelectedFilm(e.target.value);
                }}
              >
                <MenuItem value='none'>None</MenuItem>
                {films.map((x) => (
                  <MenuItem key={x.title} value={x.url}>
                    {x.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id='species-label'>Species</InputLabel>
              <Select
                label='Species'
                labelId='species-label'
                value={selectedSpecie}
                onChange={(e) => {
                  setSelectedSpecie(e.target.value);
                }}
              >
                <MenuItem value='none'>None</MenuItem>
                {species.map((x) => (
                  <MenuItem key={x.name} value={x.url}>
                    {x.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id='birth-label'>Species</InputLabel>
              <Select
                label='Species'
                labelId='birth-label'
                value={selectedBirthRange}
                onChange={(e) => {
                  setSelectedBirthRange(e.target.value);
                }}
              >
                <MenuItem value='none'>None</MenuItem>
                {yearsOptions.map((x) => {
                  const [first, second] = x.split('-');

                  return (
                    <MenuItem key={x} value={x}>
                      {first} BBY - {second} BBY
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <FormControlLabel
              control={
                <Switch
                  color='primary'
                  value={isOrFiltering}
                  onChange={() => {
                    setIsOrFiltering((x) => !x);
                  }}
                />
              }
              label='Or'
              labelPlacement='top'
              value={isOrFiltering}
            />
          </Stack>
        </CardContent>
      </Card>

      <Card sx={{ marginTop: '16px' }} variant='elevation'>
        <CardContent>
          <List>
            {people.map((x) => {
              const favorite = favorites.includes(x.name);

              return (
                <React.Fragment key={x.name}>
                  <ListItem>
                    <ListItemIcon
                      sx={{ cursor: 'pointer' }}
                      onClick={() => {
                        if (favorite) {
                          setFavorites(favorites.filter((f) => f !== x.name));
                        } else {
                          setFavorites([...favorites, x.name]);
                        }
                      }}
                    >
                      {favorite ? <Star /> : <StarBorder />}
                    </ListItemIcon>
                    <ListItemButton
                      onClick={() => {
                        setSelectedPerson(x.name);
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
