import React, {Component, useState} from 'react';
import {View, Text, Button,Picker} from 'react-native';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Title,
  Body,
  Left,
  Right,
  List,
  ListItem,
} from 'native-base';
import {ScrollView, TextInput} from 'react-native-gesture-handler';

function Userlogin(props) {
  const [isLoading, setLoading] = useState(true);
  const [userName, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [location, setLocation] = useState('');
  const [selectedValue, setSelectedValue] = useState("Select");

  
  
 
  const loadLocation = async () => {
    try {
      let response = await fetch(
        'https://lit-brushlands-43502.herokuapp.com/api/locations'
        ,{
          method: 'GET',
        }
      );
      let json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (evt) => {


    //POST json
    var dataToSend = {  name: userName,
      email: email,
      mobile_num: mobileNumber,
      location: location,
      latitude: '13.006481',
      longitude: '80.258341',
      type: 'user',
      id: '12345'  };
      

    //making data to send on server
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }

    formBody = formBody.join('&');
    let response = await fetch(
      'https://lit-brushlands-43502.herokuapp.com/api/user',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body: formBody,
      },
    );
    
    let json = await response.json();
    console.log('POST completed');
    console.log(json);
    evt.preventDefault();
    props.navigation.navigate('User');
  };
  return (
    <Container  >
      <Header style={{backgroundColor:'#009387'}} >
          <Left/>
          <Left/>
          <Left/>
          <Body>
              <Title style={{color:'#ffffff'}}>Login</Title>
          </Body>
          <Right />
        </Header> 
      <Content style={{margin:20}}>
        <ScrollView>
          <Form onSubmit={handleSubmit}>
            
            <Item  floatingLabel last>
              <Label>MobileNumber</Label>
              <Input   keyboardType='numeric' maxLength={10}
                onChangeText={(mobileNumber) => setMobileNumber(mobileNumber)}
              />
            </Item>
            
            <Item  floatingLabel last>
              <Label>Enter OTP</Label>
              <Input  keyboardType='numeric'  maxLength={4}
                onChangeText={(mobileNumber) => setMobileNumber(mobileNumber)}
              />
            </Item>

            


            <Text></Text>
            <Text></Text>

<List>
    <ListItem >
        <Left>
        <Button  title="GetOTP"  onPress={handleSubmit}    />

        </Left>
        
        <Button  title="Register" onPress={() => props.navigation.navigate('User')}  />

        
    </ListItem>
</List>
          </Form>
        </ScrollView>
      </Content>
    </Container>
  );
}
export default Userlogin;
