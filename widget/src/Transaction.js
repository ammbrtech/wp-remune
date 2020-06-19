import React, { Component } from 'react';
import { Loading } from 'react-simple-chatbot';

export default class Transaction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      result: '',
      trigger: false,
    };
  }

  componentDidMount() {
    const { steps } = this.props;
    const amt = steps.amt.value;
    const plan = steps.plan.value;
    const identity = steps.identity.value;
    const dataMessage = identity + " " + window.remune_script_vars.remune_id + " " + amt + " xlm " + plan;

    this.postData(window.remune_script_vars.basepath+'/user/app/transaction',
    {
      data: dataMessage,
      botType:"WP",
      botId: "sd",
      to_jid: "fds",
      account_id: "sdf"
    }
   )
      .then(data => {
        this.setState({ loading: false, result: data});
        this.triggetNext()
      });
  }

  triggetNext() {
    this.setState({ trigger: true }, () => {
      this.props.triggerNextStep();
    });
  }

   postData = async (url = '', data = {}) => {
      // Default options are marked with *
      const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        //redirect: 'follow', // manual, *follow, error
        //referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      });
      return response.json(); // parses JSON response into native JavaScript objects
    }

  render () {
    const { trigger, loading, result } = this.state;

    return (
      <div className="remune-message" style={{fontSize: "14px"}}>
        { loading && <Loading />}
        {!loading &&
          <p>You can go and complete the transaction{' '}
            <a href={result.message} target="_blank">here</a>
          </p>
         }

      </div>
    );

  }
}
