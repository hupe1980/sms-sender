import { Construct, Stack, StackProps } from '@aws-cdk/core';

import { Codepipeline } from './codepipeline';

export interface CodepipelineStackProps extends StackProps {
  projectName: string;
}

export class CodepipelineStack extends Stack {
  constructor(scope: Construct, id: string, props: CodepipelineStackProps) {
    super(scope, id, props);

    const { projectName } = props;

    new Codepipeline(this, 'Codepipeline', {
      projectName,
    });
  }
}
