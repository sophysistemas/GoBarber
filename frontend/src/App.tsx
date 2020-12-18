import React from 'react';

import SignIn from './pages/Signin';
//import SignUp from './pages/Signup';
import GlobalStyle from './styles/global';
import AuthContext from './context/AuthContext';

const App: React.FC = () => (
  <>
    <AuthContext.Provider value = {{ name: 'Wellington' }}>
      <SignIn />
    </AuthContext.Provider>
    <GlobalStyle />
  </>
);

export default App;
