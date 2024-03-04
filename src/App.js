import { Routes, Route } from 'react-router-dom';
import SignUp from './Components/SignUp';
import SignIn from './Components/SignIn';
import IncidentReport from './Components/IncidentReport';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/incidentreport" element={<IncidentReport />} />
      </Routes>
    </div>
  );
}

export default App;
