import { environment } from 'src/environments/environment';

class Logger {

    private log(obj: string | object, level: number = 1) {

        let minimumLevel = environment.logLevel ? this.logLevel[environment.logLevel] : this.logLevel.INFO;
        if (level >= minimumLevel)
            console.log({
                time: new Date(),
                level: level,
                obj: obj
            });

    }

    private logLevel = {
        DEBUG: 0,
        INFO: 1,
        WARN: 2,
        ERROR: 3
    }

    debug(obj: string | object) {
        this.log(obj, this.logLevel.DEBUG);
    }

    info(obj: string | object) {
        this.log(obj, this.logLevel.INFO);
    }

    warn(obj: string | object) {
        this.log(obj, this.logLevel.WARN);
    }


    error(obj: string | object) {
        this.log(obj, this.logLevel.ERROR);
    }
    
}

export const logger = new Logger();