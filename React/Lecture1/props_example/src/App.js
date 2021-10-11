import logo from "./logo.svg";
import "./App.css";
import PropsExample from "./PropsExample";

function App() {
  const greeting = "Hello Function Component";
  const handle_func = () => {
    console.log("Hello from within handle_func in App.js");
  };
  return (
    <div className="App">
      <PropsExample
        greeting={greeting}
        user={{ name: "Prashant Mall", username: "iizakill" }}
        handleClick={handle_func}
      ></PropsExample>
    </div>
  );
}

export default App;
