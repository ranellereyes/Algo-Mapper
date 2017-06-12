import React from 'react';

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer>
        <ul className="author-info">
          <li>
            <a href="https://github.com/bbchui">
              <figure className="github"></figure>
            </a>
            <a href="https://www.linkedin.com/in/brandon-chui">
              <figure className="linkedin"></figure>
            </a>
            <span>Brandon Chui</span>
          </li>
          <li>
            <a href="https://github.com/JaniceYR">
              <figure className="github"></figure>
            </a>
            <a href="https://www.linkedin.com/in/janiceyuralee/">
              <figure className="linkedin"></figure>
            </a>
            <span>Janice Yura Lee</span>
          </li>
          <li>
            <a href="https://github.com/ranellereyes/">
              <figure className="github"></figure>
            </a>
            <a href="https://www.linkedin.com/in/ranellereyes">
              <figure className="linkedin"></figure>
            </a>
            <span>Ranelle Reyes</span>
          </li>
          <li>
            <a href="https://github.com/winber2">
              <figure className="github"></figure>
            </a>
            <a href="https://www.linkedin.com/in/winber/">
              <figure className="linkedin"></figure>
            </a>
            <span>Winber Xu</span>
          </li>
        </ul>
      </footer>
    )
  }
}

export default Footer;
