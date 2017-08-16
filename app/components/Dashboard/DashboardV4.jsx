import React from 'react';
import ReactDom from 'react-dom';
import ContentWrapper from '../Layout/ContentWrapper';
import { Table, FormControl, Button, FormGroup, Panel, Grid, Row, Col, Dropdown, MenuItem } from 'react-bootstrap';
// import { Grid, Row, Col, Panel, Button, Table } from 'react-bootstrap';
import DashboardRun from './DashboardV4.run';

const masteryList = {
    "6143": {
        "description": [
            "Gain up to 3% increased damage over 3 seconds when in combat with enemy Champions"
        ],
        "id": 6143,
        "name": "Battle Trance"
    },
    "6142": {
        "description": [
            "Deal 3% additional damage, take 1.5% additional damage."
        ],
        "id": 6142,
        "name": "Double Edged Sword"
    },
    "6141": {
        "description": [
            "Deal 1% increased damage for each unique enemy champion you have killed"
        ],
        "id": 6141,
        "name": "Bounty Hunter"
    },
    "6121": {
        "description": [
            "Your first basic attack against a champion deals an additional 10 +1 per level damage (6 second cooldown)"
        ],
        "id": 6121,
        "name": "Fresh Blood"
    },
    "6123": {
        "description": [
            "Damaging enemy champions causes them to take 3% more damage from your allies"
        ],
        "id": 6123,
        "name": "Expose Weakness"
    },
    "6122": {
        "description": [
            "Killing a unit restores 20 Health (30 second cooldown)"
        ],
        "id": 6122,
        "name": "Feast"
    },
    "6161": {
        "description": [
            "Moving or attacking will charge an Energized attack. Energized attacks heal for 5-40% of your total Attack Damage (amplified by Critical Strikes) and grant 30% Movement Speed for 0.75 seconds."
        ],
        "id": 6161,
        "name": "Warlord's Bloodlust"
    },
    "6162": {
        "description": [
            "Hitting champions with basic attacks generates a Fervor stack (2 for melee attacks). Stacks of Fervor last 8 seconds (max 8 stacks)and increase your AD by 1-8 for each stack."
        ],
        "id": 6162,
        "name": "Fervor of Battle"
    },
    "6164": {
        "description": [
            "Your damaging abilities cause enemy champions to take magic damage over 4 seconds.<br><br>Damage: 8 + 45% Bonus Attack Damage and 25% Ability Power<br><br>Deathfire Touch's duration is reduced for:<br>     - Area of Effect: 2 second duration. <br>     - Damage over Time: 1 second duration."
        ],
        "id": 6164,
        "name": "Deathfire Touch"
    },
    "6341": {
        "description": [
            "Stepping into brush causes your next damaging attack or ability to deal 3% of your target's current health as bonus magic damage (9s Cooldown)"
        ],
        "id": 6341,
        "name": "Greenfather's Gift"
    },
    "6343": {
        "description": [
            "Champion kills and assists restore 5% of your missing Health and Mana"
        ],
        "id": 6343,
        "name": "Dangerous Game"
    },
    "6342": {
        "description": [
            "Gain 1 gold for each nearby minion killed by an ally. <br><br>Gain 3 gold (10 if melee) when hitting an enemy champion with a basic attack (5 second cooldown)"
        ],
        "id": 6342,
        "name": "Bandit"
    },
    "6262": {
        "description": [
            "Gain a shield for 3-54 (+5%  of your maximum health) for each nearby enemy champion for 3 seconds after hitting an enemy champion with a stun, taunt, snare, or knock up (45-30 second cooldown, based on level)."
        ],
        "id": 6262,
        "name": "Courage of the Colossus"
    },
    "6263": {
        "description": [
            "Gain 5% total health.<br>Your movement impairing effects brand enemy champions with an earthen rune for 4 seconds. Other allied champions who attack branded enemies heal for 5 + 2.5% of your maximum health over 2 seconds (halved if you are ranged)."
        ],
        "id": 6263,
        "name": "Stoneborn Pact"
    },
    "6261": {
        "description": [
            "Every 4 seconds in combat, your next attack against an enemy champion deals damage equal to 3% of your max Health and heals you for 1.5% of your max Health (halved for ranged champions, deals magic damage)"
        ],
        "id": 6261,
        "name": "Grasp of the Undying"
    },
    "6222": {
        "description": [
            "Gain 8 Armor and Magic Resistance when near an allied tower"
        ],
        "id": 6222,
        "name": "Siegemaster"
    },
    "6223": {
        "description": [
            "You take 2 less damage from champion and neutral monster basic attacks"
        ],
        "id": 6223,
        "name": "Tough Skin"
    },
    "6221": {
        "description": [
            "+15 Movement Speed in Brush and River"
        ],
        "id": 6221,
        "name": "Explorer"
    },
    "6323": {
        "description": [
            "Deal 2% increased damage to champions when no allied champions are nearby"
        ],
        "id": 6323,
        "name": "Assassin"
    },
    "6322": {
        "description": [
            "Your Potions and Elixirs last 10% longer.<br><br>Your Health Potions are replaced with Biscuits that restore 15 Health and Mana instantly on use"
        ],
        "id": 6322,
        "name": "Secret Stash"
    },
    "6321": {
        "description": [
            "Buffs from neutral monsters last 15% longer"
        ],
        "id": 6321,
        "name": "Runic Affinity"
    },
    "6363": {
        "description": [
            "Your heals and shields are 10% stronger. Additionally, your shields and heals on other allies increase their armor by 5-22 (based on level) and their magic resistance by half that amount for 3 seconds."
        ],
        "id": 6363,
        "name": "Windspeaker's Blessing"
    },
    "6362": {
        "description": [
            "Your 3rd attack or damaging spell against the same enemy champion calls down a lightning strike, dealing magic damage in the area. <br><br>Damage: 10 per level, plus 30% of your Bonus Attack Damage, and 10% of your Ability Power (25-15 second cooldown, based on level)."
        ],
        "id": 6362,
        "name": "Thunderlord's Decree"
    },
    "6361": {
        "description": [
            "Dealing 30% of a champion's max Health within 2.5 seconds grants you 40% Movement Speed and 75% Slow Resistance for 3 seconds (10 second cooldown)."
        ],
        "id": 6361,
        "name": "Stormraider's Surge"
    },
    "6243": {
        "description": [
            "Gain 10% +1.5 per level bonus Armor and Magic Resist when damaged by an enemy champion for 2 seconds (9s Cooldown)"
        ],
        "id": 6243,
        "name": "Fearless"
    },
    "6212": {
        "description": [
            "+1% Bonus Armor and Magic Resist",
            "+2% Bonus Armor and Magic Resist",
            "+3% Bonus Armor and Magic Resist",
            "+4% Bonus Armor and Magic Resist",
            "+5% Bonus Armor and Magic Resist"
        ],
        "id": 6212,
        "name": "Unyielding"
    },
    "6332": {
        "description": [
            "Regenerate 0.25% of your missing Mana every 5 seconds",
            "Regenerate 0.5% of your missing Mana every 5 seconds",
            "Regenerate 0.75% of your missing Mana every 5 seconds",
            "Regenerate 1.0% of your missing Mana every 5 seconds",
            "Regenerate 1.25% of your missing Mana every 5 seconds"
        ],
        "id": 6332,
        "name": "Meditation"
    },
    "6151": {
        "description": [
            "+1.4% Armor Penetration",
            "+2.8% Armor Penetration",
            "+4.2% Armor Penetration",
            "+5.6% Armor Penetration",
            "+7% Armor Penetration"
        ],
        "id": 6151,
        "name": "Battering Blows"
    },
    "6154": {
        "description": [
            "+1.4% Magic Penetration",
            "+2.8% Magic Penetration",
            "+4.2% Magic Penetration",
            "+5.6% Magic Penetration",
            "+7% Magic Penetration"
        ],
        "id": 6154,
        "name": "Piercing Thoughts"
    },
    "6241": {
        "description": [
            "Reduces the cooldown of Summoner Spells by 15%"
        ],
        "id": 6241,
        "name": "Insight"
    },
    "6242": {
        "description": [
            "+50% Base Health Regen, increased to +200% when below 25% Health"
        ],
        "id": 6242,
        "name": "Perseverance"
    },
    "6352": {
        "description": [
            "Your Cooldown Reduction cap is increased to 41% and you gain 1% Cooldown Reduction",
            "Your Cooldown Reduction cap is increased to 42% and you gain 2% Cooldown Reduction",
            "Your Cooldown Reduction cap is increased to 43% and you gain 3% Cooldown Reduction",
            "Your Cooldown Reduction cap is increased to 44% and you gain 4% Cooldown Reduction",
            "Your Cooldown Reduction cap is increased to 45% and you gain 5% Cooldown Reduction"
        ],
        "id": 6352,
        "name": "Intelligence"
    },
    "6351": {
        "description": [
            "Gain 1.2 Lethality and 0.3 + 0.05 per level Magic Penetration",
            "Gain 2.4 Lethality and 0.6 + 0.10 per level Magic Penetration",
            "Gain 3.6 Lethality and 0.9 + 0.15 per level Magic Penetration",
            "Gain 4.8 Lethality and 1.2 + 0.20 per level Magic Penetration",
            "Gain 6 Lethality and 1.5 + 0.25 per level Magic Penetration"
        ],
        "id": 6351,
        "name": "Precision"
    },
    "6114": {
        "description": [
            "+0.4% increased Ability damage",
            "+0.8% increased Ability damage",
            "+1.2% increased Ability damage",
            "+1.6% increased Ability damage",
            "+2.0% increased Ability damage"
        ],
        "id": 6114,
        "name": "Sorcery"
    },
    "6131": {
        "description": [
            "+0.4% Lifesteal and Spell Vamp",
            "+0.8% Lifesteal and Spell Vamp",
            "+1.2% Lifesteal and Spell Vamp",
            "+1.6% Lifesteal and Spell Vamp",
            "+2.0% Lifesteal and Spell Vamp"
        ],
        "id": 6131,
        "name": "Vampirism"
    },
    "6111": {
        "description": [
            "+0.8% Attack Speed",
            "+1.6% Attack Speed",
            "+2.4% Attack Speed",
            "+3.2% Attack Speed",
            "+4% Attack Speed"
        ],
        "id": 6111,
        "name": "Fury"
    },
    "6134": {
        "description": [
            "Gain 0.4 + 0.09 per level Attack Damage, and 0.6 + 0.13 per level Ability Power (+2 Attack Damage and 3 Ability Power at level 18)",
            "Gain 0.8 + 0.18 per level Attack Damage, and 1.2 + 0.27 per level Ability Power (+4 Attack Damage and 6 Ability Power at level 18)",
            "Gain 1.2 + 0.27 per level Attack Damage, and 1.8 + 0.4 per level Ability Power (+6 Attack Damage and 9 Ability Power at level 18)",
            "Gain 1.6 + 0.36 per level Attack Damage, and 2.4 + 0.53 per level Ability Power (+8 Attack Damage and 12 Ability Power at level 18)",
            "Gain 2 + 0.44 per level Attack Damage, and 3 + 0.67 per level Ability Power (+10 Attack Damage and 15 Ability Power at level 18)"
        ],
        "id": 6134,
        "name": "Natural Talent"
    },
    "6312": {
        "description": [
            "Single target attacks and spells deal 1 bonus damage to minions and monsters",
            "Single target attacks and spells deal 2 bonus damage to minions and monsters",
            "Single target attacks and spells deal 3 bonus damage to minions and monsters",
            "Single target attacks and spells deal 4 bonus damage to minions and monsters",
            "Single target attacks and spells deal 5 bonus damage to minions and monsters"
        ],
        "id": 6312,
        "name": "Savagery"
    },
    "6311": {
        "description": [
            "+0.6% Movement Speed out of combat",
            "+1.2% Movement Speed out of combat",
            "+1.8% Movement Speed out of combat",
            "+2.4% Movement Speed out of combat",
            "+3% Movement Speed out of combat"
        ],
        "id": 6311,
        "name": "Wanderer"
    },
    "6331": {
        "description": [
            "Deal 0.6% increased damage to champions below 40% Health",
            "Deal 1.2% increased damage to champions below 40% Health",
            "Deal 1.8% increased damage to champions below 40% Health",
            "Deal 2.4% increased damage to champions below 40% Health",
            "Deal 3% increased damage to champions below 40% Health"
        ],
        "id": 6331,
        "name": "Merciless"
    },
    "6211": {
        "description": [
            "+0.4 Health per 5 seconds",
            "+0.8 Health per 5 seconds",
            "+1.2 Health per 5 seconds",
            "+1.6 Health per 5 seconds",
            "+2.0 Health per 5 seconds"
        ],
        "id": 6211,
        "name": "Recovery"
    },
    "6252": {
        "description": [
            "+0.6 Armor and Magic Resist for each nearby enemy champion",
            "+1.2 Armor and Magic Resist for each nearby enemy champion",
            "+1.8 Armor and Magic Resist for each nearby enemy champion",
            "+2.4 Armor and Magic Resist for each nearby enemy champion",
            "+3 Armor and Magic Resist for each nearby enemy champion"
        ],
        "id": 6252,
        "name": "Legendary Guardian"
    },
    "6251": {
        "description": [
            "+3% Tenacity and Slow Resist",
            "+6% Tenacity and Slow Resist",
            "+9% Tenacity and Slow Resist",
            "+12% Tenacity and Slow Resist",
            "+15% Tenacity and Slow Resist"
        ],
        "id": 6251,
        "name": "Swiftness"
    },
    "6231": {
        "description": [
            "Shields, healing, regeneration, and lifesteal on you are 1.6% stronger",
            "Shields, healing, regeneration, and lifesteal on you are 3.2% stronger",
            "Shields, healing, regeneration, and lifesteal on you are 4.8% stronger",
            "Shields, healing, regeneration, and lifesteal on you are 6.4% stronger",
            "Shields, healing, regeneration, and lifesteal on you are 8% stronger"
        ],
        "id": 6231,
        "name": "Runic Armor"
    },
    "6232": {
        "description": [
            "+10 Health",
            "+20 Health",
            "+30 Health",
            "+40 Health",
            "+50 Health"
        ],
        "id": 6232,
        "name": "Veteran's Scars"
    }
}

const champList =
{1: 'Annie',
 2: 'Olaf',
 3: 'Galio',
 4: 'TwistedFate',
 5: 'XinZhao',
 6: 'Urgot',
 7: 'Leblanc',
 8: 'Vladimir',
 9: 'Fiddlesticks',
 10: 'Kayle',
 11: 'MasterYi',
 12: 'Alistar',
 13: 'Ryze',
 14: 'Sion',
 15: 'Sivir',
 16: 'Soraka',
 17: 'Teemo',
 18: 'Tristana',
 19: 'Warwick',
 20: 'Nunu',
 21: 'MissFortune',
 22: 'Ashe',
 23: 'Tryndamere',
 24: 'Jax',
 25: 'Morgana',
 26: 'Zilean',
 27: 'Singed',
 28: 'Evelynn',
 29: 'Twitch',
 30: 'Karthus',
 31: 'Chogath',
 32: 'Amumu',
 33: 'Rammus',
 34: 'Anivia',
 35: 'Shaco',
 36: 'DrMundo',
 37: 'Sona',
 38: 'Kassadin',
 39: 'Irelia',
 40: 'Janna',
 41: 'Gangplank',
 42: 'Corki',
 43: 'Karma',
 44: 'Taric',
 45: 'Veigar',
 48: 'Trundle',
 50: 'Swain',
 51: 'Caitlyn',
 53: 'Blitzcrank',
 54: 'Malphite',
 55: 'Katarina',
 56: 'Nocturne',
 57: 'Maokai',
 58: 'Renekton',
 59: 'JarvanIV',
 60: 'Elise',
 61: 'Orianna',
 62: 'MonkeyKing',
 63: 'Brand',
 64: 'LeeSin',
 67: 'Vayne',
 68: 'Rumble',
 69: 'Cassiopeia',
 72: 'Skarner',
 74: 'Heimerdinger',
 75: 'Nasus',
 76: 'Nidalee',
 77: 'Udyr',
 78: 'Poppy',
 79: 'Gragas',
 80: 'Pantheon',
 81: 'Ezreal',
 82: 'Mordekaiser',
 83: 'Yorick',
 84: 'Akali',
 85: 'Kennen',
 86: 'Garen',
 89: 'Leona',
 90: 'Malzahar',
 91: 'Talon',
 92: 'Riven',
 96: 'KogMaw',
 98: 'Shen',
 99: 'Lux',
 101: 'Xerath',
 102: 'Shyvana',
 103: 'Ahri',
 104: 'Graves',
 105: 'Fizz',
 106: 'Volibear',
 107: 'Rengar',
 110: 'Varus',
 111: 'Nautilus',
 112: 'Viktor',
 113: 'Sejuani',
 114: 'Fiora',
 115: 'Ziggs',
 117: 'Lulu',
 119: 'Draven',
 120: 'Hecarim',
 121: 'Khazix',
 122: 'Darius',
 126: 'Jayce',
 127: 'Lissandra',
 131: 'Diana',
 133: 'Quinn',
 134: 'Syndra',
 136: 'AurelionSol',
 141: 'Kayn',
 143: 'Zyra',
 150: 'Gnar',
 154: 'Zac',
 157: 'Yasuo',
 161: 'Velkoz',
 163: 'Taliyah',
 164: 'Camille',
 201: 'Braum',
 202: 'Jhin',
 203: 'Kindred',
 222: 'Jinx',
 223: 'TahmKench',
 236: 'Lucian',
 238: 'Zed',
 240: 'Kled',
 245: 'Ekko',
 254: 'Vi',
 266: 'Aatrox',
 267: 'Nami',
 268: 'Azir',
 412: 'Thresh',
 420: 'Illaoi',
 421: 'RekSai',
 427: 'Ivern',
 429: 'Kalista',
 432: 'Bard',
 497: 'Rakan',
 498: 'Xayah'}



const match_data = {
    "game_mode": "CLASSIC",
    "match_id": 2565973154,
    "participant_details": [
        {
            "profile_icon": 0,
            "summoner_name": "IHeartOfWifeyI",
            "championId": 111
        },
        {
            "profile_icon": 2089,
            "summoner_name": "SS Slyther",
            "championId": 28
        },
        {
            "profile_icon": 26,
            "summoner_name": "SS SaiYaLater",
            "championId": 133
        },
        {
            "profile_icon": 1109,
            "summoner_name": "Kryptonic Flames",
            "championId": 81
        },
        {
            "profile_icon": 1297,
            "summoner_name": "Lord Subie",
            "championId": 7,
        }
    ],
    "masteries": [{'masteryId': 6114, 'rank': 5},
                  {'masteryId': 6121, 'rank': 1},
                  {'masteryId': 6134, 'rank': 5},
                  {'masteryId': 6141, 'rank': 1},
                  {'masteryId': 6311, 'rank': 5},
                  {'masteryId': 6322, 'rank': 1},
                  {'masteryId': 6331, 'rank': 5},
                  {'masteryId': 6343, 'rank': 1},
                  {'masteryId': 6351, 'rank': 5},
                  {'masteryId': 6363, 'rank': 1}]
}




class DashboardV4 extends React.Component {

    componentDidMount() {
        // DashboardRun(
        //     ReactDom.findDOMNode(this.refs.chartSpline)
        // );
    }

    componentWillUnmount() {
        // $(this.refs.chartSpline).data('plot').shutdown();
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
        <td><img src={finalChamp} width="16%" height="25%"/></td>
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
                        return (
                          <tr>
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

    getChampionMasteries(id){
      return(
        <tr>
          <th>
            {/* need to input ID here */}
            {match_data['masteries'].map((p) => {
              return(

              <th>{this.createMasteryButton(String(p.masteryId))}</th>

                // console.log(String(p.masteryId))

                // {createMasteryButton(String(p.masteryId))}
              )
            })}

          </th>
        </tr>
      )
    }


    createMasterySection(){
      console.log(Object.keys(masteryList))
      var allMastery = Object.keys(masteryList)

      return(

        <Col lg={ 12 }>
            <Panel header="Mastery Details">
                <Table responsive striped bordered hover>
                    <thead>
                        <tr>
                            <th style={{width: "400px"}}>Ferocity</th>
                            <th style={{width: "300px"}}>Cunning</th>
                            <th style={{width: "300px"}}>Resolve</th>
                        </tr>
                    </thead>
                    <tbody>
                      {/* Ferocity */}
                      <tr>

                          {allMastery.map((p) =>{
                              if (String(masteryList[p]['id']).startsWith('61')){
                                return(
                                  <td>{this.createMasteryButton(String(masteryList[p]['id']), 0)}</td>
                                )
                              }
                          })}

                      </tr>
                  {/* <td>
                      {allMastery.map((p) =>{

                          if (String(masteryList[p]['id']).startsWith('63')){
                            return(
                              <tr>{this.createMasteryButton(String(masteryList[p]['id']))}</tr>
                            )
                          }
                      })}
                    </td>
                    <td>
                        {allMastery.map((p) =>{

                            if (String(masteryList[p]['id']).startsWith('62')){
                              return(
                                <tr>{this.createMasteryButton(String(masteryList[p]['id']))}</tr>
                              )
                            }
                        })}
                      </td> */}
                    {/*   <tr>
                        <th>
                        {this.createMasteryButton('6111')}
                        {this.createMasteryButton('6114')}
                        </th>
                        <th>
                        {this.createMasteryButton('6311')}
                        {this.createMasteryButton('6312')}
                        </th>
                        <th>
                        {this.createMasteryButton('6211')}
                        {this.createMasteryButton('6212')}
                        </th>
                      </tr>*/}

                    </tbody>
                </Table>
            </Panel>
          </Col>
      )
    }

    createMasteryButton(id,rank){
      var masteryIconLoc = "../leagueFiles/7.16.1/img/mastery/"
      var finalIcon = masteryIconLoc+id+".png"
      var description = masteryList[id]['description']

      console.log(masteryList[id])
      return(

          <button title = {description}>
            <img src = {finalIcon} />
          </button>
          )
    }

    buttonClicked(){
      return(
        console.log("CLICKED")
      )
    }

    render() {

        return (

            <ContentWrapper>


              <div>{match_data['match_id']}</div>
              <div>{match_data['game_mode']}</div>
              <br/>
              {/* {match_data['participant_details'].map((p) => {
                return (
                  <div>
                    <div className="col-md-2">{p.summoner_name}</div>
                    <div className="col-md-10">{p.profile_icon}</div>
                  </div>)
              })} */}

              {this.createMatchDetailSection()}
              {this.createMasterySection()}






              {/* <div className="content-heading">
                League of Legends Matchmaker
                  <small data-localize="dashboard.WELCOME">Learn about league match ups and builds</small>
              </div>
              <div className="form-group mb-xl">
                Champion you are playing:
                  <input type="text" placeholder="Search for a Champion by Name" className="form-control mb" />
              </div>
              <div className="text-center pv-xl">Vs.</div>
              <h1></h1>
              <div className="form-group mb-xl">
                Champion you are playing against:
                  <input type="text" placeholder="Search for a Champion by Name" className="form-control mb" />
                  <div className="clearfix">
                      <button type="button" className="pull-left btn btn-default">Search Matchmaker</button>
                  </div>
              </div>
              <div>
                League of Legends Matchmaker is a tool for League of Legends players to
                easily access different build paths based on their opponent to improve their
                chance of success and gaming experience.
              </div> */}

            </ContentWrapper>
            );

    }

}

export default DashboardV4;
