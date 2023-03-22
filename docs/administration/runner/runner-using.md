---
title: "Usage"
---

# Using Enterprise Runners in Jobs

## Existing jobs
Once the new architecture is enabled as described in [Configuration](/administration/runner/runner-setup.html),existing jobs will default to the Local Runner even if no Runner selection is made in the job definition. The Local Runner has equivalent execution context as Process Automation instance/server.

## Creating jobs with Runners

Once the new architecture is enabled as described in [Configuration](/administration/runner/runner-setup.html), the Job edit menu will display a new “Nodes & Runners” tab where Node and Runner selection is configured for the job. When creating a job or editing a job, a user can select Runners based on tags with the following options:
![Options to select runners by tags](@assets/img/runner-use-options.png)

- Selecting Runners with “Choose Tags” option from the drop-down list:
    ![Selecting runners by tags selection](@assets/img/runner-use-options-checkbox.png)
- Selecting Runners by “Enter a Tag Filter” option and typing the Runner Tag name:
    ![Selecting remote runners with tag search ](@assets/img/runner-use-options-textinput.png)
- Selecting the  “Local Runner” option and choosing the Local runner:
    ![Select the local runner](@assets/img/runner-use-options-local.png)

## Selecting Runners when running Jobs

The “Runnerset Can be Changed at Runtime” option controls if the Runnerset selection can be changed when running a Job. If selected, a list of Runnersets will be presented in the Job invocation screen otherwise the Runnerset selected in the job definition during edit time will be used for job execution.
![Allow runner selection at runtime](@assets/img/runner-use-options-changeatruntime.png)

## Dispatching to Nodes with Runners

Once you have picked a Runnerset for the Job, you can choose how the Runner should behave by selecting a Dispatch mode: “Run on Runner” or “Dispatch to Nodes through Runner”. If you select “Dispatch to Nodes through Runner”, the nodes related options will display and those are identical to previous versions of Process Automation.
![Dispatching jobs through runners](@assets/img/runner-use-dispatch-nodes.png)

## Running jobs with Runners

A user can change which Runner will execute the job with the “Change the Target Runner”. This option is useful if you want to target different environments with the same job, for example running the same job in Dev or Staging environments that are setup with different Runners. 
This is possible only If the “Runnerset Can be Changed at Runtime” option was picked for this Job definition. If you check “Change the Target Runner” the same Runner selection UI as in the “Editing Job” will let you pick the Runner set.
![Run job and pick a runner](@assets/img/runner-use-run-changeatruntime.png)

## Viewing Job Activity with the new architecture

The runner carrying out the job execution is displayed at the top of the Job execution activity. Example below: The job below was executed through the “Ansible-Runner”
![View runner in a job execution](@assets/img/runner-use-view-activity.png)

