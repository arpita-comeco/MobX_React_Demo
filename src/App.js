import { PetOwnerStore } from './PetOwnerStore'; 
import PetList from './components/PetList';

function App() {
  const store = new PetOwnerStore();
  return (
    <div className="App">
      <p>App</p>
      <PetList store={store} />
    </div>
  );
}

export default App;
