import fs from "node:fs";
import path from "node:path";
import { DateTime } from "luxon";
import chalk from 'chalk';


export const stampaAlberatura = (dir: string, indentazione = "|--") => {


    const files = fs.readdirSync(dir); //leggo la cartella

    console.log(chalk.green(indentazione + path.basename(dir)))


    //per ogni file/cartella
    files.forEach((file) => {
        const filePath = path.join(dir, file); //creo il path unendo cartella+file
        const stat = fs.statSync(filePath); // prendo le informazioni
        let dataModifica = DateTime.fromMillis(stat.mtimeMs) //trasformo data ultima modifica
        let dataLocal = DateTime.local()

        let minuti = Math.round(dataLocal.diff(dataModifica, "minute").minutes)

        switch (true) {
            case (stat.isDirectory()):
                stampaAlberatura(filePath, '|  ' + indentazione);
                break;
            case (!stat.isDirectory() && minuti < 5):
                console.log(chalk.cyan(`${indentazione + file} (${minuti} minuti fa)`));
                break;
            case (!stat.isDirectory() && minuti > 5 && minuti < 30):
                console.log(chalk.yellow(`${indentazione + file} (${minuti} minuti fa)`));
                break;

            default:
                console.log(`${indentazione + file} (${minuti} minuti fa)`);
        }
    });
}



