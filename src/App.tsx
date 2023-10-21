import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

/**
 * State declaration for <App />
 */
interface IState {
  data: ServerRespond[],
  showGraph: boolean, //shows graph
}

/**
 * The parent element of the react app.
 * It renders title, button and Graph react element.
 */
class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      // data saves the server responds.
      // We use this state to parse data down to the child element (Graph) as element property
      data: [],
      showGraph: false, //graph hidden until user clicks 'start streaming data'
    };
  }

  /**
   * Render Graph react component with state.data parse as property data
   */
  renderGraph() {
  if (this.state.showGraph){
    return (<Graph data={this.state.data}/>) //ensure graph doesnt render until 'start streaming data' button clicked
    }
  }

  /**
   * Get new data from server and update the state with the new data
   */
  getDataFromServer() {
  let x = 0; // Initialize a variable 'x' to 0 to count the number of iterations.

    // Set up a repeating interval (every 100 milliseconds) for fetching data.
  const interval = setInterval(() =>{
   // Call a function named 'DataStreamer.getData()' to fetch data from the server.
      DataStreamer.getData((serverResponds: ServerRespond[]) => {
      // Inside the callback function:
      // Update the state of the component using 'this.setState()'.
      this.setState({
        data: serverResponds, // Set the 'data' state with the fetched data.
        showGraph: true, // Set the 'showGraph' state to 'true'
        });
    });

     // Increment the 'x' variable, counting the number of iterations
    x++;
    if(x > 1000){
        clearInterval(interval);  // If 'x' becomes greater than 1000, clear the repeating interval.
    }
  }, 100); // The interval will repeat every 100 milliseconds.

  }

  /**
   * Render the App react component
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button"
            // when button is click, our react app tries to request
            // new data from the server.
            // As part of your task, update the getDataFromServer() function
            // to keep requesting the data every 100ms until the app is closed
            // or the server does not return anymore data.
            onClick={() => {this.getDataFromServer()}}>
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
