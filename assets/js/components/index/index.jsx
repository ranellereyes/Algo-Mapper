import React from 'react';

const MESSAGES = {
  first: 'EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.',
  second: 'I LOVE FOOD',
  third: 'PLEASE GET THIS AWAY FROM ME PLEASE GET THIS AWAY FROM ME PLEASE GET THIS AWAY FROM ME PLEASE GET THIS AWAY FROM ME PLEASE GET THIS AWAY FROM ME PLEASE GET THIS AWAY FROM ME PLEASE GET THIS AWAY FROM ME ',
  fourth: 'howdy there, nice to meet you'
}

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      algo: 'first',
      active: '',
      message: MESSAGES['first']
    }
    this.selectAlgo = this.selectAlgo.bind(this);
  }

  selectAlgo(id) {
    this.setState({ algo: id, active: 'into-the-abyss'});
    setTimeout(() => this.setState({
      active: '',
      message: MESSAGES[id]
    }), 200);
  }

  render() {
    return (
      <div className="index-main">
        <main className="index-main">
          <img src='http://i1096.photobucket.com/albums/g327/winber1/header2.png'></img>
          <div className="index-content">
            <h1>AlgoMapper</h1>
            <span>Visualize and compare shortest-path algorithms with ease</span>
          </div>
        </main>
        <section className="index-algo-display">
          <ul className="index-algo-list">
            <div tabIndex="1" onFocus={() => this.selectAlgo('first')} className="index-algo-image"> Visualiaztion Algorithms area</div>
            <div tabIndex="1" onFocus={() => this.selectAlgo('second')} className="index-algo-image" />
            <div tabIndex="1" onFocus={() => this.selectAlgo('third')} className="index-algo-image" />
            <div tabIndex="1" onFocus={() => this.selectAlgo('fourth')} className="index-algo-image" />
          </ul>
          <div className={`index-arrow-up ${this.state.algo}`}>
            <div className="index-arrow-fill" />
          </div>
          <div className="index-algo-description">
            <h3 ref="description" className={this.state.active}>
              {this.state.message}
            </h3>
          </div>
        </section>
        <footer>
          <ul className="author-info">
            <li>
              <figure className="github"></figure>
              <span>Ranelle</span>
            </li>
            <li>
              <figure className="github"></figure>
              <span>Winber</span>
            </li>
            <li>
              <figure className="github"></figure>
              <span>Janice</span>
            </li>
            <li>
              <figure className="github"></figure>
              <span>Brandon</span>
            </li>
          </ul>
        </footer>
      </div>
    )
  }
}

export default Index;
