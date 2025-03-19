import { NgModule } from "@angular/core";
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

// NgxLoggerLevels are: TRACE|DEBUG|INFO|LOG|WARN|ERROR|FATAL|OFF
@NgModule({
    imports: [
      LoggerModule.forRoot({
        level: NgxLoggerLevel.DEBUG, // Set your desired log level
        serverLoggingUrl: 'http://localhost:3000/api/logs', // Optional server logging URL
        serverLogLevel: NgxLoggerLevel.ERROR, // Level of logs to be sent to the server
      }),
    ],
    exports: [LoggerModule]
  })

export class AppLoggerModule{}