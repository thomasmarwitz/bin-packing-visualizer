import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SceneSpinningPackage } from "./view/SpinningPackage/SpinningPackage";

function App() {
    const navigate = useNavigate();

    return (<>

            <Typography variant="h1" sx={{fontWeight: 700, textAlign: "center", margin: "3 rem"}}>Better Boxxing</Typography>
            
            <SceneSpinningPackage height={500}/>
            
            <div style={{display: "grid", placeItems: "center",}}>
                <Button variant="contained" onClick={() => navigate("/boxes-loading")}>
                    Start Scanning
                </Button>
                <br />
                <Button variant="contained" onClick={() => navigate("/examples")}>
                    Examples
                </Button>
            </div>
        </>
    )
}

export default App;
