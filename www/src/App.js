import ToDo from "./components/ToDo";
import ThemeProvider from './theme';

function App() {
  return (
    <ThemeProvider>
      <ToDo />
    </ThemeProvider>
  );
}

export default App;
