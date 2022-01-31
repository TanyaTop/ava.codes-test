import React, { createContext, useContext, useEffect, useState } from 'react';
import { Films, IFilm, IPeople, ISpecie, IStarship, People, Species, Starships } from 'swapi-ts';

interface DataContextValue {
  people: IPeople[];
  films: IFilm[];
  species: ISpecie[];
  starships: IStarship[];
  filteredPeople: IPeople[];
  selectedPerson: IPeople | null;
  favoritePeople: IPeople[];
  onFilter(people: IPeople[]): void;
  onToggleFavorite(person: IPeople): void;
  onToggleSelectedPerson(person: IPeople | null): void;
}

const dataContext = createContext<DataContextValue>({
  films: [],
  people: [],
  species: [],
  starships: [],
  filteredPeople: [],
  favoritePeople: [],
  selectedPerson: null,
  onFilter: () => {},
  onToggleFavorite: () => {},
  onToggleSelectedPerson: () => {},
});

export const DataContextProvider: React.FC = ({ children }) => {
  const [people, setPeople] = useState<IPeople[]>([]);
  const [films, setFilms] = useState<IFilm[]>([]);
  const [species, setSpecie] = useState<ISpecie[]>([]);
  const [starships, setStarships] = useState<IStarship[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<IPeople | null>(null);
  const [filteredPeople, setFilteredPeople] = useState<IPeople[]>([]);

  const [favoritePeopleNames, setFavoritePeopleNames] = useState<string[]>(() => {
    const maybeData = localStorage.getItem('favorites');

    if (maybeData) {
      return JSON.parse(maybeData) as string[];
    }

    return [];
  });

  useEffect(() => {
    People.find().then((x) => setPeople(x.resources.map((r) => r.value)));
    Species.find().then((x) => setSpecie(x.resources.map((r) => r.value)));
    Films.find().then((x) => setFilms(x.resources.map((r) => r.value)));
    Starships.find().then((x) => setStarships(x.resources.map((r) => r.value)));
  }, []);

  const handleToggleFavorite = (person: IPeople) => {
    setFavoritePeopleNames((prev) => {
      let newState = prev;

      if (prev.includes(person.name)) {
        newState = prev.filter((x) => x !== person.name);
      } else {
        newState = [...prev, person.name];
      }
      localStorage.setItem('favorites', JSON.stringify(newState));

      return newState;
    });
  };

  const handleToggleSelectedPerson = (person: IPeople | null) => {
    setSelectedPerson(person);
  };

  const favoritePeople = people.filter((x) => favoritePeopleNames.includes(x.name));

  return (
    <dataContext.Provider
      value={{
        films,
        people,
        starships,
        species,
        filteredPeople,
        onFilter: setFilteredPeople,
        favoritePeople,
        selectedPerson,
        onToggleFavorite: handleToggleFavorite,
        onToggleSelectedPerson: handleToggleSelectedPerson,
      }}
    >
      {children}
    </dataContext.Provider>
  );
};

export const useDataContext = () => useContext(dataContext);
