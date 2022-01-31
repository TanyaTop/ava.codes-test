import React from 'react';
import { Box, Modal, Typography } from '@mui/material';

import { useDataContext } from './dataContext';

interface PeopleDetailsModalProps {
  isOpen: boolean;
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

export const PeopleDetailsModal: React.FC<PeopleDetailsModalProps> = ({ isOpen }) => {
  const { films, species, starships, selectedPerson, onToggleSelectedPerson } = useDataContext();

  const peopleSpecies =
    selectedPerson?.species.map((x) => species.find((s) => s.url === x)?.name ?? '-').join(' , ') ??
    '-';

  const peopleMovies =
    selectedPerson?.films.map((x) => films.find((s) => s.url === x)?.title ?? '-').join(' , ') ??
    '-';

  const peopleSpaceships =
    selectedPerson?.starships
      .map((x) => starships.find((s) => s.url === x)?.name ?? '-')
      .join(' , ') ?? '-';

  return (
    <Modal
      aria-describedby='modal-modal-description'
      aria-labelledby='modal-modal-title'
      open={isOpen}
      onClose={() => onToggleSelectedPerson(null)}
    >
      <Box sx={style}>
        <Typography variant='body1'>
          Name: <span>{selectedPerson?.name}</span>
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
