import { useParams } from 'react-router-dom';
import NewYearApp from '../components/page'; // Your greeting app component
import Firework from '../components/fireworks'; // The fireworks component

function App() {
  const { wisher } = useParams();  // Extract from URL

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* Fireworks in the background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.85,
        zIndex: 0
      }}>
        <Firework />
      </div>

      {/* New Year Greeting App */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        opacity: 0.9,
        alignItems: 'center',
        color: 'white',
        zIndex: 1
      }}>
        <NewYearApp wisher={wisher || "Your Name"} />
      </div>
    </div>
  );
}

export default App;
