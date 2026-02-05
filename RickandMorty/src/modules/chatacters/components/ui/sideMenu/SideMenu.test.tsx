import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SideMenu } from './SideMenu';
import { useFavoritesCharacterStore } from '../../../../../shared/presentation/store';

// Mock the API calls
vi.mock('../../../api/get-all-characters', () => ({
  getAllCharacters: vi.fn(() => Promise.resolve([
    {
      id: '1',
      name: 'Rick Sanchez',
      species: 'Human',
      img: 'https://example.com/rick.png',
      status: 'Alive',
      origin: 'Earth',
    },
    {
      id: '2',
      name: 'Morty Smith',
      species: 'Human',
      img: 'https://example.com/morty.png',
      status: 'Alive',
      origin: 'Earth',
    },
  ])),
}));

vi.mock('../../../../origin/api/get-all-origin', () => ({
  getAllOrigin: vi.fn(() => Promise.resolve([
    { id: '1', name: 'Earth' },
    { id: '2', name: 'Mars' },
  ])),
}));

vi.mock('../../../../gender/api/get-all-gender', () => ({
  getAllGender: vi.fn(() => Promise.resolve([
    { id: '1', name: 'Human' },
    { id: '2', name: 'Alien' },
  ])),
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe('SideMenu', () => {
  beforeEach(() => {
    queryClient.clear();
    useFavoritesCharacterStore.setState({
      favorites: [],
      countFavorites: 0,
    });
  });

  it('should render loading state initially', () => {
    renderWithProviders(<SideMenu />);
    expect(screen.getByText('Loading characters')).toBeInTheDocument();
  });

  it('should render the title "Rick and Morty list"', async () => {
    renderWithProviders(<SideMenu />);

    const title = await screen.findByText('Rick and Morty list');
    expect(title).toBeInTheDocument();
  });

  it('should render STARRED CHARACTERS section', async () => {
    renderWithProviders(<SideMenu />);

    const starredSection = await screen.findByText(/STARRED CHARACTERS/);
    expect(starredSection).toBeInTheDocument();
  });

  it('should render CHARCTERS section', async () => {
    renderWithProviders(<SideMenu />);

    const charactersSection = await screen.findByText(/CHARCTERS/);
    expect(charactersSection).toBeInTheDocument();
  });

  it('should render character names after loading', async () => {
    renderWithProviders(<SideMenu />);

    const rick = await screen.findByText('Rick Sanchez');
    const morty = await screen.findByText('Morty Smith');

    expect(rick).toBeInTheDocument();
    expect(morty).toBeInTheDocument();
  });

  it('should show favorites count as 0 initially', async () => {
    renderWithProviders(<SideMenu />);

    const starredSection = await screen.findByText('STARRED CHARACTERS (0)');
    expect(starredSection).toBeInTheDocument();
  });

  it('should update favorites count when store changes', async () => {
    useFavoritesCharacterStore.setState({
      favorites: [{
        id: '1',
        name: 'Rick Sanchez',
        species: 'Human',
        img: 'https://example.com/rick.png',
        status: 'Alive',
        origin: 'Earth',
      }],
      countFavorites: 1,
    });

    renderWithProviders(<SideMenu />);

    const starredSection = await screen.findByText('STARRED CHARACTERS (1)');
    expect(starredSection).toBeInTheDocument();
  });
});
