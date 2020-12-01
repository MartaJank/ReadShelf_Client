import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div>
          <p>
            <b>Powered by Marta J.</b>
          </p>
        </div>
        <div className="footer-info">
          <p>
            <b>READ SHELF © 2020</b>
          </p>
          <p>
            Pictures by
            <a className="footer-link" href="https://www.freepik.es/home">
              Freepic
            </a>
          </p>
          <p>Design by Marta J.</p>
        </div>
      </div>
    );
  }
}

export default Footer;
