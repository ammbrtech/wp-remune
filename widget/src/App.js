import React from 'react';
import ChatBot from 'react-simple-chatbot';
import Review from './Review'
import Transaction from './Transaction'

import { ThemeProvider } from 'styled-components';

const theme =  {
        background: '#f5f8fb',
        headerBgColor: '#E3392E',
        headerFontColor: '#fff',
        headerFontSize: '15px',
        botBubbleColor: '#FFFFFF',
        botFontColor: '#000',
        userBubbleColor: '#FEFEFE',
        userFontColor: '#010101',
    }

class App extends React.Component {

   handleEnd = async() => {
    console.log("doneee");
  }



  render() {
    const icon = window.remune_script_vars.base_url + process.env.PUBLIC_URL + "/assets/icon.jpg";
    return (
      <ThemeProvider theme={theme}>

      <ChatBot
        headerTitle="REMUNE"
        floatingIcon={icon}
        botAvatar={icon}
        floating="true"
        handleEnd={this.handleEnd}
        submitButtonStyle={{fill:"#E3392E"}}
        steps={[
          {
            id: '1',
            message: 'What is your remune ID?',
            trigger: 'identity',
          },
          {
            id: 'identity',
            user: true,
            validator: (value) => {
              if (value === "") {
                return 'Enter your remune ID';
              }
              return true;
            },
            trigger: '3',
          },
          {
            id: '3',
            message: 'Hi {previousValue}! Please choose your plan',
            trigger: 'plan',
          },
          {
            id: 'plan',
            options: [
              { value: 'onetime', label: 'One Time', trigger: '5' },
              { value: 'daily', label: 'Daily', trigger: '5' },
              { value: 'weekly', label: 'Weekly', trigger: '5' },
              { value: 'monthly', label: 'Monthly', trigger: '5' },
            ],
          },
          {
            id: '5',
            message: 'How much xls you need to send?',
            trigger: 'amt',
          },
          {
            id: 'amt',
            user: true,
            trigger: '7',
            validator: (value) => {
              if (isNaN(value)) {
                return 'value must be a number';
              } else if (value < 0) {
                return 'value must be positive';
              }

              return true;
            },
          },
          {
            id: '7',
            message: 'Great! Check out your summary',
            trigger: 'review',
          },
          {
            id: 'review',
            component: <Review />,
            asMessage: true,
            trigger: 'update',
          },
          {
            id: 'update',
            message: 'Would you like to update some field?',
            trigger: 'update-question',
          },
          {
            id: 'update-question',
            options: [
              { value: 'yes', label: 'Yes', trigger: 'update-yes' },
              { value: 'no', label: 'No', trigger: 'transaction' },
            ],
          },
          {
            id: 'update-yes',
            message: 'What field would you like to update?',
            trigger: 'update-fields',
          },
          {
            id: 'update-fields',
            options: [
              { value: 'identity', label: 'Remune ID', trigger: 'update-identity' },
              { value: 'plan', label: 'Plan', trigger: 'update-plan' },
              { value: 'amt', label: 'XLS', trigger: 'update-amt' },
            ],
          },
          {
            id: 'update-identity',
            update: 'identity',
            trigger: '7',
          },
          {
            id: 'update-plan',
            update: 'plan',
            trigger: '7',
          },
          {
            id: 'update-amt',
            update: 'amt',
            trigger: '7',
          },
          {
            id: 'transaction',
            component: <Transaction />,
            asMessage: true,
            waitAction: true,
            trigger: 'response',
          },
          {
            id: 'response',
            message: 'Would you like to do another transaction?',
            trigger: 'response-question',
          },
          {
            id: 'response-question',
            options: [
              { value: 'yes', label: 'Yes', trigger: '1' },
              { value: 'no', label: 'No', trigger: 'end-message' },
            ],
          },
          {
            id: 'end-message',
            message: 'Thank You!',
            end: true,
            hideInput: true
          },
        ]}
      />
      </ThemeProvider>

    );
  }
}

export default App;
