import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Header, Content,  Text,  Button, Left, Body, Title, Right, Icon, Card, CardItem,  } from 'native-base';

  

  function Select(props) {
    return (
        <Container>
        <Header transparent>
  
        </Header>
        <Header transparent>
  
        </Header>
        
       
        <Content>
  
  
              <Card >
                <Button block  onPress={() => props.navigation.navigate('User')} >
              <Text>User</Text>
              </Button>
              </Card>
          
              <Card >
                <Button block info>
              <Text>Ngo</Text>
              </Button>
              </Card>
              <Card >
                <Button block danger>
              <Text>volunteer</Text>
              </Button>
              </Card>
  
             
          
        </Content>
      </Container>




    );
  }

export default  Select ;
