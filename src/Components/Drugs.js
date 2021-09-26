import React, { Component } from 'react'
import 'antd/dist/antd.css';
import { Layout, Breadcrumb,Input,List, Typography,Result} from 'antd';
import {NavLink} from "react-router-dom"
import axios  from 'axios';
import ContentLoader from "react-content-loader";

//Ant design variables
const { Search } = Input;
const {Content} = Layout;
//loader annimation for Api call
const Loader = props => {
    const random = Math.random() * (1 - 0.7) + 0.7;
    return (
      <ContentLoader
        height={40}
        width={1060}
        speed={2}
        primaryColor="#Black"
        secondaryColor="#ecebeb"
        {...props}
      >
        <rect x="64" y="13" rx="6" ry="6" width={200 * random} height="12" /> 
      </ContentLoader>
    );
  };

export default class Drugs extends Component {
    constructor(props){
        super(props);
            this.state={
                list:[],
                isValidDrugs:false,
                isSearchStarted:false,
                isLoaded:false,
                drugs:{
                    name:"",
                    conceptGroup:[]
                },
                suggestionList:{
                    suggestionList:{
                        suggestion:[]
                    },
                    
                
                }
            }
    }
//Api call for get searched drugs details 
getDrugs=(name)=>{
    let self=this;  
    if(name){
    axios({
        method: 'get',
        url: 'https://rxnav.nlm.nih.gov/REST/drugs.json',
        params: { name }
      })
        .then(function (response) {
            if(response.data && response.data.drugGroup.conceptGroup){
                self.setState({
                    drugs:response.data.drugGroup,
                    isValidDrugs:true,
                    isSearchStarted:true,
                    isLoaded:true
                })
            }else{
                self.setState({
                    drugs:{
                        name:"",
                        conceptGroup:[]
                    },
                    isValidDrugs:false,
                    isSearchStarted:true
                })
                self.getDrugsSuggestions(name);
            }
        });
    }else{
        self.setState({
            drugs:{
                name:"",
                conceptGroup:[]
            },
            isSearchStarted:false
        })
    }

}
//Api call for get Drugs Suggestions
getDrugsSuggestions=(name)=>{
    let self=this;  
    axios({
        method: 'get',
        url: ' https://rxnav.nlm.nih.gov/REST/spellingsuggestions.json',
        params: { name }
      })
        .then(function (response) {
            if(response.data && response.data.suggestionGroup){
                self.setState({
                    suggestionList:response.data.suggestionGroup  
                })
            }else{
                self.setState({
                    suggestionList:null
                })
            }
        });
}
    render() {
        return (
            <div>
              <Layout className="layout">
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Drugs Search</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ background: '#fff', padding: 24, minHeight: 420 }}>

                    <Search placeholder="Search for Drugs" onSearch={value => 
                        this.getDrugs(value)} enterButton />
                        { this.state.isValidDrugs &&
                             this.state.drugs.conceptGroup.map((item,index) => 
                                <div > 
                                    {this.isLoaded ===false &&
                                      <React.Fragment>
                                            {Array(1)
                                            .fill("")
                                            .map((e, i) => (
                                                <Loader key={index} style={{ opacity: Number(2 / index).toFixed(1) }} />
                                            ))}
                                         </React.Fragment>
                                    }
                                    <h2>{item.tty}</h2>  
                                    <List style={{marginTop:10}}
                                        bordered
                                        dataSource={item.conceptProperties}
                                        renderItem={e => ( 
                                            <List.Item>
                                                <NavLink to={`/drugs/${e.name}/${e.rxcui}/${e.synonym}`} className="nav-link">
                                                    <Typography.Text mark>{e.name}</Typography.Text>
                                                </NavLink>
                                                    {/* <Typography.Text >{e.tty}</Typography.Text>  */}
                                                
                                            </List.Item>    
                            )}
                                    />
                                </div>
                            )
                        }
                    { this.state.isValidDrugs === false && this.state.isSearchStarted ===true &&
                    <div>
                        <Result
                            title="Sorry, Searched drugs are not available.please select valid drugs from the suggestions below"
                            style={{paddingTop: 3}}/>

                        <List style={{marginTop:5}}
                        bordered
                        dataSource={this.state.suggestionList.suggestionList.suggestion}
                        renderItem={e => (                 
                        <List.Item>
                            <NavLink to={`/drugs/${e}/${e.rxcui}/${e.synonym}`} className="nav-link">
                            <Typography.Text mark>{e}</Typography.Text>
                            </NavLink>
                            </List.Item>    
                        )}/>
                    </div>
                    }
                </div> 
                </Content>
            </Layout>
            </div>
        )
    }
}
