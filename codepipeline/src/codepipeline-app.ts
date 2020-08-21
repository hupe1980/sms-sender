#!/usr/bin/env node
import 'source-map-support/register';
import { App } from '@aws-cdk/core';
import { CodepipelineStack } from './codepipeline-stack';

const app = new App();
new CodepipelineStack(app, 'CodepipelineStack', {
  env: {
    region: 'eu-central-1',
  },
  projectName: 'sms-sender',
});
