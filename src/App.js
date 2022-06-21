import { Canvas } from '@react-three/fiber';
import { Box } from './Box'
import {Button, Card, Grid, Modal, Typography} from "@mui/material";

function App() {
  return (<>
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
    </Canvas>
    <Button 
        variant="contained" 
        onClick={() => {}}
    >
        Agree
    </Button>

  </>
  );
}

export default App;
