import puppeteer from "puppeteer";
import * as cheerio from "cheerio";

export async function scrapeURL(url) {
    try {
        return await scrapeWithPuppeteer(url);
    } catch (err) {
        console.warn("Puppeteer failed, falling back to fetch:", err.message);
        return await scrapeWithFetch(url);
    }
}

async function scrapeWithPuppeteer(url) {
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: "new",
            args: ["--no-sandbox", "--disable-setuid-sandbox"]
        });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "domcontentloaded", timeout: 20000 });
        const content = await page.content();
        return parseHTML(content, url);
    } finally {
        if (browser) await browser.close();
    }
}

async function scrapeWithFetch(url) {
    const response = await fetch(url, {
        headers: { 
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' 
        },
        timeout: 15000
    });
    
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const html = await response.text();
    return parseHTML(html, url);
}

function parseHTML(html, url) {
    const $ = cheerio.load(html);
    const title = $("title").text() || $("meta[property='og:title']").attr("content") || "No Title Found";
    const description = $("meta[name='description']").attr("content") || $("meta[property='og:description']").attr("content") || "No description available.";
    
    $("script, style, nav, footer, header").remove();
    let bodyText = $("body").text().replace(/\s+/g, " ").trim();

    return {
        title,
        description,
        body: bodyText.slice(0, 8000),
        url
    };
}
