// CovidLineGraph.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import CovidLineGraph from '../compontents/linegraph';
import '@testing-library/jest-dom/extend-expect';  // for better assertions

// Mock useQuery from TanStack Query
jest.mock('@tanstack/react-query');

// Mock Data
const mockCovidData = {
  cases: {
    "2023-09-01": 1000,
    "2023-09-02": 1100,
    "2023-09-03": 1200,
  },
  recovered: {
    "2023-09-01": 800,
    "2023-09-02": 900,
    "2023-09-03": 1000,
  },
  deaths: {
    "2023-09-01": 100,
    "2023-09-02": 150,
    "2023-09-03": 200,
  }
};

// Test case 1: Ensure loading state renders correctly
test('renders loading state', () => {
  (useQuery as jest.Mock).mockReturnValue({
    isLoading: true,
  });

  render(<CovidLineGraph />);
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
});

// Test case 2: Ensure error state renders correctly
test('renders error state', () => {
  (useQuery as jest.Mock).mockReturnValue({
    isLoading: false,
    error: true,
  });

  render(<CovidLineGraph />);
  expect(screen.getByText(/Error loading data/i)).toBeInTheDocument();
});

// Test case 3: Ensure chart renders with correct data
test('renders chart with fetched data', async () => {
  (useQuery as jest.Mock).mockReturnValue({
    isLoading: false,
    error: null,
    data: mockCovidData,
  });

  render(<CovidLineGraph />);

  // Wait for the chart to be rendered
  await waitFor(() => {
    expect(screen.getByText(/COVID-19 Cases Fluctuations/i)).toBeInTheDocument();
  });

  // You can also assert on the chart data points here
  // Since we're rendering a chart, we can validate that the chart labels or data points exist
});
