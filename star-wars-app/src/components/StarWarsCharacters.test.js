import React from 'react';
import { render, fireEvent, wait, getByText } from '@testing-library/react';
import { getData as mockGetData } from '../api';
import StarWarsCharacters from './StarWarsCharacters';

jest.mock('../api');

const mockData = {
	previous: null,
	next: null,
	results: [
		{ name: '1', url: '1' },
		{ name: '2', url: '2' },
		{ name: '3', url: '3' }
	]
};

test('next and previous button render, fire on click', () => {
	const { getByText } = render(<StarWarsCharacters />);

	const nextButton = getByText(/next/i);
	const previousButton = getByText(/previous/i);
	fireEvent.click(nextButton);
	fireEvent.click(previousButton);
});

test('api works', async () => {
	mockGetData.mockResolvedValue(mockData);
	const { getByText } = render(<StarWarsCharacters />);

	await wait(() => getByText(/1/i)); //wait for it to happen
	getByText('1'); //getting the test

	expect(mockGetData).toHaveBeenCalledWith('https://swapi.co/api/people');
});
