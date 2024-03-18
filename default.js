const cheerio = require("cheerio");
const axios = require("axios");
const start =require('./videolinks')
const userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36";

async function scrapeContentPage(url, data) {
  // console.log(url,data)
  setTimeout(() => { }, 2000)
  try {
    const axiosResponse = await axios.request({
      method: "GET",
      url: url,
      headers: {
        "User-Agent": userAgent,
      },
    });
    const $ = cheerio.load(axiosResponse.data);

    const linkElement = $("#content iframe[src^='https://vidplay']");
    const videoLink = linkElement.attr("src");

    const quality= await start(videoLink)

    const finaldata = { info: data, video_links: quality };

    console.log("Successfully fetched content page:", url);

    return finaldata;

  } catch (error) {
    console.error("Error fetching content page:", url, error.message);
    return null; // Return null in case of an error
  }
}

async function scraping(url) {
  const scrapedData = [];

  try {
    const axiosResponse = await axios.request({
      url: url,
      method: "GET",
      headers: {
        "User-Agent": userAgent,
      },
    });

    const $ = cheerio.load(axiosResponse.data);

    // Use Promise.all to wait for all asynchronous operations to complete
    await Promise.all($('ul#loop li').map(async function () {
      const imgSrc = $(this).find('.cover img').attr('src');
      const title = $(this).find('.postcontent h2 a').attr('title');
      const nextpage = $(this).find('.postcontent h2 a').attr('href');
      const data = { title: title, image_url: imgSrc };
      if (nextpage != undefined) {
        const contentData = await scrapeContentPage(nextpage, data);
        if (contentData) {
          scrapedData.push(contentData);
        }
      }

    }).get());

  } catch (error) {
    console.error("Error during scraping:", error.message);
  }

  return scrapedData;
}

module.exports = scraping;
