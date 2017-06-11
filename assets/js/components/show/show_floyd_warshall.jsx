import React from 'react';
import Visualization from '../../d3/visualization';
import { NODELIST } from '../../algorithms/node';
import FloydWarshallSteps from '../../algorithms/floyd_warshall_steps';
import Highlight from 'react-highlight';

class ShowFloyd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClickLeft = this.handleClickLeft.bind(this);
    this.handleClickRight = this.handleClickRight.bind(this);
  }

  componentDidMount() {
    let visual = new Visualization(NODELIST, "div.visualization");
    visual.draw();
    window.v = visual;
    this.setState({ graph: visual });
    this.floyd = new FloydWarshallSteps(NODELIST, 1, 6, visual);
    window.f = this.floyd;
  }

  componentWillUnmount() {
    document.onkeydown = null;
    document.onkeyup = null;
  }

  handleKeyPress (e) {
    if (e.keyCode === 37){
      this.floyd.stepBackward();
      document.getElementById("arrow_left").style.backgroundImage = "url('/static/images/arrow_blue.png')";
    } else if (e.keyCode === 39){
      this.floyd.stepForward();
      document.getElementById("arrow_right").style.backgroundImage = "url('/static/images/arrow_blue.png')";
    }
  }
  handleKeyUp (e) {
    console.log("key up");
    document.getElementById("arrow_left").style.backgroundImage = "url('/static/images/arrow_gray.png')";
    document.getElementById("arrow_right").style.backgroundImage = "url('/static/images/arrow_gray.png')";
  }

  handleClickLeft(e) {
    // this.handleKeyPress({keyCode:  37});
    this.floyd.stepBackward();
  }

  handleClickRight(e) {
    // this.handleKeyPress({keyCode:  39});
    this.floyd.stepForward();
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
                <Highlight class="javascript-snippet">
{`class FloydWarshall {
  constructor (nodelist) {
    this.nodelist = nodelist;
    this.indices = Object.keys(nodelist);
    this.costs = Object.keys(nodelist).map(e => new Array);
    this.parents = Object.keys(nodelist).map(e => new Array);

    this.initCosts();
    this.initParents();
  }

  initCosts () {
    this.costs.forEach((row, i) => {
      this.costs.forEach((ele, j) => {
        if (i === j) {
          this.costs[i][j] = 0;
        } else {
          this.costs[i][j] = Infinity;
        }
      });
    });

    Object.keys(this.nodelist).forEach(nodeId => {
      this.nodelist[nodeId].children.forEach(child => {
        let nodeIdx = this.indices.indexOf(nodeId),
            childIdx = this.indices.indexOf(String(child.id));
        this.costs[nodeIdx][childIdx] = child.weight;
      });
    });
  }

  initParents () {
    Object.keys(this.nodelist).forEach(nodeId => {
      this.nodelist[nodeId].children.forEach(child => {
        let nodeIdx = this.indices.indexOf(nodeId),
            childIdx = this.indices.indexOf(String(child.id));

        this.parents[nodeIdx][childIdx] = nodeId;
      });
    });

    for (let i = 0; i < this.parents.length; i++) {
      for (let j = 0; j < this.parents.length; j++) {
        if (i === j) {
          this.parents[i][j] = null;
        } else if (!this.parents[i][j]) {
          this.parents[i][j] = undefined;
        }
      }
    }
  }

  pathDeconstructor(start, end, intermediate = null) {
    let path = [end],
        startIdx = this.indices.indexOf(start),
        endIdx = this.indices.indexOf(end),
        intIdx = this.indices.indexOf(intermediate);

    if (intIdx > -1) {
      while (intermediate !== path[0]) {
        let parent = this.parents[intIdx][this.indices.indexOf(path[0])];
        if (!parent) { break; }
        path.unshift(parent);
      }
    }

    while (start !== path[0]) {
      let parent = this.parents[startIdx][this.indices.indexOf(path[0])];
      if (!parent) {
        path.unshift(start);
        break;
      }
      path.unshift(parent);
    }

    return path;
  }

  search (start, end) {
    for (let k = 0; k < this.indices.length; k++) {
      for (let i = 0; i < this.indices.length; i++) {
        for (let j = 0; j < this.indices.length; j++) {
          if (this.costs[i][j] > this.costs[i][k] + this.costs[k][j]) {
            this.costs[i][j] = this.costs[i][k] + this.costs[k][j];
            this.parents[i][j] = this.parents[k][j];
          }
        }
      }
    }

    return this.pathDeconstructor(start, end);
  }
}
`}
                </Highlight>
              </aside>
              <figure onClick={this.handleClickLeft}></figure>
              <figure onClick={this.handleClickRight} ></figure>
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

export default ShowFloyd;
