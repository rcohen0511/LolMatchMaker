import React from 'react';
import ReactDom from 'react-dom';
import ContentWrapper from '../Layout/ContentWrapper';
import { OverlayTrigger, Tooltip, Popover, Table, FormControl, Button, FormGroup, Panel, Grid, Row, Col, Dropdown, MenuItem } from 'react-bootstrap';
import { testData } from './Data';
import { masteryList } from './Data';
import { itemList } from './Data';
import { champList } from './Data';
import { championFull } from './Data';
import { match_data } from './Data';
import { fullMatchData } from './Data';
import { sqlDataVeigar } from './Data';
import { sqlDataSyndra } from './Data';
import { buildOrders } from './Data';
import axios from 'axios';
import FirstPage from './FirstPage';

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plaintext: "",
      name: "",
      description: ""
    }
  }

  componentDidMount() {
    this.setState({
      name: itemList[this.props.itemId]['name'],
      description: itemList[this.props.itemId]['description'],
      plaintext: itemList[this.props.itemId]['plaintext']
    })
  }

  render() {
    return (
      <div className="col-sm-3">
        <OverlayTrigger trigger="hover" placement="right" overlay={
          <Popover id="pp4" title="Item Details">
            <div><strong>Name: </strong> {this.state.name}</div>
            <div><strong>Description: </strong> {this.state.description}</div>
            <div><strong>Plain Text: </strong> {this.state.plaintext}</div>
          </Popover> }>
            <div>
              <img width="50px" height="50px" src={"../leagueFiles/7.16.1/img/item/" + this.props.itemId + ".png"}/>
              <h6>{this.state.name}</h6>
            </div>
        </OverlayTrigger>
      </div>
    )
  }
}

class SkillItem extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      tooltip: "",
      name: "",
      description: "",
      id: "",
      championPlayed: ""
    }
  }

  componentDidMount() {
    this.setState({
      name: championFull["data"][this.props.champPlayed]['spells'][this.props.spellId]['name'],
      description: championFull["data"][this.props.champPlayed]['spells'][this.props.spellId]['description'],
      tooltip: championFull["data"][this.props.champPlayed]['spells'][this.props.spellId]['tooltip'],
      id: championFull["data"][this.props.champPlayed]['spells'][this.props.spellId]['id']
    })
  }

  render() {
    return (
      <td>
        <OverlayTrigger trigger="hover" placement="right" overlay={
          <Popover id="pp4" title="Item Details">
            <div><strong>Name: </strong> {this.state.name}</div>
            <div><strong>Description: </strong> {this.state.description}</div>
            <div><strong>Tooltip: </strong> {this.state.tooltip}</div>
          </Popover> }>
            <div>
              <img width="30%" height="30%" src={"../leagueFiles/7.16.1/img/spell/" + this.state.id + ".png"}/>
            </div>

        </OverlayTrigger>
      </td>
    )
  }
}

class SkillTrue extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      true: ""
    }
  }

  componentDidMount() {
    this.setState({
      true: this.props.true
  })
  }

  render() {
    return (
      <td>
        {this.state.true}
      </td>
    )
  }
}

class MasteryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rank: 0,
      name: "",
      description: ""
    }
  }

  getRanks(masteryMap, masteryId){
    var rank = 0
    try {
      rank = masteryMap[masteryId]['rank']
    } catch (e) {
      rank = 0
    }
    return rank
  }

  getDescription(rank){
    var description = ''
    if(rank == 0){
      description = masteryList[this.props.masteryId]['description']
    } else {
      description = masteryList[this.props.masteryId]['description'][rank-1]
    }
    return(description)
  }

  componentDidMount() {
    var masteriesMap = JSON.parse(sqlDataVeigar['data'][7])
    var rank = 0
    var description = ""
    rank = this.getRanks(masteriesMap, this.props.masteryId)
    description = this.getDescription(rank)

    this.setState({
      name: masteryList[this.props.masteryId]['name'],
      description: description,
      rank: rank


    })
  }

  render() {
    var enableStyle = {};
    if( this.state.rank < 1 ) {
      enableStyle = {
        filter: "grayscale(100%)"
      }
    }
    // console.log(this.state)
    return (
      <div className="col-sm-4">
        <OverlayTrigger trigger="hover" placement="right" overlay={
          <Popover id="pp4" title="Mastery Details">
            <div><strong>Name: </strong> {this.state.name}</div>
            <div><strong>Description: </strong> {this.state.description}</div>
          </Popover> }>

            <div>
              <img style={enableStyle} src={"../leagueFiles/7.16.1/img/mastery/" + this.props.masteryId + ".png"}/>
              <div>Rank: {this.state.rank}</div>
            </div>

        </OverlayTrigger>
      </div>
    )
  }
}

class RuneItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      runeId: "",
      rank: ""
    }
  }

  componentDidMount() {
    this.setState({
      runeId: this.props.runeId,
      rank: this.props.rank
      })
  }

  render() {
    return (
      <div>
        {this.state.runeId}
      </div>
    )
  }
}

class DashboardV4 extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        "champPlayed": this.props.params.champPlayed || "Veigar",
        "champPlayedOpp": this.props.params.champPlayedOpp || "",
        "champPlayedData": {
          "items": {},
          "masteries": {},
          "runes": {},
          "skills": {},
        },
        "champPlayedOppData": {}
      }
    }

    componentDidMount() {
        // console.log(FirstPage.props)
        // DashboardRun(
        //     ReactDom.findDOMNode(this.refs.chartSpline)
        // );
        //  console.log(testData);
        // var masteryList = axios.get('http://127.0.0.1:5000/api/masteries')
        axios.get('http://localhost:5000/api/matches/{0}/{1}'.format(this.state.champPlayed, this.state.champPlayedOpp))
           .then((res) => {
                this.setState({
                  champPlayedData: res.data
                })
            }).catch((err)=> {

            })
    }

    componentWillMount() {
    }

    getProfileIcon(profileNum){
      var profileIconLoc = "../leagueFiles/7.16.1/img/profileicon/"
      var finalProfile = profileIconLoc+profileNum+".png"

      return(
        <td><img src= {finalProfile} width="40%" height="23%"/></td>
      )
    }

    getChampionName(championId, champList){
        var champName = champList[championId]
          return(champName)
    }

    getChampionIcon(championId){
      var championName = this.getChampionName(championId, champList)
      var championIconLoc = "../leagueFiles/7.16.1/img/champion/"
      var finalChamp = championIconLoc+championName+".png"

      return(
        <div><img src={finalChamp} width="16%" height="25%"/></div>
      );
    }

    createMatchDetailSection(){

      return(
        <Col lg={ 12 }>
            <Panel header="Match Details">
                <Table responsive striped bordered hover>
                    <thead>
                        <tr>
                            <th style={{width: "20px"}}>#</th>
                            <th style={{width: "100px"}}>Profile Icon</th>
                            <th style={{width: "150px"}}>Summoner Name</th>
                            <th style={{width: "150px"}}>Champion Name</th>
                            <th>Champion Icon</th>
                        </tr>
                    </thead>
                    <tbody>
                      {match_data['participant_details'].map((p) => {
                        // console.log(p);
                        return (
                          <tr key={p.championId}>
                              <td>1</td>
                              {this.getProfileIcon(p.profile_icon)}
                              <td>{p.summoner_name}</td>
                              <td>{this.getChampionName(p.championId, champList)}</td>
                              {this.getChampionIcon(p.championId)}
                          </tr>
                        )
                          })}
                    </tbody>
                </Table>
            </Panel>
          </Col>
        );
    }

    createRuneSection(){
      var runesUsed = this.state.champPlayedData.runes;
      var runeKey = Object.keys(runesUsed)

      console.log(runesUsed)

      // {runeKey.map((key)=>{
      //
      //   return(
      //   console.log(key +"=" + runesUsed[key])
      //   )
      // })}

      return(
        <Col lg={ 12 }>
            <Panel header="Runes Used">

                {runeKey.map((key)=>{

                  return(

                  <RuneItem runeId={key} rank={runesUsed[key]}/>

                  )
                })}

            </Panel>
          </Col>
      )
    }

    createItemSection(){

      // var itemsBuilt = this.state.champPlayedData;
      var itemsBuilt = this.state.champPlayedData.items;
      var itemKey = Object.keys(itemsBuilt)

      // {itemKey.map((key)=>{
      //
      //   return(
      //   console.log(key +"=" + itemsBuilt[key])
      //   )
      // })}
      // console.log(itemsBuilt.keys())
      return(
        <Col lg={ 12 }>
            <Panel header="Item Build">
              <div className="row">
                {itemKey.map((key)=>{

                  return(

                  <Item key={key} itemId={itemsBuilt[key]}/>

                  )
                })}
              </div>
            </Panel>
          </Col>
      )
    }

    createMasterySection(){
      var masteryList = this.state.champPlayedData.masteries
      var allMastery = Object.keys(masteryList)

      return(

        <Col lg={ 12 }>
            <Panel header="Mastery Details">
              <Col sm={4}>
                <h4>Ferocity</h4>
                <div className="row">
                  {/* change mastery data consumption to map for passing enabled / ranking */}
                  <MasteryItem masteryId="6111"/>
                  <MasteryItem masteryId="6114"/>
                </div>
                <div className="row">
                  <MasteryItem masteryId="6121" />
                  <MasteryItem masteryId="6122" />
                  <MasteryItem masteryId="6123" />
                </div>
                <div className="row">
                  <MasteryItem masteryId="6131" />
                  <MasteryItem masteryId="6134" />
                </div>
                <div className="row">
                  <MasteryItem masteryId="6141" />
                  <MasteryItem masteryId="6142" />
                  <MasteryItem masteryId="6143" />
                </div>
                <div className="row">
                  <MasteryItem masteryId="6151" />
                  <MasteryItem masteryId="6154" />
                </div>
                <div className="row">
                  <MasteryItem masteryId="6161" />
                  <MasteryItem masteryId="6162" />
                  <MasteryItem masteryId="6164" />
                </div>
              </Col>

              <Col sm={4}>
                <h4>Cunning</h4>
                <div className="row">
                  <MasteryItem masteryId="6311"/>
                  <MasteryItem masteryId="6312"/>
                </div>
                <div className="row">
                  <MasteryItem masteryId="6321" />
                  <MasteryItem masteryId="6322" />
                  <MasteryItem masteryId="6323" />
                </div>
                <div className="row">
                  <MasteryItem masteryId="6331" />
                  <MasteryItem masteryId="6332" />
                </div>
                <div className="row">
                  <MasteryItem masteryId="6341" />
                  <MasteryItem masteryId="6342" />
                  <MasteryItem masteryId="6343" />
                </div>
                <div className="row">
                  <MasteryItem masteryId="6351" />
                  <MasteryItem masteryId="6352" />
                </div>
                <div className="row">
                  <MasteryItem masteryId="6361" />
                  <MasteryItem masteryId="6362" />
                  <MasteryItem masteryId="6363" />
                </div>
              </Col>

              <Col sm={4}>
                <h4>Resolve</h4>
                <div className="row">
                  <MasteryItem masteryId="6211"/>
                  <MasteryItem masteryId="6212"/>
                </div>
                <div className="row">
                  <MasteryItem masteryId="6221" />
                  <MasteryItem masteryId="6223" />
                  <MasteryItem masteryId="6222" />
                </div>
                <div className="row">
                  <MasteryItem masteryId="6231" />
                  <MasteryItem masteryId="6232" />
                </div>
                <div className="row">
                  <MasteryItem masteryId="6241" />
                  <MasteryItem masteryId="6242" />
                  <MasteryItem masteryId="6243" />
                </div>
                <div className="row">
                  <MasteryItem masteryId="6251" />
                  <MasteryItem masteryId="6252" />
                </div>
                <div className="row">
                  <MasteryItem masteryId="6261" />
                  <MasteryItem masteryId="6262" />
                  <MasteryItem masteryId="6263" />
                </div>
              </Col>

            </Panel>
          </Col>
      )
    }

    createSkillQ(){
      var skillList = this.state.champPlayedData.skills
      var skills = Object.keys(skillList)

      return(
        <tr>
          <SkillItem spellId="0" champPlayed={this.state.champPlayed} />

          {skills.map((key)=>{
            if (skillList[key]==1){
              return(<SkillTrue true="X" />)
            } else {
              return(<SkillTrue true="" />)
            }
          })}

        </tr>
      )
    }

    createSkillW(){
      var skillList = this.state.champPlayedData.skills
      var skills = Object.keys(skillList)

      return(
        <tr>
          <SkillItem spellId="1" champPlayed={this.state.champPlayed} />

          {skills.map((key)=>{
            if (skillList[key]==2){
              return(<SkillTrue true="X" />)
            } else {
              return(<SkillTrue true="" />)
            }
          })}

        </tr>
      )
    }

    createSkillE(){
      var skillList = this.state.champPlayedData.skills
      var skills = Object.keys(skillList)

      return(
        <tr>
          <SkillItem spellId="2" champPlayed={this.state.champPlayed} />

          {skills.map((key)=>{
            if (skillList[key]==3){
              return(<SkillTrue true="X" />)
            } else {
              return(<SkillTrue true="" />)
            }
          })}

        </tr>
      )
    }

    createSkillR(){
      var skillList = this.state.champPlayedData.skills
      var skills = Object.keys(skillList)

      return(
        <tr>
          <SkillItem spellId="3" champPlayed={this.state.champPlayed} />

          {skills.map((key)=>{
            if (skillList[key]==4){
              return(<SkillTrue true="X" />)
            } else {
              return(<SkillTrue true="" />)
            }
          })}

        </tr>
      )
    }

    createSkillSection(){
      // console.log(this.state.champPlayed)
      // console.log(championFull["data"][this.state.championPlayed]['spells'])



      return(

        <Panel header="Spell Order">
            { /* START table-responsive */ }
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th></th>
                        <th>1</th>
                        <th>2</th>
                        <th>3</th>
                        <th>4</th>
                        <th>5</th>
                        <th>6</th>
                        <th>7</th>
                        <th>8</th>
                        <th>9</th>
                        <th>10</th>
                        <th>11</th>
                        <th>12</th>
                        <th>13</th>
                        <th>14</th>
                        <th>15</th>
                        <th>16</th>
                        <th>17</th>
                        <th>18</th>

                    </tr>
                </thead>
                <tbody>
                    {this.createSkillQ()}
                    {this.createSkillW()}
                    {this.createSkillE()}
                    {this.createSkillR()}

                </tbody>
            </Table>
            { /* END table-responsive */ }
        </Panel>
      )
    }


    render() {
      console.log("in render")
        return (

            <ContentWrapper>
                <div>{this.state.champPlayed}</div>
                  <div>{this.state.champPlayedOpp}</div>
              <div>{match_data['match_id']}</div>
              <div>{match_data['game_mode']}</div>
              <br/>


              {this.createRuneSection()}
              {this.createSkillSection()}
              {/* {this.createItemSection()} */}
              <ItemSection />

              {this.createMasterySection()}

              {/* {this.createMatchDetailSection()} */}
            </ContentWrapper>
            );

    }

}

class ItemGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "items": this.props.groupItems
    }
  }

  render() {
    return (<div>
      {this.state.items.map(i => {
        return (<div style={{ display: "inline", padding: "15px", height: "100px", width: "100px"}}>
          {i.name}
        </div>)
      })}
    </div>)
  }
}

class ItemSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "items": []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/items')
       .then((res) => {
            this.setState({
              items: res.data.events_of_events
            })
        }).catch((err)=> {

        })
  }

  render() {
    console.log(this.state.items);
    return (<div>

      {/* {this.state.items.map((i) => {
        return (<div><pre>{JSON.stringify(i)}</pre><div>></div></div>)
      })} */}

      {this.state.items.map((i) => {
        return (
          <div>
            <ItemGroup groupItems={i}/>
            <div>></div>
          </div>)
      })}

    </div>)
  }
}


export default DashboardV4;
