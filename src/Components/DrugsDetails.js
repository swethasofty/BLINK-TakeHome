import React, { Component } from 'react'
import 'antd/dist/antd.css';
import { Layout, Breadcrumb,Card } from 'antd';
import axios  from 'axios';

const {Content} = Layout;

export default class DrugsDetails extends Component {
    constructor(props){
        super(props);
           this.state={
                list:[]
            }
}
componentDidMount(){
    this.getNDCs(this.props.match.params.rxcui);
}
    getNDCs=(id)=>{
        let self=this;  
        if(id){
        axios({
            method: 'get',
            url:`https://rxnav.nlm.nih.gov/REST/rxcui/${id}/ndcs.json`,
            params: { id }
          })
            .then(function (response) {
                if(response.data.ndcGroup.ndcList){
                    self.setState({
                        list:response.data.ndcGroup.ndcList.ndc
                    })
                    console.log(response.data.ndcGroup.ndcList.ndc)
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
     
    render() {
        return (
            <div>
               <Layout className="layout">
  
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>Drugs Details</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ background: '#fff', padding: 24, minHeight: 400 }}>
                   
                    <Card title="Name of drugs" >
                    <h3>Name: {this.props.match.params.drug_name}</h3>
                    <h3>Id: {this.props.match.params.rxcui}</h3>
                    <h3>synonym: {this.props.match.params.synonym}</h3>
                    </Card>
                    <Card title="Associated NDCs">
                   {
                       this.state.list.map((nds) => <li key={nds}>{nds}</li>)
                   }
                    </Card>
                </div>
            </Content>

</Layout>
            </div>
        )
    }
}
