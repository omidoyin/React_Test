import AuthProvider from "./authContext";
import GlobalProvider from "./globalContext";
import { BrowserRouter as Router } from "react-router-dom";
import Main from "./main";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

function App() {
  return (
    <AuthProvider>
      <GlobalProvider>
        <Router>
          <DndProvider backend={HTML5Backend}>
            <Main />
          </DndProvider>
        </Router>
      </GlobalProvider>
    </AuthProvider>
  );
}

export default App;
