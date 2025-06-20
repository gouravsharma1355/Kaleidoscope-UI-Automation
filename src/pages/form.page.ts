import { expect, Locator, Page } from "@playwright/test";
import { testData } from "../test_data/data";
import { uploadFileUtil } from "../utils/upload.utils";

export class FormPage {
  page: Page;
  add_button: Locator;
  short_input: Locator;
  textarea_input: Locator;

  constructor(page: Page) {
    this.page = page;
    this.short_input = this.page.getByPlaceholder("Short Input");
    this.textarea_input = this.page.getByPlaceholder("Long Input");
  }

  async fill_lets_get_to_know_page() {
    await this.page
      .getByRole("textbox", { name: "Street Address", exact: true })
      .fill(testData.street);
    await this.page
      .getByRole("textbox", { name: "Additional Street Address" })
      .fill(testData.state);
    await this.page.getByPlaceholder("Enter your state").fill(testData.state);
    await this.page.getByRole("option", { name: testData.state }).click();
    await this.page.getByRole("textbox", { name: "City" }).fill(testData.city);
    await this.page
      .getByRole("textbox", { name: "Zip Code" })
      .fill(testData.zipcode);
    await this.page
      .getByPlaceholder("Enter your country")
      .fill(testData.country);
    await this.page.getByRole("option", { name: testData.country }).click();
    await this.go_to_next_page();
  }

  async add_extra_curricular_activities(activity_names: string[]) {
    await expect(
      this.page.getByRole("heading", { name: "Extracurricular Activities" })
    ).toBeVisible();
    for (let activity_name of activity_names) {
      const element: Locator = this.page.getByRole("button", {
        name: "Delete entry",
      });
      const initial_count: number = await element.count();

      await this.page
        .getByRole("button", { name: "Add Entry", exact: true })
        .click();
      await this.page
        .getByRole("textbox", { name: "Extracurricular Activity Name" })
        .fill(activity_name);
      await this.page
        .getByRole("textbox", { name: "Total Number of Years Involved" })
        .fill(testData.years);
      await this.page
        .getByRole("textbox", { name: "List any leadership roles," })
        .fill(testData.roles);
      await this.page
        .getByRole("textbox", { name: "Description of Involvement" })
        .fill(testData.description);

      await this.page.getByRole("button", { name: "Add", exact: true }).click();

      await expect(this.page.getByText(activity_name)).toBeVisible();
      expect(await element.count()).toBeGreaterThan(initial_count);
    }

    await this.go_to_next_page();
  }

  async go_to_next_page() {
    await this.page.waitForTimeout(1000);
    await this.page.getByRole("button", { name: "Next Page" }).click();
  }

  async fill_high_school_information() {
    await expect(
      this.page.getByRole("heading", { name: "High School Information" })
    ).toBeVisible();
    await this.page
      .getByRole("textbox", { name: "High School Name" })
      .fill(testData.high_school_name);
    await this.page
      .getByRole("textbox", { name: "High School Street Address", exact: true })
      .fill(testData.school_street);
    await this.page
      .getByRole("textbox", { name: "High School City" })
      .fill(testData.school_city);
    await this.page
      .getByPlaceholder("Enter high school state")
      .fill(testData.school_state);
    await this.page.getByRole("option", { name: testData.school_state }).click();
    await this.page
      .getByRole("textbox", { name: "High School Zip Code" })
      .fill(testData.school_zipcode);
    await this.page.getByRole("textbox", { name: "GPA" }).fill(testData.gpa);
    await this.page
      .getByRole("textbox", { name: "Year of High School Graduation" })
      .fill(testData.year_of_education);
    await uploadFileUtil(this.page, "My School Transcript.pdf");

    await this.go_to_next_page();
  }

  async validate_essay_options(options: string[]) {
    const essayHeading = this.page.getByRole("heading", { name: "Essay" });
    await expect(essayHeading).toBeVisible();
    const instructionText = this.page.getByText(
      "Please select the essay types"
    );
    await instructionText.waitFor();
    await expect(instructionText).toBeVisible();

    for (const option of options) {
      const checkbox = this.page.getByRole("checkbox", { name: option });
      await checkbox.check();
      if (option === "Other") {
        await expect(
          this.page.getByText("Provide an essay about any topic")
        ).toBeVisible();
      } else {
        await expect(
          this.page.getByText(`Essay about ${option}`)
        ).toBeVisible();
      }

      await checkbox.uncheck();
      if (option !== "Other") {
        await expect(
          this.page.getByText(`Essay about ${option}`)
        ).not.toBeVisible();
      }
    }
  }

  async add_essay_options(options: string[]) {
    for (const option of options) {
      const checkbox = this.page.getByRole("checkbox", { name: option });
      const essayLabelText =
        option === "Other"
          ? "Provide an essay about any topic"
          : `Essay about ${option}`;
      await checkbox.check();
      await expect(this.page.getByText(essayLabelText)).toBeVisible();
      const textbox = this.page.getByRole("textbox", { name: essayLabelText });
      await textbox.fill(`This is the description of ${option}`);
    }
    await this.go_to_next_page();
  }
}
