import React, {Component, useState} from 'react';
import {View, Text, Button, Picker} from 'react-native';
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
  Icon,
} from 'native-base';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {NavigationHelpersContext} from '@react-navigation/native';

function User({navigation}) {
  const [isLoading, setLoading] = useState(true);
  const [userName, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [location, setLocation] = useState('');
  const [selectedValue, setSelectedValue] = useState('Select');

  const loadLocation = async () => {
    try {
      let response = await fetch(
        'https://lit-brushlands-43502.herokuapp.com/api/locations',
        {
          method: 'GET',
        },
      );
      let json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (evt) => {
    //POST json
    var dataToSend = {
      name: userName,
      email: email,
      mobile_num: mobileNumber,
      location: location,
      latitude: '13.006481',
      longitude: '80.258341',
      type: 'user',
      id: '12345',
    };

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
    <Container>
      <Header>
        <Left>
          <Icon
            type="FontAwesome"
            style={{color: '#ffffff'}}
            name="angle-left"
          />
        </Left>

        <Left />
        <Left />

        <Body>
          <Title style={{color: '#ffffff'}}>Register</Title>
        </Body>
        <Right />
      </Header>
      <Content style={{margin: 20}}>
        <ScrollView>
          <Form onSubmit={handleSubmit}>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input onChangeText={(userName) => setUsername(userName)} />
            </Item>
            <Item floatingLabel last>
              <Label>Email</Label>
              <Input
                keyboardType="email-address"
                onChangeText={(email) => setEmail(email)}
              />
            </Item>
            <Item floatingLabel last>
              <Label>MobileNumber</Label>
              <Input
                keyboardType="numeric"
                maxLength={10}
                onChangeText={(mobileNumber) => setMobileNumber(mobileNumber)}
              />
            </Item>

            <Text></Text>

            <Picker
              selectedValue={location}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)
              }>
              <Picker.Item label="Select" value="Select" />
              <Picker.Item label="thiruvanmiyur" value="thiruvanmiyur" />
              <Picker.Item label="adayar" value="adayar" />
              <Picker.Item label="avadi" value="avadi" />

              <Picker.Item label="chrompet" value="chrompet" />
              <Picker.Item label="mathur" value="mathur" />

              <Picker.Item label="saidapet" value="saidapet" />
            </Picker>
            <Picker
              selectedValue={selectedValue}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)
              }>
              <Picker.Item label="chennai" value="chennai" />
            </Picker>

            <Text></Text>
            <Button
              title="Submit"
              onPress={() => navigation.push('Userlogin')}
            />
          </Form>
        </ScrollView>
      </Content>
    </Container>
  );
}
export default User;
