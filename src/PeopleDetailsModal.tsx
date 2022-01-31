import React, { useEffect, useState } from 'react';
import { Box, Modal, Typography } from '@mui/material';
import { IFilm, IPeople, ISpecie, IStarship, People } from 'swapi-ts';

interface PeopleDetailsModalProps {
  isOpen: boolean;
  onClose(): void;
  selectedName: string;
  species: ISpecie[];
  movies: IFilm[];
  starships: IStarship[];
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const PeopleDetailsModal: React.FC<PeopleDetailsModalProps> = ({
  isOpen,
  onClose,
  selectedName,
  species,
  movies,
  starships,
}) => {
  const [selectedPeople, setSelectedPeople] = useState<IPeople | null>(null);

  useEffect(() => {
    People.find((x) => x.name === selectedName).then((x) => {
      setSelectedPeople(x.resources[0].value);
    });
  }, [selectedName]);

  const peopleSpecies =
    selectedPeople?.species.map((x) => species.find((s) => s.url === x)?.name ?? '-').join(' , ') ??
    '-';

  const peopleMovies =
    selectedPeople?.films.map((x) => movies.find((s) => s.url === x)?.title ?? '-').join(' , ') ??
    '-';

  const peopleSpaceships =
    selectedPeople?.starships
      .map((x) => starships.find((s) => s.url === x)?.name ?? '-')
      .join(' , ') ?? '-';

  return (
    <Modal
      aria-describedby='modal-modal-description'
      aria-labelledby='modal-modal-title'
      open={isOpen}
      onClose={onClose}
    >
      <Box sx={style}>
        <Typography variant='body1'>
          Name: <span>{selectedPeople?.name}</span>
        </Typography>
        <Typography>
          Species: <span>{peopleSpecies}</span>
        </Typography>
        <Typography>
          Movies: <span>{peopleMovies}</span>
        </Typography>
        <Typography>
          Spaceships: <span>{peopleSpaceships}</span>
        </Typography>
      </Box>
    </Modal>
  );
};
