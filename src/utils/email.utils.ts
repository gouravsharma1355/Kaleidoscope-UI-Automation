export function generateEmail(existingEmail?: string): string {
  if (existingEmail && existingEmail.trim() !== "") {
    return existingEmail;
  }

  const timestamp = Date.now();
  return `test_${timestamp}@fakemail.com`;
}
