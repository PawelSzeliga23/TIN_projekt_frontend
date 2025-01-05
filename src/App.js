import AppRouter from "./Components/AppRouter/AppRouter";
import {BrowserRouter as Router} from "react-router-dom";

function App() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return (
        <Router>
            <div className="App">
                <AppRouter/>
            </div>
        </Router>
    );
}

export default App;
