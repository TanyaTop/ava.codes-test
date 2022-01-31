import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
} from '@mui/material';

import { useDataContext } from './dataContext';

const minYear = 8;
const maxYear = 896;

const yearsOptions: string[] = [];

for (let index = minYear; index < maxYear; index += 50) {
  yearsOptions.push(`${index}-${index + 50}`);
}

export const FilterBar: React.FC = () => {
  const { onFilter, people, species, films } = useDataContext();

  const [selectedFilm, setSelectedFilm] = useState<string>('none');
  const [selectedSpecie, setSelectedSpecie] = useState<string>('none');
  const [selectedBirthRange, setSelectedBirthRange] = useState<string>('none');
  const [isOrFiltering, setIsOrFiltering] = useState(false);

  useEffect(() => {
    const filtered = people.filter((x) => {
      if (selectedFilm !== 'none') {
        const resultFilm = x.films.includes(selectedFilm as any);

        if (isOrFiltering && resultFilm) {
          return true;
        }

        if (resultFilm === false) {
          return false;
        }
      }

      if (selectedSpecie !== 'none') {
        const resultSpecies = x.species.includes(selectedSpecie as any);

        if (isOrFiltering && resultSpecies) {
          return true;
        }

        if (resultSpecies === false) {
          return false;
        }
      }

      if (selectedBirthRange !== 'none') {
        if (x.birth_year === 'unknown') {
          return false;
        }

        const peopleYear = Number.parseInt(x.birth_year, 10);

        const [left, right] = selectedBirthRange.split('-');

        const resultBirthRange = +left >= peopleYear && peopleYear <= +right;

        if (isOrFiltering && resultBirthRange) {
          return true;
        }

        if (resultBirthRange === false) {
          return false;
        }
      }

      return true;
    });

    onFilter(filtered);
  }, [selectedFilm, selectedSpecie, selectedBirthRange, isOrFiltering, people, onFilter]);

  return (
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
  );
};
