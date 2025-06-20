import { expect, test } from "../src/fixtures/fixtures";
import { testData } from "../src/test_data/data";
import { generateEmail } from "../src/utils/email.utils";

test.describe("Kaleidoscope Applicant Application process", async () => {
  let email_id: string = generateEmail(testData.existing_email_id);
  test("Applicant Submission Test Flow", async ({
    loginPage,
    formPage,
    reviewPage,
  }) => {
    await test.step("Login or Signup into the application", async () => {
      await loginPage.login(email_id);
    });

    await test.step("Fill get to know information form", async () => {
      await formPage.fill_lets_get_to_know_page();
    });

    await test.step("Fill extra curricular acctivity form", async () => {
      await formPage.add_extra_curricular_activities([testData.activity_1]);
      await expect(
        formPage.page.getByText("Please add at least 2 entries")
      ).toBeVisible();
      await formPage.add_extra_curricular_activities([
        testData.activity_2,
        testData.activity_3,
        testData.activity_4,
      ]);
    });

    await test.step("Fill high school information form", async () => {
      await formPage.fill_high_school_information();
    });

    await test.step("Fill essay types", async () => {
      await formPage.validate_essay_options([
        "Cars",
        "Animals",
        "School",
        "Other",
      ]);
      await formPage.add_essay_options(testData.essay_options);
    });

    await test.step("Validate review & submit page", async () => {
      await reviewPage.validate_pages_answers(email_id);
      const finalUrl = formPage.page.url();
      await reviewPage.validate_submit_application();
      await reviewPage.page.goto(finalUrl);
      await expect(formPage.page).toHaveURL(
        /\/program\/.*\/applicant\/application\/.*/
      );
      await expect(
        formPage.page.getByRole("link", { name: "Edit" })
      ).toBeHidden();
    });
  });
});
