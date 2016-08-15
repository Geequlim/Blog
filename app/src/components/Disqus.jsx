import React from 'react';
import $ from 'jquery';
import app from '../app';
import LoadingFlag from "./LoadingFlag.jsx"
class Disqus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    componentDidMount() {
        const self = this;
        const url = `http://${app.site.disqusShortName}.disqus.com/embed.js`;
        $.ajax({type: 'GET', url, dataType: 'script', cache: true}).done(() => self.setState({loading: false}));
    }
    render() {
        return (
            <div id="disqus_thread">
                {this.state.loading?<LoadingFlag>{app.string.disqus_loading}</LoadingFlag>:null}
            </div>
        );
    }
}

module.exports = Disqus;
