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
    expect(breedsText.length).toBeGreaterThan(100);
  }, 16000);

  test("can click the breed dropdown", async () => {
    await page.select("[data-test=breeds]", "terrier"); // we expect terriers to not go away any time soon. ;)
    const breed = await page.$eval("[data-test=breeds]",  el => el.value);
    expect(breed).toBe("terrier");
  }, 16000);

  test("the correct breed shows", async () => {
    await page.waitForSelector("[data-test=dog]");
    const image = await page.$eval("[data-test=dog]", el => el.src);
    expect(image).toMatch(/terrier/);
  }, 16000);

  test("the refresh button shows the same breed", async () => {
    await page.waitForSelector("i");
    await page.click("i");
    const breedImage = await page.$eval("[data-test=dog]", el => el.src);
    expect(breedImage).toMatch(/terrier/);
  }, 16000);

  test("can click the subbreed dropdown", async () => {
    await page.waitForSelector("[data-test=subbreeds]");
    await page.select("[data-test=subbreeds]", "scottish"); // we expect SCOTTISH terriers to not go away any time soon. ;) ;)
    const subbreed = await page.$eval("[data-test=subbreeds]",  el => el.value);
    expect(subbreed).toBe("scottish");
  }, 16000);

  test("the correct subbreed shows", async () => {
    await page.waitForSelector("[data-test=dog]");
    const image = await page.$eval("[data-test=dog]", el => el.src);
    expect(image).toMatch(/terrier\-scottish/);
  }, 16000);

  test("the refresh button shows the same subbreed", async () => {
    await page.waitForSelector("i");
    await page.click("i");
    const breedImage = await page.$eval("[data-test=dog]", el => el.src);
    expect(breedImage).toMatch(/terrier\-scottish/);
  }, 16000);

  test("can click the breed dropdown again", async () => {
    await page.select("[data-test=breeds]", "collie"); // use one with a subbreed
    const breed = await page.$eval("[data-test=breeds]",  el => el.value);
    expect(breed).toBe("collie");
  }, 16000);

  test("the correct breed shows with a different selected breed", async () => {
    await page.waitForSelector("[data-test=dog]");
    const image = await page.$eval("[data-test=dog]", el => el.src);
    expect(image).toMatch(/collie/);
  }, 16000);

  test("can click the subbreed dropdown again", async () => {
    await page.waitForSelector("[data-test=subbreeds]");
    await page.select("[data-test=subbreeds]", "border"); // we expect SCOTTISH terriers to not go away any time soon. ;) ;)
    const subbreed = await page.$eval("[data-test=subbreeds]",  el => el.value);
    expect(subbreed).toBe("border");
  }, 16000);

  test("the correct subbreed shows", async () => {
    await page.waitForSelector("[data-test=dog]");
    const image = await page.$eval("[data-test=dog]", el => el.src);
    expect(image).toMatch(/collie\-border/);
  }, 16000);

  test("the refresh button shows the same subbreed", async () => {
    await page.waitForSelector("i");
    await page.click("i");
    const breedImage = await page.$eval("[data-test=dog]", el => el.src);
    expect(breedImage).toMatch(/collie\-border/);
  }, 16000);
});
