# Serverless Chatbot
Kenneth Falck <kennu@iki.fi> 2016

## Overview

This is a basic boilerplate application for implementing AWS Lambda based
chat bots that can talk with Facebook Messenger or Microsoft Bot Framework.

## Prerequisites

Install Node.js 4 or later and run:

    npm install

## Initial setup

Before you can deploy, you need to configure the Serverless project. Edit
s-project.json and change the name to whatever you like. Then run
these commands, using the tokens you got from Facebook:

    sls project init
    sls variables set -t stage -s dev -k FACEBOOK_BOT_VERIFY_TOKEN -v (your verify token)
    sls variables set -t stage -s dev -k FACEBOOK_BOT_PAGE_ACCESS_TOKEN -v (your page access token)

## Deployment

To deploy to the default stage (dev), run:

    sls function deploy -a
    sls endpoint deploy -a
