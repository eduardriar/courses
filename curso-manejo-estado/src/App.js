import { UseState } from './components/UseState';
import { ClassState } from './components/ClassState';
import './App.css';
import { UseReducer } from './reducer/UseReducer';

function App() {
  return (
    <div className="App">
      <UseState name={"UseState"}/>
      <UseReducer name={"UseReducer"}/>
      {/* <ClassState name={"ClassState"}/> */}
    </div>
  );
}

export default App;
