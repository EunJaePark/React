import logo from './logo.svg';
import './App.css';
// import data from './data.json';

function App() {
  // console.log({ data });
  function onClick() {
      // click할 때에 데이터를 동적으로 받아오도록 함.(페이지가 렌더링될때부터 데이터를 받아오는 것이 아닌!!)
      import('./data.json').then(({ defalut: data}) => {
      console.log({ data });
    });
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={onClick}>데이터 보여주세요</button>
        <p>hello ej!!!</p>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
