import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
// import './styles.css'
import Login from './components/Login';
import Registration from './components/Registration';
import ManufacturerForm from './components/ManufacturerForm';
import TransporterLanding from './components/TransporterLanding';
import ManufacturerLanding from './components/ManufacturerLanding';
import TransporterForm from './components/TransporterForm';
const NotFound = () => {
  return <h1>404 Not Found</h1>;
};
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/manufacturerForm/:username" element={<ManufacturerForm />} />
        <Route path="/transporterForm/:username" element={<TransporterForm />} />
        <Route path="/transporterlanding/:username" element={<TransporterLanding />} />
        <Route path="/manufacturerlanding/:username" element={<ManufacturerLanding />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;

