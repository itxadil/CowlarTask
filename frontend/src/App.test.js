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
test("adds a task", async () => {
  render(<Todo />);
  const input = screen.getByPlaceholderText("Add task");
  const addButton = screen.getByText("Add");

  fireEvent.change(input, { target: { value: "New Task" } });
  fireEvent.click(addButton);

  await waitFor(() => {
    expect(screen.getByText("New Task")).toBeInTheDocument();
  });
});

test("marks a task as completed", async () => {
  render(<Todo />);
  const taskCheckbox = screen.getByLabelText("New Task");

  fireEvent.click(taskCheckbox);

  await waitFor(() => {
    expect(taskCheckbox.checked).toBe(true);
  });
});

test("deletes a task", async () => {
  render(<Todo />);
  const deleteButton = screen.getByLabelText("Delete");

  fireEvent.click(deleteButton);

  await waitFor(() => {
    expect(screen.queryByText("New Task")).toBeNull();
  });
});
