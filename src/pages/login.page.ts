import { expect, Locator, Page } from "@playwright/test";
import { testData } from "../test_data/data";

export class LoginPage {
  private page: Page;
  private email_address: Locator;
  private next_button: Locator;

  constructor(page: Page) {
    this.page = page;
    this.email_address = this.page.getByRole("textbox", {
      name: "Email Address",
    });
    this.next_button = this.page.getByRole("button", { name: "Next" });
  }

  async login(email_id: string) {
    await this.page.goto(testData.base_url, { waitUntil: "networkidle" });
    await this.page.getByText("Log In to Apply").click();

    if (testData.existing_email_id) {
      await this.email_address.fill(email_id);
      await this.next_button.click();
      await this.page.getByLabel("Enter Your Password").fill(testData.password);
      await this.page.getByRole("button", { name: "Sign In" }).click();
    } else {
      await this.register_new_user(email_id);
    }
  }

  async register_new_user(email_id: string) {
    await this.email_address.fill(email_id);
    await expect(this.next_button).toBeVisible();
    await this.next_button.click();

    await expect(
      this.page.getByText("Let's create your account.")
    ).toBeVisible();
    await this.page
      .getByRole("textbox", { name: "First Name" })
      .fill(testData.first_name);
    await this.page
      .getByRole("textbox", { name: "Last Name" })
      .fill(testData.last_name);
    await this.page
      .getByPlaceholder("1 (702) 123-4567")
      .fill(testData.phone_no);
    await this.page
      .getByRole("textbox", { name: "Create a Password" })
      .fill(testData.password);

    await this.page
      .getByRole("checkbox", {
        name: "I confirm that I am at least 13 years old",
      })
      .check();

    await this.page.getByRole("button", { name: "Submit" }).click();
  }
}
