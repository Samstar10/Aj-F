import { Routes, Route, redirect, Navigate } from 'react-router-dom';
import SignUp from './Components/SignUp';
import SignIn from './Components/SignIn';
import IncidentReport from './Components/IncidentReport';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token")
  if(!token) {
    return <Navigate to="/signin" />
  }
  return children
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/incidentreport" element={<PrivateRoute><IncidentReport /></PrivateRoute>} />
      </Routes>
    </div>
  );
}

export default App;
