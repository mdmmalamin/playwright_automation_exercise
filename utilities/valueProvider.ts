import * as fs from "fs";
import * as path from "path";

interface IAutomationExerciseData {
  expectedTexts: string[];
  accountMenuTexts: string[];
}

export class ExpectedTextProvider {
  protected expectedTexts: string[];
  protected accountMenuTexts: string[];

  constructor() {
    const data = this.loadAutomationExerciseData();
    this.expectedTexts = data.expectedTexts;
    this.accountMenuTexts = data.accountMenuTexts;
  }

  private loadAutomationExerciseData(): IAutomationExerciseData {
    const jsonFilePath = path.resolve(
      __dirname,
      "../testData/automationExercise.json"
    );

    try {
      const data = fs.readFileSync(jsonFilePath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      throw new Error(`Error reading or parsing the file: ${jsonFilePath}`);
    }
  }
}
