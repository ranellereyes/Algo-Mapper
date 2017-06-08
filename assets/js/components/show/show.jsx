import React from 'react';
import Visualization from '../../d3/visualization';
import { NODELIST } from '../../node/node';

class Show extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  componentDidMount() {
    let visual = new Visualization(NODELIST);
    visual.draw();
    window.v = visual;
    this.setState({ graph: visual });
  }

  render() {
    return (
      <div className="index-main">
        <main className="show-main">
          <section className="show-main">
            <h1 className="show-name">A* Algorithm</h1>
            <ul className="visualization">
              <div className="visualization" />
              <aside className="show-code">
                <h3>// Code area //
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </h3>
              </aside>
            </ul>
          </section>
        </main>
        <section className="show-algo-bottom">
          <div>
            <h1>Description</h1>
            <ul className="show-algo-description">
              <div className="show-how-it-works">
                <h3>How it Works</h3>
                <p>asdfaf  EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.
                </p>
                <h3>Math</h3>
                <p>asdfasdf  EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.
                </p>
              </div>
              <aside className="show-pros-n-cons">
                <h3>Pros & Cons</h3>
                <p>asdfas
                </p>
              </aside>
            </ul>
          </div>
        </section>
      </div>
    );
  }
}

export default Show;
