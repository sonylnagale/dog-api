import puppeteer from "puppeteer";

const APP = "http://localhost:3000/";

let page;
let browser;
const width  = 1920;
const height = 1080

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: [`--window-size=${width},${height}`]
  });
  page = await browser.newPage();
  await page.setViewport({ width, height });
});
afterAll(() => {
  browser.close();
});

describe("Breed Select", () => {
  test("breeds have been populated", async () => {
    await page.goto(APP);
    await page.waitForSelector("[data-test=breeds]");
    const breedsText = await page.$eval("[data-test=breeds]", el => el.textContent);
    expect(breedsText.length).toContain("terrier");
  }, 16000);
});
