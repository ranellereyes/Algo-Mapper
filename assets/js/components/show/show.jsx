import React from 'react';

class Show extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="index">
        <main className="index">
          <ul>
            <div className="visualization" />
            <aside className="code" />
          </ul>
          <section className="algo-bottom">
            <h1>Description</h1>
            <ul className="algo-description">
              <div className="how-it-works">
                <h3>How it Works</h3>
                <p>asdfaf</p>
                <h3>Math</h3>
                <p>asdfasdf</p>
              </div>
              <aside className="pros-n-cons">
                <h3>Pros & Cons</h3>
                <p>asdf</p>
              </aside>
            </ul>
          </section>
        </main>
      </div>
    )
  }
}

export default Show;
