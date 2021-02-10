import getAPI from './api/index'

function App() {
  const getFoodConts = () => {
    getAPI.getCont();
  }
  getFoodConts();
  return (
    <div className="App">
      <span>food</span>
    </div>
  );
}

export default App;
