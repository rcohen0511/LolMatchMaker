import React from 'react';
import ReactDom from 'react-dom';
import ContentWrapper from '../Layout/ContentWrapper';
import { OverlayTrigger, Tooltip, Popover, Table, FormControl, Button, FormGroup, Panel, Grid, Row, Col, Dropdown, MenuItem } from 'react-bootstrap';
import { champList } from './Data';
import { browserHistory } from 'react-router';

class FirstPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "champPlayed": "",
      "champPlayedOpp": "",
    }
  }

  render(){
    var champKeys = Object.keys(champList)

    return(

      <ContentWrapper>

        <datalist id="champions">

          {champKeys.map((key)=>{
            return(
              <option key = {champList[key]} value={champList[key]}/>
            )
          })}
        </datalist>


        <div className="content-heading">
          League of Legends Matchmaker
            <small data-localize="dashboard.WELCOME">Learn about league match ups and builds</small>
        </div>
        <div className="form-group mb-xl">
          Champion you are playing:
            <input type="form-control searchbar" placeholder="Search for a Champion by Name" className="form-control mb"
            list="champions"
            value={this.state.champPlayed} onChange={(e)=> {
              this.setState({ champPlayed: e.target.value})
              // console.log(this.state.c)
            }}/>

        </div>
        <div className="text-center pv-xl">Vs.</div>
        <h1></h1>
        <div className="form-group mb-xl">
          Champion you are playing against:
            <input type="text" placeholder="Search for a Champion by Name" className="form-control mb"
              list="champions"
              value={this.state.champPlayedOpp} onChange={(e)=> {
                this.setState({ champPlayedOpp: e.target.value})
                // console.log(this.state.c)
              }}/>
            <div className="clearfix">
                <button type="button" className="pull-left btn btn-default" onClick={(e) => {
                  e.preventDefault();
                  console.log(this.state.champPlayed)
                  console.log(this.state.champPlayedOpp)
                  console.log('/lol/details/{0}/{1}'.format(this.state.champPlayed, this.state.champPlayedOpp))
                      // if isValid()
                      // {
                      //
                      // }
                  browserHistory.push('/lol/details/{0}/{1}'.format(this.state.champPlayed, this.state.champPlayedOpp))
                }}>Search Matchmaker</button>
            </div>
        </div>
        <div>
          League of Legends Matchmaker is a tool for League of Legends players to
          easily access different build paths based on their opponent to improve their
          chance of success and gaming experience.
        </div>
      </ContentWrapper>
    )
  }
}

export default FirstPage;
