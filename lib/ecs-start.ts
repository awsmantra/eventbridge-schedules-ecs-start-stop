import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import { Role } from "aws-cdk-lib/aws-iam";
import {CfnSchedule} from "aws-cdk-lib/aws-scheduler";

interface ECSStartProps extends cdk.NestedStackProps {
    roleArn: string
}

export class ECSStart extends cdk.NestedStack {
    private readonly role: Role;

    constructor(scope: Construct, id: string, props: ECSStartProps) {
        super(scope, id, props);

        // Start ECS Instance 8 am Central Time
        new CfnSchedule(this,"ecs-start-scheduler", {
            name: "ecs-start-scheduler",
            flexibleTimeWindow: {
                mode: "OFF"
            },
            scheduleExpression: "cron(0 8 ? * * *)",
            scheduleExpressionTimezone: 'America/Chicago',
            description: 'Event that start ECS instances',
            target: {
                arn: 'arn:aws:scheduler:::aws-sdk:ecs:updateService',
                roleArn: props.roleArn,
                input: JSON.stringify({ "Service": "calendar-service", "Cluster": "ECSFGCluster", "DesiredCount": 1 }),
            },
        });
    }
}
