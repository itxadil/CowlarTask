import { render, screen } from '@testing-library/react';
import App from './App';
import Todo from './pages/home/home';
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/app component rendering/i);
  expect(linkElement).toBeInTheDocument();
});

test("Todo element renders", () => {
  render(<Todo/>);

  const element = screen.getByText(/Todo component rendering/i);

  expect(element).toBeInTheDocument();
})
