import React from 'react';

class Index extends React.Component {
  constructor(props) {
    super(props);
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
            <div className="index-algo-image"> Visualiaztion Algorithms area</div>
            <div className="index-algo-image" />
            <div className="index-algo-image" />
            <div className="index-algo-image" />
          </ul>
          <div className="index-arrow-up" />
          <div className="index-algo-description">
            <h3>
              EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.EXTREMELY IMPORTANT DESCRIPTION.
            </h3>
          </div>
        </section>
      </div>
    )
  }
}

export default Index;
