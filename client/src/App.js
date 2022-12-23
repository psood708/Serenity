import {BrowserRouter,Navigate,Routes,Route} from 'react-router-dom';
import { HomePage } from 'scenes/homePage';
import { LoginPage } from 'scenes/loginPage';
import { ProfilePage } from 'scenes/profilePage';
import {useMemo} from "react";
import { useSelector } from 'react-redux'; 
import { CssBaseline, ThemeProvider } from '@mui/material';
import {createTheme} from "@mui/material/styles";
import { themeSettings } from 'theme';


// we have created the jsconfig.json to make it easier in imports as we see here in scenes
function App() {
  
  const mode = useSelector((state)=>state.mode);
  const theme = useMemo(()=> createTheme(themeSettings(mode)),[mode]);

  
  
  return (
  <div className='app'>
  
  <BrowserRouter>
  <ThemeProvider theme = {theme}>
    <CssBaseline />
    <Routes>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/home" element={<HomePage/>}/>
      <Route path="/profile/:userId" element={<ProfilePage/>}/>
    </Routes> 
    </ThemeProvider>
  </BrowserRouter>
  </div>
  );
}

export default App;
