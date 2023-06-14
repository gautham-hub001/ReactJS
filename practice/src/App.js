function App() {
  const BUTTON_STYLE = {}
  const OTHER_STYLE = {}
  return (
    <div className="App">
      <div style={BUTTON_STYLE}>
      <button>Open Modal</button>
      </div>

      <div style={OTHER_STYLE}>Other content</div>
      
    </div>
  );
}

export default App;
