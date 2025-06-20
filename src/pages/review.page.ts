import { expect, Locator, Page, test } from "@playwright/test";
import { testData } from "../test_data/data";

export class ReviewPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async validate_pages_answers(email_id: string) {
    const pages: string[] = [
      "Lets get to know you!",
      "Extracurricular Activities",
      "High School Information",
      "Essay",
    ];

    for (let page of pages) {
      await test.step(`Validating section: ${page}`, async () => {
        await expect(
          this.page.getByText(page, { exact: true }).first()
        ).toBeVisible();
        await this.page.getByRole("button", { name: page }).click();
        switch (page) {
          case "Lets get to know you!":
            await expect(
              this.page.getByText(testData.first_name, { exact: true })
            ).toBeVisible();
            await expect(
              this.page.getByText(testData.last_name, { exact: true })
            ).toBeVisible();
            await expect(
              this.page.getByText(email_id, { exact: true })
            ).toBeVisible();

            await expect(
              this.page.getByText(testData.street, { exact: true })
            ).toBeVisible();
            await expect(
              this.page.getByText(testData.state, { exact: true }).first()
            ).toBeVisible();
            await expect(
              this.page.getByText(testData.city, { exact: true })
            ).toBeVisible();
            await expect(
              this.page.getByText(testData.zipcode, { exact: true })
            ).toBeVisible();
            await expect(
              this.page.getByText(testData.country, { exact: true })
            ).toBeVisible();
            break;

          case "Extracurricular Activities":
            let activeItem = this.page.getByRole("region", {
              name: testData.activity_1,
            });
            await this.page
              .getByRole("button", { name: testData.activity_1 })
              .click();
            await expect(
              activeItem.getByText(testData.activity_1, { exact: true })
            ).toBeVisible();
            await expect(
              activeItem.getByText(testData.years, { exact: true })
            ).toBeVisible();
            await expect(
              activeItem.getByText(testData.roles, { exact: true })
            ).toBeVisible();
            await expect(
              activeItem.getByText(testData.description, { exact: true })
            ).toBeVisible();

            await this.page
              .getByRole("button", { name: testData.activity_2 })
              .click();
            activeItem = this.page.getByRole("region", {
              name: testData.activity_2,
            });
            await expect(
              activeItem.getByText(testData.activity_2, { exact: true })
            ).toBeVisible();

            await this.page
              .getByRole("button", { name: testData.activity_3 })
              .click();
            activeItem = this.page.getByRole("region", {
              name: testData.activity_3,
            });
            await expect(
              activeItem.getByText(testData.activity_3, { exact: true })
            ).toBeVisible();

            await this.page
              .getByRole("button", { name: testData.activity_4 })
              .click();
            activeItem = this.page.getByRole("region", {
              name: testData.activity_4,
            });
            await expect(
              activeItem.getByText(testData.activity_4, { exact: true })
            ).toBeVisible();
            break;

          case "High School Information":
            await expect(
              this.page.getByText(testData.high_school_name, { exact: true })
            ).toBeVisible();
            await expect(
              this.page.getByText(testData.school_street, { exact: true })
            ).toBeVisible();
            await expect(
              this.page.getByText(testData.school_city, { exact: true })
            ).toBeVisible();
            await expect(
              this.page.getByText(testData.school_state, { exact: true })
            ).toBeVisible();
            await expect(
              this.page.getByText(testData.school_zipcode, { exact: true })
            ).toBeVisible();
            await expect(
              this.page.getByText(testData.gpa, { exact: true })
            ).toBeVisible();
            await expect(
              this.page.getByText("01/01/2017", { exact: true })
            ).toBeVisible();
            await expect(
              this.page.getByText("My School Transcript.pdf").first()
            ).toBeVisible();
            break;

          case "Essay":
            await expect(
              this.page.getByText("Essay about Animals", { exact: true })
            ).toBeVisible();
            await expect(
              this.page.getByText("Essay about School", { exact: true })
            ).toBeVisible();
            break;
        }
      });
    }
  }

  async validate_submit_application() {
    await this.page.getByRole("button", { name: "Submit" }).click();
    await this.page
      .getByText("Submitting Application...", { exact: true })
      .waitFor({ state: "hidden" });
  }
}
