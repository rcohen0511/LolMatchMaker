import React from 'react';
import ReactDom from 'react-dom';
import ContentWrapper from '../Layout/ContentWrapper';
import { OverlayTrigger, Tooltip, Popover, Table, FormControl, Button, FormGroup, Panel, Grid, Row, Col, Dropdown, MenuItem } from 'react-bootstrap';
import { testData } from './Data';
import { masteryList } from './Data';
import { itemList } from './Data';
import { champList } from './Data';
import { match_data } from './Data';
import { fullMatchData } from './Data';
import { sqlDataVeigar } from './Data';
import { sqlDataSyndra } from './Data';
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
      <div className="col-sm-1">
        <OverlayTrigger trigger="hover" placement="right" overlay={
          <Popover id="pp4" title="Item Details">
            <div><strong>Name: </strong> {this.state.name}</div>
            <div><strong>Description: </strong> {this.state.description}</div>
            <div><strong>Plain Text: </strong> {this.state.plaintext}</div>
          </Popover> }>
            <div>
              <img width="135%" height="135%" src={"../leagueFiles/7.16.1/img/item/" + this.props.itemId + ".png"}/>
              <h6>{this.state.name}</h6>
            </div>

        </OverlayTrigger>
      </div>
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

class DashboardV4 extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        "champPlayed": this.props.params.champPlayed || "Veigar",
        "champPlayedOpp": this.props.params.champPlayedOpp || "",
        "champPlayedData": {
          "items": {},
          "masteries": {},
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
        var runesUsed = JSON.parse(this.state.champPlayedData.runes)
        runesUsed.map((rune)=>{
          return(
            console.log(String(rune['runeId'])+" is of rank "+String(rune['rank']))

          )
        })

        // var runesKey = Object.keys(runesUsed)
        // console.log("rune section")
        // console.log(runesUsed)
        return(
          <div>test</div>
              // {/* <Col lg={ 12 }>
              //     <Panel header="Runes Used">
              //  {runesKey.map((key)=>{
              //   return(
              //     console.log(key)
              //
              //   //  <Item itemId={itemsBuilt[key]}/>
              //       )
              // })}
              //   </Panel>
              // </Col> */}
        )
    }

    createItemSection(){

      // var itemsBuilt = this.state.champPlayedData;
      var itemsBuilt = this.state.champPlayedData.items;
      var itemKey = Object.keys(itemsBuilt)

      // console.log(itemsBuilt.keys.sort())
      return(
        <Col lg={ 12 }>
            <Panel header="Item Build">

                {itemKey.map((key)=>{

                  return(

                  <Item key={key} itemId={itemsBuilt[key]}/>
                  )
                })}

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

    render() {
      console.log("in render")
        return (

            <ContentWrapper>
                <div>{this.state.champPlayed}</div>
                  <div>{this.state.champPlayedOpp}</div>
              <div>{match_data['match_id']}</div>
              <div>{match_data['game_mode']}</div>
              <br/>
              {/* {this.createRuneSection()} */}
              {this.createItemSection()}
              {this.createMasterySection()}

              {/* {this.createMatchDetailSection()} */}
            </ContentWrapper>
            );

    }

}



export default DashboardV4;
