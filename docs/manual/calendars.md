# Calendars

This feature allows Rundeck to create Calendars at the System or Project level.  Calendars define dates and times, and whether they these times are **blackout** or **allowed** for scheduled jobs.

Blackout Calendars
:   Scheduled Jobs won’t run on the matching dates and times, but will run on other dates and times.

Allowed Calendars
:   Scheduled Jobs are allowed to run on the matching dates and times, but not on any other dates and times.

Calendars can be defined at system level as *System Calendars* or project level as *Project Calendars*.

[System Calendars](/manual/calendars/system-calendars.md)

:   Can be applied for all Jobs on all Rundeck Projects, or to all Jobs on selected Projects.

[Project Calendars](/manual/calendars/project-calendars.md)

:   Will be applied for all Jobs on the project or only for selected Jobs in that Project.

### Enable Calendars feature

To enable the calendars, add the following settings to rundeck-config.properties

```properties
rundeck.feature.calendars.enabled=true
```
:::tip
Note: this will not prevent manual execution of jobs. It will only affect scheduled jobs.
:::
