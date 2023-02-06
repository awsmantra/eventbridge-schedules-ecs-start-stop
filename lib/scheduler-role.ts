import { StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import {Effect, PolicyStatement, Role, ServicePrincipal} from "aws-cdk-lib/aws-iam";

export class SchedulesRole extends cdk.NestedStack  {
    private readonly _role: Role;
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);


        // Add scheduler assumeRole
        this._role  = new Role(this,  "scheduler-ecs-start-stop", {
            assumedBy: new ServicePrincipal('scheduler.amazonaws.com'),
            roleName: "scheduler-ecs-start-stop"
        })

        // Add policy
        this._role.addToPolicy(  new PolicyStatement( {
            sid: 'ECSStartStopPermissions',
            effect: Effect.ALLOW,
            actions: [
                "ecs:List*",
                "ecs:Describe*",
                "ecs:UpdateService"
            ],
            resources: ["*"], //Give the least privileges
        }))
    }

    get roleArn(): string {
        return this._role.roleArn;
    }
}
