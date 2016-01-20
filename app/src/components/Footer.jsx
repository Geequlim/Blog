import React from 'react';
import site from 'json!yaml!../../data/site.yaml';
import IconLink from './IconLink.jsx';

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="footer">
                  <h2>{site.title}</h2>
            </div>
        );
    }
}

export default Footer;
