import { Construct, SecretValue } from '@aws-cdk/core';
import { IRepository } from '@aws-cdk/aws-codecommit';
import { Pipeline, Artifact } from '@aws-cdk/aws-codepipeline';
import {
  GitHubSourceAction,
  CodeBuildAction,
  GitHubTrigger
} from '@aws-cdk/aws-codepipeline-actions';
import {
  PipelineProject,
  BuildSpec,
  LinuxBuildImage,
  BuildEnvironmentVariableType
} from '@aws-cdk/aws-codebuild';
import { PolicyStatement } from '@aws-cdk/aws-iam';

export interface CodepipelineProps {
  projectName: string;
}

export class Codepipeline extends Construct {
  constructor(scope: Construct, id: string, props: CodepipelineProps) {
    super(scope, id);

    const { projectName, } = props;

    const sourceArtifact = new Artifact();

    const sourceAction = new GitHubSourceAction({
      actionName: 'GitHub_Source',
      owner: 'hupe1980',
      repo: 'sms-sender',
      oauthToken: SecretValue.secretsManager('my-github-token'),
      output: sourceArtifact,
      branch: 'master',
      trigger: GitHubTrigger.WEBHOOK
    });

    const validationProject = new PipelineProject(this, 'ValidationProject', {
      environment: {
        buildImage: LinuxBuildImage.STANDARD_2_0
      },
      buildSpec: BuildSpec.fromSourceFilename('buildspecs/validation.yml')
    });

    const validationAction = new CodeBuildAction({
      actionName: 'ValidationAction',
      project: validationProject,
      input: sourceArtifact
    });

    const bucketStackName = `${projectName}-bucket-stack`;

    const deployProject = new PipelineProject(this, 'DeployProject', {
      environment: {
        buildImage: LinuxBuildImage.STANDARD_2_0
      },
      environmentVariables: {
        BUCKET_STACK_NAME: {
          value: bucketStackName,
          type: BuildEnvironmentVariableType.PLAINTEXT
        }
      },
      buildSpec: BuildSpec.fromSourceFilename('buildspecs/deploy.yml')
    });

    deployProject.addToRolePolicy(
      new PolicyStatement({
        actions: ['*'],
        resources: ['*']
      })
    );

    const deployAction = new CodeBuildAction({
      actionName: 'DeployAction',
      project: deployProject,
      input: sourceArtifact
    });

    new Pipeline(this, 'Pipeline', {
      pipelineName: projectName,
      stages: [
        {
          stageName: 'Source',
          actions: [sourceAction]
        },
        {
          stageName: 'Validation',
          actions: [validationAction]
        },
        {
          stageName: 'Deploy',
          actions: [deployAction]
        }
      ]
    });
  }
}
