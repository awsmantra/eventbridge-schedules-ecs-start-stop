import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import { Role } from "aws-cdk-lib/aws-iam";
import {CfnSchedule} from "aws-cdk-lib/aws-scheduler";

interface ECSSopProps extends cdk.NestedStackProps {
    roleArn: string
}

export class ECSStop extends cdk.NestedStack {
    private readonly role: Role;

    constructor(scope: Construct, id: string, props: ECSSopProps) {
        super(scope, id, props);

        // Start ECS Instance 8 am Central Time
        new CfnSchedule(this,"ecs-stop-scheduler", {
            name: "ecs-stop-scheduler",
            flexibleTimeWindow: {
                mode: "OFF"
            },
            scheduleExpression: "cron(0 20 ? * * *)",
            scheduleExpressionTimezone: 'America/Chicago',
            description: 'Event that start ECS instances',
            target: {
                arn: 'arn:aws:scheduler:::aws-sdk:ecs:updateService',
                roleArn: props.roleArn,
                input: JSON.stringify({ Service: 'ecs-service', Cluster: 'MyCluster', DesiredCount: 0 }),
            },
        });
    }
}
