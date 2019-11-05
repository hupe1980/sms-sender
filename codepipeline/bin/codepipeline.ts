#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { CodepipelineStack } from '../src/codepipeline-stack';

const app = new cdk.App();
new CodepipelineStack(app, 'CodepipelineStack', {
  env: {
    region: 'eu-central-1'
  },
  projectName: 'sms-sender'
});
