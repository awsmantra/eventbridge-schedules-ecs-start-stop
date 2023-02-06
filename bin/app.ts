#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { ECSInstanceStartStopStack} from '../lib/ecs-instance-start-stop-stack';

const app = new cdk.App();
new ECSInstanceStartStopStack(app, 'ECSInstanceStartStopStack');
