import React from 'react';
import app from '../app';
import service from '../service';
import Loader from '../components/LoadingFlag.jsx';
import MarkdownArea from '../components/MarkdownArea.jsx';
import Disqus from '../components/Disqus.jsx';

class Work extends React.Component {
  constructor(props) {
    super(props);
    let workid = props.params.workid;
    this.notFound = true;
    if( workid && app.works && app.works.length > 0 ) {
      for (let i = 0; i < app.works.length; i++) {
        let curWork = app.works[i];
        if(encodeURI(curWork.title) == workid){
          this.work = curWork;
          this.notFound = false;
          this.thread = workid;
          break;
        }
      }
    }
    if(this.work && this.work.file)
    {
      let self = this;
      service.fetchText(this.work.file)
      .then((value) => self.setState({detail:value}))
      .catch((err) => console.log("Load work detail failed",err));
    }
    this.state = {};
  }

  render() {
    if (!app.works) {
      return (
        <div className="ui raised stacked segment post-content">
          <Loader>{app.string.loadingPost}</Loader>
        </div>
      );
    }else if (this.notFound && !this.work) {
      return <div className="ui red message">{app.string.postNotFound}</div>;
    }
    else{
      let work = this.work;
      document.title = work.title;
      return (
        <div className="post-content">
          <div className="post-content well">
            <h1>{work.title}</h1>
            <div className="MarkdownArea">
              {this.renderInfo()}
            </div>
            {this.state.detail?(
              <div className="column center">
                <MarkdownArea>{this.state.detail}</MarkdownArea>
              </div>
            ): null}
          </div>
          <div className="well">
            <h2>作品评论</h2>
            <Disqus  thread={this.thread}/>
          </div>
        </div>
      );
    }
  }

  renderInfo() {
    let work = this.work;
    let platforms = null;
    if (work.platforms && work.platforms.length >0){
      platforms = (
        <p>
          {work.platforms.map((item) => <span className="ui blue label">{item}</span>)}
        </p>
      );
    }
    let categories = null;
    if (work.categories && work.categories.length >0){
      categories = (
        <p>
          {work.categories.map((item) => <span className="ui teal label">{item}</span>)}
        </p>
      );
    }
    let cooperators = null;
    if (work.cooperators && work.cooperators.length >0){
      cooperators = (
        <p>
          {work.cooperators.map((item) => <span className="ui pink label">{item}</span>)}
        </p>
      );
    }
    let frameworks = null;
    if (work.frameworks && work.frameworks.length >0){
      frameworks = (
        <p>
          {work.frameworks.map((item) => <span className="ui green label">{item}</span>)}
        </p>
      );
    }
    let status = work.status;
    let time   = work.time;
    return (
      <div className='work-info'>
        <div className="image">
          <img src={work.logo}/>
        </div>
        <div>
          <table className="ui table">
            <tbody>
              {platforms?(
                <tr>
                  <td>{app.string.platforms}</td>
                  <td>{platforms}</td>
                </tr>
              ):null}
              {categories?(
                <tr>
                  <td>{app.string.categories}</td>
                  <td>{categories}</td>
                </tr>
              ):null}
              {frameworks?(
                <tr>
                  <td>{app.string.frameworks}</td>
                  <td>{frameworks}</td>
                </tr>
              ):null}
              {cooperators?(
                <tr>
                  <td>{app.string.cooperators}</td>
                  <td>{cooperators}</td>
                </tr>
              ):null}
              {status?(
                <tr>
                  <td>{app.string.status}</td>
                  <td><span className="ui purple label">{status}</span></td>
                </tr>
              ): null}
              {time?(
                <tr>
                  <td>{app.string.workTime}</td>
                  <td><span className="ui olive label">{time}</span></td>
                </tr>
              ):null}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

module.exports = Work;
