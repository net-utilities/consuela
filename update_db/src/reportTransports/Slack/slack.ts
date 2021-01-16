import { IncomingWebhook } from '@slack/webhook';
import { IReport } from '../../config.interfaces';
import webHook from './webHook';
import logger from '../../logger/winston';

const webhook = new IncomingWebhook(webHook);


// Send the notification
const send = async (report: IReport) => {

  if (webHook !== '') {
    logger.info('Sending Slack report')
    const res = await webhook.send({
      "blocks": [
        {
          "type": "header",
          "text": {
            "type": "plain_text",
            "text": "Pools chronically down!",
            "emoji": true
          }
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "Oh no. Time to bring out the big :dusty_stick:, It's _cleaning_ time!"
          }
        },
        {
          "type": "section",
          "fields": [
            {
              "type": "mrkdwn",
              "text": "*Pool members down more than 30 days:*"
            },
            {
              "type": "mrkdwn",
              "text": `${report.poolsDown}`
            },
            {
              "type": "mrkdwn",
              "text": "*Pool members without data:*"
            },
            {
              "type": "mrkdwn",
              "text": `${report.noData}`
            },
            {
              "type": "mrkdwn",
              "text": "*Failed to get data from devices:*"
            },
            {
              "type": "mrkdwn",
              "text": `${report.failedDevices.length > 0 ? report.failedDevices.join(', ') : 'None, all successful! :tada:'}`
            }
          ]
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "Click <https://consuela.domain.com|here> to get to the Consuela interface."
          }
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "Want to know more? <https://a.wiki.com/|Check out this article to see why we're doing this>."
          }
        }
      ]
    });
    logger.info('Slack report sent!');
  } else {
    logger.info('Slack webhook not configured, skipping')
  }


};

export default send;
