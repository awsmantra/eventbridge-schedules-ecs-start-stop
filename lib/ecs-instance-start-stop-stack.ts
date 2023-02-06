import {Stack, StackProps} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {SchedulesRole} from "./scheduler-role";
import {ECSStart} from "./ecs-start";
import {ECSStop} from "./ecs-stop";

export class ECSInstanceStartStopStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);


    // Create Role
    const schedulesRole = new SchedulesRole(this,"SchedulerRoleStack")

    // Create ECSStart schedules
    const ecsStart = new ECSStart(this,"EcsStart", {
      roleArn: schedulesRole.roleArn,
    })

    // Create ECSStop schedules
    const ecsStop = new ECSStop(this,"EcsStop", {
      roleArn: schedulesRole.roleArn,
    })

  }
}
