import './styles/styles.css';
import Playlist from './component/Playlist';
import Button from './component/Button';
import Mini from './component/Mini';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Playlist />
        <Mini />
        <Button />
      </header>
    </div>
  );
}

export default App;
