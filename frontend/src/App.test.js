import { render, screen } from '@testing-library/react';
import App from './App';
import AddDeleteTableRows from './add-delete-table-rows/AddDeleteTableRows.js'
import S from './search-by-feature/search.js'
import Popup from './datatable/add_popup.js'


// 1 test suit; 3 test cases
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/GM FOX/i);
  expect(linkElement).toBeInTheDocument();
});

test('display players', () => {
  render(<AddDeleteTableRows />);
  const linkElement = screen.getByText(/PLAYER_NAME/i);
  expect(linkElement).toBeInTheDocument();
});

test('display search', () => {
  render(<S />);
  const linkElement = screen.getByText(/GM FOX/i);
  expect(linkElement).toBeInTheDocument();
});

